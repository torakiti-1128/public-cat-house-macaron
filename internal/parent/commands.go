package parent

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

// 親猫一覧取得コマンド
type CommandGetParentCats struct {
	Service ParentService
}

// 親猫詳細取得コマンド
type CommandGetParentCatDetail struct {
	Service ParentService
}

// 親猫追加コマンド
type CommandPostParentCat struct {
	ParentService  ParentService
	StorageService storage.StorageService
}

// 親猫一覧取得コンストラクタ
func NewCommandGetParentCats(service ParentService) *CommandGetParentCats {
	return &CommandGetParentCats{Service: service}
}

// 親猫詳細取得コンストラクタ
func NewCommandGetParentCatDetail(service ParentService) *CommandGetParentCatDetail {
	return &CommandGetParentCatDetail{Service: service}
}

// 親猫追加コンストラクタ
func NewCommandPostParentCat(parentService ParentService, storageService storage.StorageService) *CommandPostParentCat {
	return &CommandPostParentCat{ParentService: parentService, StorageService: storageService}
}

// 親猫一覧取得コマンドの実行
func (c *CommandGetParentCats) Execute(w http.ResponseWriter, r *http.Request) {
	parentCats, err := c.Service.GetParentCats()
	if err != nil {
		http.Error(w, "親猫一覧の取得に失敗しました", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(parentCats); err != nil {
		http.Error(w, "レスポンスの変換に失敗しました", http.StatusInternalServerError)
		return
	}
}

// 親猫詳細取得コマンドの実行
func (c *CommandGetParentCatDetail) Execute(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	parentCatIdStr, ok := vars["parentCatId"]
	if !ok {
		http.Error(w, "parentCatIdが必須です", http.StatusBadRequest)
		return
	}

	parentCatId, err := strconv.Atoi(parentCatIdStr)
	if err != nil {
		http.Error(w, "parentCatIdが有効ではありません", http.StatusBadRequest)
		return
	}

	parentCatDetail, err := c.Service.GetParentCatDetail(parentCatId)
	if err != nil {
		http.Error(w, "親猫詳細の取得に失敗しました", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(parentCatDetail); err != nil {
		http.Error(w, "レスポンスの変換に失敗しました", http.StatusInternalServerError)
		return
	}
}

// 親猫追加コマンドの実行
func (c *CommandPostParentCat) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	// リクエストをデータにマッピング
	dto := PostParentCatDTO{
		BreedId:     utils.ToInt(r.FormValue("breedId")),
		ColorId:     utils.ToInt(r.FormValue("colorId")),
		Name:        r.FormValue("name"),
		Sex:         utils.ToInt(r.FormValue("sex")),
		Age:         utils.ToInt(r.FormValue("age")),
		BirthDate:   r.FormValue("birthDate"),
		Description: r.FormValue("description"),
		ImageUrl:    "",
	}

	parentCatId, err := c.ParentService.PostParentCat(dto)
	if err != nil {
		http.Error(w, "親猫情報の保存に失敗しました", http.StatusInternalServerError)
		log.Printf("親猫情報の保存エラー: %v", err)
		return
	}

	file, _, err := r.FormFile("image")
	if err != nil {
		log.Printf("画像がリクエストに含まれていません: %v", err)
		return
	}

	imagePath := fmt.Sprintf("parent-cats/image%d.jpg", parentCatId)
	uploadedFile, err := c.StorageService.UploadFileToStorage(file, "images", imagePath)
	if err != nil {
		log.Printf("画像のアップロードエラー: %v", err)
		return
	}

	err = c.ParentService.UpdateParentCatImage(parentCatId, uploadedFile.PublicUrl)
	if err != nil {
		log.Printf("親猫画像の更新エラー: %v", err)
	}
}
