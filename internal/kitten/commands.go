package kitten

import (
	"chm-api/internal/storage"
	"chm-api/internal/utils"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// 子猫一覧取得コマンド
type CommandGetKittens struct {
	Service KittenService
}

// 子猫詳細取得コマンド
type CommandGetKittenDetail struct {
	Service KittenService
}

// 子猫追加コマンド
type CommandPostKitten struct {
	KittenService  KittenService
	StorageService storage.StorageService
}

// 子猫一覧取得コンストラクタ
func NewCommandGetKittens(service KittenService) *CommandGetKittens {
	return &CommandGetKittens{Service: service}
}

// 子猫詳細取得コンストラクタ
func NewCommandGetKittenDetail(service KittenService) *CommandGetKittenDetail {
	return &CommandGetKittenDetail{Service: service}
}

// 子猫追加コンストラクタ
func NewCommandPostKitten(kittenService KittenService, storageService storage.StorageService) *CommandPostKitten {
	return &CommandPostKitten{KittenService: kittenService, StorageService: storageService}
}

// 子猫一覧取得コマンドの実行
func (c *CommandGetKittens) Execute(w http.ResponseWriter, r *http.Request) {
	kittens, err := c.Service.GetKittens()
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

	// kittenIDを整数に変換
	kittenId, err := strconv.Atoi(kittenIdStr)
	if err != nil {
		http.Error(w, "kittenIdが有効ではありません", http.StatusBadRequest)
		return
	}

	kittenDetail, err := c.Service.GetKittenDetail(kittenId)
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
	// リクエストの処理
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	// リクエストをデータにマッピング
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

	// 子猫情報を保存した後にKittenIdを取得
	kittenId, err := c.KittenService.PostKitten(dto)
	if err != nil {
		http.Error(w, "子猫情報の保存に失敗しました", http.StatusInternalServerError)
		log.Printf("子猫情報の保存エラー: %v", err)
		return
	}

	// 画像のアップロードと保存
	imageUrls := []string{}
	for i := 1; i <= 4; i++ {
		file, _, err := r.FormFile(fmt.Sprintf("image%d", i))
		if err != nil {
			log.Printf("画像%dがリクエストに含まれていないためスキップしました: %v", i, err)
			continue
		}

		imagePath := fmt.Sprintf("kittens/kitten%d/image%d.jpg", kittenId, i)
		uploadedFile, err := c.StorageService.SaveFileWithTemp(file, "images", imagePath)
		if err != nil {
			http.Error(w, "画像のアップロードに失敗しました", http.StatusInternalServerError)
			log.Printf("画像のアップロードエラー: %v", err)
			return
		}

		imageUrls = append(imageUrls, uploadedFile.PublicUrl)

		// データベースに画像を保存
		err = c.KittenService.PostKittenImage(kittenId, uploadedFile.PublicUrl)
		if err != nil {
			http.Error(w, "子猫画像のデータベース保存に失敗しました", http.StatusInternalServerError)
			log.Printf("子猫画像のデータベース保存エラー: %v", err)
			return
		}
	}

	// 動画のアップロードと保存
	var videoUrl string
	videoFile, _, err := r.FormFile("video")
	if err == nil {
		videoPath := fmt.Sprintf("kittens/kitten%d/video.mp4", kittenId)
		uploadedVideo, err := c.StorageService.SaveFileWithTemp(videoFile, "videos", videoPath)
		if err != nil {
			http.Error(w, "動画のアップロードに失敗しました", http.StatusInternalServerError)
			log.Printf("動画のアップロードエラー: %v", err)
			return
		}
		videoUrl = uploadedVideo.PublicUrl

		// データベースに動画を保存
		err = c.KittenService.PostKittenVideo(kittenId, videoUrl)
		if err != nil {
			http.Error(w, "子猫動画のデータベース保存に失敗しました", http.StatusInternalServerError)
			log.Printf("子猫動画のデータベース保存エラー: %v", err)
			return
		}
	} else {
		log.Printf("動画ファイルが見つからない、または読み取れません: %v", err)
	}

	// 成功レスポンス
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":   "success",
		"kittenId": kittenId,
		"images":   imageUrls,
		"video":    videoUrl,
	})
}
