package kitten

import (
	"chm-api/internal/storage"
	"chm-api/internal/utils"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/mux"
)

// 子猫一覧取得コマンド
type CommandGetKittens struct {
	KittenService KittenService
}

// 子猫詳細取得コマンド
type CommandGetKittenDetail struct {
	KittenService KittenService
}

// 子猫追加コマンド
type CommandPostKitten struct {
	KittenService  KittenService
	StorageService storage.StorageService
}

// 子猫更新コマンド
type CommandUpdateKitten struct {
	KittenService KittenService
}

// 子猫消去コマンド
type CommandDeleteKitten struct {
	KittenService KittenService
}

// 子猫一覧取得コンストラクタ
func NewCommandGetKittens(kittenService KittenService) *CommandGetKittens {
	return &CommandGetKittens{KittenService: kittenService}
}

// 子猫詳細取得コンストラクタ
func NewCommandGetKittenDetail(kittenService KittenService) *CommandGetKittenDetail {
	return &CommandGetKittenDetail{KittenService: kittenService}
}

// 子猫追加コンストラクタ
func NewCommandPostKitten(kittenService KittenService, storageService storage.StorageService) *CommandPostKitten {
	return &CommandPostKitten{KittenService: kittenService, StorageService: storageService}
}

// 子猫更新コンストラクタ
func NewCommandUpdateKitten(kittenService KittenService) *CommandUpdateKitten {
	return &CommandUpdateKitten{KittenService: kittenService}
}

// 子猫消去コンストラクタ
func NewCommandDeleteKitten(kittenService KittenService) *CommandDeleteKitten {
	return &CommandDeleteKitten{KittenService: kittenService}
}

