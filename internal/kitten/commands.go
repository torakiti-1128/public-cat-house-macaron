package kitten

import (
	"chm-api/internal/utils"
	"encoding/json"
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

	// 子猫情報を保存
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
	imageUrls, err := c.KittenService.PostKittenImages(kittenId, imageFiles)
	if err != nil {
		http.Error(w, "画像のアップロードに失敗しました", http.StatusInternalServerError)
		log.Printf("画像アップロードエラー: %v", err)
		return
	}

	// 動画ファイルを取得
	videoFile, _, err := r.FormFile("video")
	if err != nil {
		if err != http.ErrMissingFile {
			log.Printf("動画ファイル取得エラー: %v", err)
			http.Error(w, "動画ファイルの取得に失敗しました", http.StatusBadRequest)
			return
		}
		videoFile = nil // 動画はオプション
	}

	// 動画アップロード処理
	if videoFile != nil {
		err = c.KittenService.PostKittenVideo(kittenId, videoFile)
		if err != nil {
			http.Error(w, "動画のアップロードに失敗しました", http.StatusInternalServerError)
			log.Printf("動画アップロードエラー: %v", err)
			return
		}
	}

	// レスポンス
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":   "success",
		"kittenId": kittenId,
		"images":   imageUrls,
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

	log.Printf("更新データ確認: %v", dto)
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
		http.Error(w, "子猫情報の消去に失敗しました", http.StatusInternalServerError)
		log.Printf("子猫情報の消去エラー: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("子猫情報を消去しました"))
}
