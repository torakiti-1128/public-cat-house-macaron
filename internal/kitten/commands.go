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

// 子猫リスト取得コマンド
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

// コンストラクタ
func NewCommandGetKittens(service KittenService) *CommandGetKittens {
	return &CommandGetKittens{Service: service}
}

// コンストラクタ
func NewCommandGetKittenDetail(service KittenService) *CommandGetKittenDetail {
	return &CommandGetKittenDetail{Service: service}
}

// コンストラクタ
func NewCommandPostKitten(kittenService KittenService, storageService storage.StorageService) *CommandPostKitten {
	return &CommandPostKitten{KittenService: kittenService, StorageService: storageService}
}

// 子猫リスト取得コマンドの実行
func (c *CommandGetKittens) Execute(w http.ResponseWriter, r *http.Request) {
	kittens, err := c.Service.GetKittens()
	if err != nil {
		http.Error(w, "Failed to fetch kittens", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(kittens); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

// 子猫詳細取得コマンドの実行
func (c *CommandGetKittenDetail) Execute(w http.ResponseWriter, r *http.Request) {
	// パラメータからkittenIDを取得
	vars := mux.Vars(r)
	kittenIdStr, ok := vars["kittenId"]
	if !ok {
		http.Error(w, "kittenId is required", http.StatusBadRequest)
		return
	}

	// kittenIDを整数に変換
	kittenId, err := strconv.Atoi(kittenIdStr)
	if err != nil {
		http.Error(w, "kittenId must be a valid number", http.StatusBadRequest)
		return
	}

	kittenDetail, err := c.Service.GetKittenDetail(kittenId)
	if err != nil {
		http.Error(w, "Failed to fetch kitten detail", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(kittenDetail); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func (c *CommandPostKitten) Execute(w http.ResponseWriter, r *http.Request) {
	// リクエストの解析
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, "Failed to parse form data", http.StatusBadRequest)
		log.Printf("Error parsing form data: %v", err)
		return
	}

	// DTO初期化
	dto := PostKittenDTO{
		FatherCatID: utils.ToInt(r.FormValue("fatherCatId")),
		MotherCatID: utils.ToInt(r.FormValue("motherCatId")),
		BreedID:     utils.ToInt(r.FormValue("breedId")),
		ColorID:     utils.ToInt(r.FormValue("colorId")),
		Sex:         utils.ToInt(r.FormValue("sex")),
		BirthDate:   r.FormValue("birthDate"),
		Description: r.FormValue("description"),
		Price:       utils.ToInt(r.FormValue("price")),
		TranState:   r.FormValue("tranState"),
	}

	// 画像と動画をアップロード
	imageURLs := []string{}
	for i := 1; i <= 4; i++ {
		file, _, err := r.FormFile(fmt.Sprintf("image%d", i))
		if err != nil {
			log.Printf("Image%d not found: %v", i, err)
			continue
		}
		defer file.Close()

		tempPath, err := utils.SaveTemporaryFile(file)
		if err != nil {
			http.Error(w, "Failed to save temporary file", http.StatusInternalServerError)
			return
		}
		defer utils.DeleteTemporaryFile(tempPath)

		imagePath := fmt.Sprintf("kittens/kitten%d/image%d.JPG", dto.FatherCatID, i)
		uploadedFile, err := c.StorageService.UploadFile(storage.UploadFileDTO{
			Bucket:   "images",
			Path:     imagePath,
			FilePath: tempPath,
		})
		if err != nil {
			http.Error(w, "Failed to upload photo to Supabase", http.StatusInternalServerError)
			return
		}
		imageURLs = append(imageURLs, uploadedFile.PublicURL)
	}

	// 動画アップロード
	videoFile, _, err := r.FormFile("video")
	var videoURL string
	if err == nil {
		defer videoFile.Close()

		videoTempPath, err := utils.SaveTemporaryFile(videoFile)
		if err != nil {
			http.Error(w, "Failed to save temporary file", http.StatusInternalServerError)
			return
		}
		defer utils.DeleteTemporaryFile(videoTempPath)

		videoPath := fmt.Sprintf("kittens/kitten%d/video.MP4", dto.FatherCatID)
		uploadedVideo, err := c.StorageService.UploadFile(storage.UploadFileDTO{
			Bucket:   "videos",
			Path:     videoPath,
			FilePath: videoTempPath,
		})
		if err != nil {
			http.Error(w, "Failed to upload video to Supabase", http.StatusInternalServerError)
			return
		}
		videoURL = uploadedVideo.PublicURL
	}

	// DTOにアップロード結果を追加
	dto.ImageUrls = imageURLs
	dto.VideoURL = videoURL

	// サービス層を呼び出してデータを保存
	kittenID, err := c.KittenService.PostKitten(dto)
	if err != nil {
		http.Error(w, "Failed to save kitten data", http.StatusInternalServerError)
		return
	}

	// 成功レスポンス
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":   "success",
		"kittenId": kittenID,
		"images":   imageURLs,
		"video":    videoURL,
	})
}
