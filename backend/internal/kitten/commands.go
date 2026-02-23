package kitten

import (
	"chm-api/internal/utils"
	"encoding/json"
	"fmt"
	"log"
	"mime/multipart"
	"net/http"

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
	KittenService KittenService
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
func NewCommandPostKitten(kittenService KittenService) *CommandPostKitten {
	return &CommandPostKitten{KittenService: kittenService}
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
	if err := r.ParseMultipartForm(10 << 20); err != nil {
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

	// 子猫情報を更新
	kittenId, err := c.KittenService.PostKitten(dto)
	if err != nil {
		http.Error(w, "子猫情報の保存に失敗しました", http.StatusInternalServerError)
		log.Printf("子猫情報の保存エラー: %v", err)
		return
	}

	// "image"に関連するすべてのファイルを取得
	imageHeaders := r.MultipartForm.File["image"]
	var imageFiles []multipart.File
	for _, header := range imageHeaders {
		file, err := header.Open()
		if err != nil {
			log.Printf("画像ファイルのオープンに失敗しました: %v", err)
			continue
		}
		imageFiles = append(imageFiles, file)
	}

	// 画像アップロード処理
	var imageUrls []string
	if imageFiles != nil {
		imageUrls, err = c.KittenService.PostKittenImages(kittenId, imageFiles)
		if err != nil {
			http.Error(w, "画像のアップロードに失敗しました", http.StatusInternalServerError)
			log.Printf("画像アップロードエラー: %v", err)
			return
		}
	}

	// "video"に関連するすべてのファイルを取得
	videoHeaders := r.MultipartForm.File["video"]
	var videoFiles []multipart.File
	for _, header := range videoHeaders {
		file, err := header.Open()
		if err != nil {
			log.Printf("動画ファイルのオープンに失敗しました: %v", err)
			continue
		}
		videoFiles = append(videoFiles, file)
	}

	// 動画アップロード処理
	var videoUrls []string
	if videoFiles != nil {
		videoUrls, err = c.KittenService.PostKittenVideos(kittenId, videoFiles)
		if err != nil {
			http.Error(w, "動画のアップロードに失敗しました", http.StatusInternalServerError)
			log.Printf("動画アップロードエラー: %v", err)
			return
		}
	}
	
	// レスポンス
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("子猫を追加しました"))
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":   "success",
		"kittenId": kittenId,
		"images":   imageUrls,
		"videos":   videoUrls,
	})
}

// 子猫更新コマンドの実行
func (c *CommandUpdateKitten) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(10 << 20); err != nil {
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

	// 子猫の情報を更新
	err := c.KittenService.UpdateKittenInfo(dto)
	if err != nil {
		http.Error(w, "子猫情報の更新に失敗しました", http.StatusInternalServerError)
		log.Printf("子猫情報の更新エラー: %v", err)
		return
	}

	// フォームデータから削除する画像の情報を取得
	deleteImages, err := parseMediaDTOs(r.MultipartForm, "deleteImages"); 
	if err != nil  {
		log.Printf("画像の更新はありません: %v", err)
	}

	// 子猫の写真の消去
	if deleteImages != nil {
		err = c.KittenService.DeleteKittenImages(deleteImages)
		if err != nil {
			http.Error(w, "子猫写真の消去に失敗しました", http.StatusInternalServerError)
			log.Printf("子猫写真の消去エラー: %v", err)
			return
		}
	}

	// フォームデータから削除する動画の情報を取得
	deleteVideos, err := parseMediaDTOs(r.MultipartForm, "deleteVideos")
	if err != nil  {
		log.Printf("動画の更新はありません: %v", err)
	}

	// 子猫の動画の消去
	if deleteVideos != nil {
		err = c.KittenService.DeleteKittenVideos(deleteVideos)
		if err != nil {
			http.Error(w, "子猫動画の消去に失敗しました", http.StatusInternalServerError)
			log.Printf("子猫動画の消去エラー: %v", err)
			return
		}
	}

	// "image"に関連するすべてのファイルを取得
	imageHeaders := r.MultipartForm.File["image"]
	var imageFiles []multipart.File
	for _, header := range imageHeaders {
		file, err := header.Open()
		if err != nil {
			log.Printf("画像ファイルのオープンに失敗しました: %v", err)
			continue
		}
		imageFiles = append(imageFiles, file)
	}

	// 画像アップロード処理
	var imageUrls []string
	if imageFiles != nil {
		imageUrls, err = c.KittenService.PostKittenImages(dto.KittenId, imageFiles)
		if err != nil {
			http.Error(w, "画像のアップロードに失敗しました", http.StatusInternalServerError)
			log.Printf("画像アップロードエラー: %v", err)
			return
		}
	}

	// "video"に関連するすべてのファイルを取得
	videoHeaders := r.MultipartForm.File["video"]
	var videoFiles []multipart.File
	for _, header := range videoHeaders {
		file, err := header.Open()
		if err != nil {
			log.Printf("画像ファイルのオープンに失敗しました: %v", err)
			continue
		}
		videoFiles = append(videoFiles, file)
	}

	// 動画アップロード処理
	var videoUrls []string
	if videoFiles != nil {
		videoUrls, err = c.KittenService.PostKittenVideos(dto.KittenId, videoFiles)
		if err != nil {
			http.Error(w, "動画のアップロードに失敗しました", http.StatusInternalServerError)
			log.Printf("動画アップロードエラー: %v", err)
			return
		}
	}

	// レスポンス
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("子猫を更新しました"))
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":   "success",
		"kittenId": dto.KittenId,
		"images":   imageUrls,
		"videos":   videoUrls,
	})
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
		http.Error(w, "子猫情報の消去に失敗しました", http.StatusInternalServerError)
		log.Printf("子猫情報の消去エラー: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("子猫情報を消去しました"))
}

func parseMediaDTOs(form *multipart.Form, key string) ([]MediaDTO, error) {
    values := form.Value[key]
    if len(values) == 0 {
        return nil, nil // データが存在しない場合
    }

    var mediaList []MediaDTO
    for _, value := range values {
        var media []MediaDTO
        if err := json.Unmarshal([]byte(value), &media); err != nil {
            return nil, fmt.Errorf("メディアデータのデコードに失敗しました: %w", err)
        }
        mediaList = append(mediaList, media...)
    }
    return mediaList, nil
}