// 子猫一覧取得コマンドの実行
func (c *CommandGetKittens) Execute(w http.ResponseWriter, r *http.Request) {
	kittens, err := c.KittenService.GetKittens()
	if err != nil {
		http.Error(w, "子猫一覧取得に失敗", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(kittens); err != nil {
		http.Error(w, "レスポンスの変換に失敗しました", http.StatusInternalServerError)
		return
	}
}

// 子猫詳細取得コマンドの実行
func (c *CommandGetKittenDetail) Execute(w http.ResponseWriter, r *http.Request) {
	// パラメータからkittenIDを取得
	vars := mux.Vars(r)
	kittenIdStr, ok := vars["kittenId"]
	if !ok {
		http.Error(w, "KittenIdが必要です", http.StatusBadRequest)
		return
	}
	kittenId := utils.ToInt(kittenIdStr)

	kittenDetail, err := c.KittenService.GetKittenDetail(kittenId)
	if err != nil {
		http.Error(w, "子猫の詳細取得ができませんでした", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(kittenDetail); err != nil {
		http.Error(w, "レスポンスの変換に失敗しました", http.StatusInternalServerError)
		return
	}
}

// 子猫追加コマンドの実行
func (c *CommandPostKitten) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	// リクエストをDTOにマッピング
	dto := PostKittenDTO{
		FatherCatId: utils.ToInt(r.FormValue("fatherCatId")),
		MotherCatId: utils.ToInt(r.FormValue("motherCatId")),
		BreedId:     utils.ToInt(r.FormValue("breedId")),
		ColorId:     utils.ToInt(r.FormValue("colorId")),
		Sex:         utils.ToInt(r.FormValue("sex")),
		BirthDate:   r.FormValue("birthDate"),
		Description: r.FormValue("description"),
		Price:       utils.ToInt(r.FormValue("price")),
		TranState:   r.FormValue("tranState"),
	}

	// 子猫情報を保存
	kittenId, err := c.KittenService.PostKitten(dto)
	if err != nil {
		http.Error(w, "子猫情報の保存に失敗しました", http.StatusInternalServerError)
		log.Printf("子猫情報の保存エラー: %v", err)
		return
	}

	// 並列処理で写真データと動画データをアップロード
	var wg sync.WaitGroup
	var mu sync.Mutex
	imageUrls := []string{}
	var videoUrl string
	uploadErrors := []error{}

	// 画像アップロード
	for i := 1; i <= 4; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			file, _, err := r.FormFile(fmt.Sprintf("image%d", i))
			if err != nil {
				log.Printf("画像%dがリクエストに含まれていないためスキップしました: %v", i, err)
				return
			}
			imagePath := fmt.Sprintf("kittens/kitten%d/image%d.jpg", kittenId, i)
			uploadedFile, err := c.StorageService.UploadFileToStorage(file, "images", imagePath)
			if err != nil {
				log.Printf("画像のアップロードエラー: %v", err)
				mu.Lock()
				uploadErrors = append(uploadErrors, err)
				mu.Unlock()
				return
			}
			mu.Lock()
			imageUrls = append(imageUrls, uploadedFile.PublicUrl)
			mu.Unlock()

			// データベースに画像を保存
			err = c.KittenService.PostKittenImage(kittenId, uploadedFile.PublicUrl)
			if err != nil {
				log.Printf("子猫画像のデータベース保存エラー: %v", err)
				mu.Lock()
				uploadErrors = append(uploadErrors, err)
				mu.Unlock()
			}
		}(i)
	}

	// 動画アップロード
	wg.Add(1)
	go func() {
		defer wg.Done()
		videoFile, _, err := r.FormFile("video")
		if err != nil {
			log.Printf("動画ファイルが見つからない、または読み取れません: %v", err)
			return
		}
		videoPath := fmt.Sprintf("kittens/kitten%d/video.mp4", kittenId)
		uploadedVideo, err := c.StorageService.UploadFileToStorage(videoFile, "videos", videoPath)
		if err != nil {
			log.Printf("動画のアップロードエラー: %v", err)
			mu.Lock()
			uploadErrors = append(uploadErrors, err)
			mu.Unlock()
			return
		}
		mu.Lock()
		videoUrl = uploadedVideo.PublicUrl
		mu.Unlock()

		// データベースに動画を保存
		err = c.KittenService.PostKittenVideo(kittenId, videoUrl)
		if err != nil {
			log.Printf("子猫動画のデータベース保存エラー: %v", err)
			mu.Lock()
			uploadErrors = append(uploadErrors, err)
			mu.Unlock()
		}
	}()

	// 全ての処理が完了するのを待機
	wg.Wait()

	if len(uploadErrors) > 0 {
		http.Error(w, "アップロード中にエラーが発生しました", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":   "success",
		"kittenId": kittenId,
		"images":   imageUrls,
		"video":    videoUrl,
	})
}

// 子猫更新コマンドの実行
func (c *CommandUpdateKitten) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	// リクエストをDTOにマッピング
	dto := UpdateKittenDTO{
		KittenId:    utils.ToInt(r.FormValue("kittenId")),
		FatherCatId: utils.ToInt(r.FormValue("fatherCatId")),
		MotherCatId: utils.ToInt(r.FormValue("motherCatId")),
		BreedId:     utils.ToInt(r.FormValue("breedId")),
		ColorId:     utils.ToInt(r.FormValue("colorId")),
		Sex:         utils.ToInt(r.FormValue("sex")),
		BirthDate:   r.FormValue("birthDate"),
		Description: r.FormValue("description"),
		Price:       utils.ToInt(r.FormValue("price")),
		TranState:   r.FormValue("tranState"),
	}

	// 子猫情報を保存
	err := c.KittenService.UpdateKitten(dto)
	if err != nil {
		http.Error(w, "子猫情報の更新に失敗しました", http.StatusInternalServerError)
		log.Printf("子猫情報の更新エラー: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("子猫情報を更新しました"))
}

// 子猫消去コマンドの実行
func (c *CommandDeleteKitten) Execute(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	kittenIdStr, ok := vars["kittenId"]
	if !ok {
		http.Error(w, "KittenIdが必要です", http.StatusBadRequest)
		return
	}
	kittenId := utils.ToInt(kittenIdStr)

	err := c.KittenService.DeleteKitten(kittenId)
	if err != nil {
		http.Error(w, "子猫の消去に失敗しました", http.StatusInternalServerError)
		log.Printf("子猫の消去エラー: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("子猫を消去しました"))
}
