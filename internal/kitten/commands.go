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

	// サービスを呼び出して詳細情報を取得
	kittenDetail, err := c.Service.GetKittenDetail(kittenId)
	if err != nil {
		http.Error(w, "Failed to fetch kitten detail", http.StatusInternalServerError)
		return
	}

	// JSONレスポンスを返す
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

	// 子猫情報を保存し KittenID を取得
	kittenID, err := c.KittenService.PostKitten(dto)
	if err != nil {
		http.Error(w, "Failed to save kitten data", http.StatusInternalServerError)
		log.Printf("Error saving kitten data: %v", err)
		return
	}

	// 画像のアップロードと保存
	imageURLs := []string{}
	for i := 1; i <= 4; i++ {
		file, _, err := r.FormFile(fmt.Sprintf("image%d", i))
		if err != nil {
			log.Printf("Info: Image%d not found or not included in the request", i)
			continue
		}
		defer file.Close()

		tempPath, err := utils.SaveTemporaryFile(file)
		if err != nil {
			http.Error(w, "Failed to save temporary file for image", http.StatusInternalServerError)
			log.Printf("Error saving temporary file for image%d: %v", i, err)
			return
		}
		defer utils.DeleteTemporaryFile(tempPath)

		imagePath := fmt.Sprintf("kittens/kitten%d/image%d.IPG", kittenID, i)
		uploadedFile, err := c.StorageService.UploadFile(storage.UploadFileDTO{
			Bucket:   "images",
			Path:     imagePath,
			FilePath: tempPath,
		})
		if err != nil {
			http.Error(w, "Failed to upload photo to Supabase", http.StatusInternalServerError)
			log.Printf("Error uploading file to Supabase: %v\n", err)
			return
		}

		imageURLs = append(imageURLs, uploadedFile.PublicURL)

		// データベースに画像を保存
		err = c.KittenService.PostKittenImage(kittenID, uploadedFile.PublicURL)
		if err != nil {
			http.Error(w, "Failed to save kitten image to database", http.StatusInternalServerError)
			log.Printf("Error saving kitten image to database: %v", err)
			return
		}
	}

	// 動画のアップロードと保存
	var videoURL string
	videoFile, _, err := r.FormFile("video")
	if err == nil {
		defer videoFile.Close()

		videoTempPath, err := utils.SaveTemporaryFile(videoFile)
		if err != nil {
			http.Error(w, "Failed to save temporary file for video", http.StatusInternalServerError)
			log.Printf("Error saving temporary file for video: %v", err)
			return
		}
		defer utils.DeleteTemporaryFile(videoTempPath)

		videoPath := fmt.Sprintf("kittens/Cat%d.MP4", kittenID)
		uploadedVideo, err := c.StorageService.UploadFile(storage.UploadFileDTO{
			Bucket:   "videos",
			Path:     videoPath,
			FilePath: videoTempPath,
		})
		if err != nil {
			http.Error(w, "Failed to upload video to Supabase", http.StatusInternalServerError)
			log.Printf("Error uploading video to Supabase: %v", err)
			return
		}
		videoURL = uploadedVideo.PublicURL

		// データベースに動画を保存
		err = c.KittenService.PostKittenVideo(kittenID, videoURL)
		if err != nil {
			http.Error(w, "Failed to save kitten video to database", http.StatusInternalServerError)
			log.Printf("Error saving kitten video to database: %v", err)
			return
		}
	} else {
		log.Printf("Video file not found or failed to read: %v", err)
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
