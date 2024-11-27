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
	ParentService ParentService
}

// 親猫詳細取得コマンド
type CommandGetParentCatDetail struct {
	ParentService ParentService
}

// 親猫追加コマンド
type CommandPostParentCat struct {
	ParentService  ParentService
	StorageService storage.StorageService
}

// 親猫一覧取得コマンド
type CommandUpdateParentCat struct {
	ParentService ParentService
}

// 親猫一覧取得コマンド
type CommandDeleteParentCat struct {
	ParentService ParentService
}

// 親猫一覧取得コンストラクタ
func NewCommandGetParentCats(parentService ParentService) *CommandGetParentCats {
	return &CommandGetParentCats{ParentService: parentService}
}

// 親猫詳細取得コンストラクタ
func NewCommandGetParentCatDetail(parentService ParentService) *CommandGetParentCatDetail {
	return &CommandGetParentCatDetail{ParentService: parentService}
}

// 親猫追加コンストラクタ
func NewCommandPostParentCat(parentService ParentService, storageService storage.StorageService) *CommandPostParentCat {
	return &CommandPostParentCat{ParentService: parentService, StorageService: storageService}
}

// 親猫更新コンストラクタ
func NewCommandUpdateParentCat(parentService ParentService) *CommandUpdateParentCat {
	return &CommandUpdateParentCat{ParentService: parentService}
}

// 親猫消去コンストラクタ
func NewCommandDeleteParentCat(parentService ParentService) *CommandDeleteParentCat {
	return &CommandDeleteParentCat{ParentService: parentService}
}

// 親猫一覧取得コマンドの実行
func (c *CommandGetParentCats) Execute(w http.ResponseWriter, r *http.Request) {
	parentCats, err := c.ParentService.GetParentCats()
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

	parentCatDetail, err := c.ParentService.GetParentCatDetail(parentCatId)
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

	imagePath := fmt.Sprintf("parent-cats/cat%d.jpg", parentCatId)
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

// 親猫更新コマンドの実行
func (c *CommandUpdateParentCat) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	// リクエストをデータにマッピング
	dto := UpdateParentCatDTO{
		ParentCatId: utils.ToInt(r.FormValue("parentCatId")),
		BreedId:     utils.ToInt(r.FormValue("breedId")),
		ColorId:     utils.ToInt(r.FormValue("colorId")),
		Name:        r.FormValue("name"),
		Sex:         utils.ToInt(r.FormValue("sex")),
		Age:         utils.ToInt(r.FormValue("age")),
		BirthDate:   r.FormValue("birthDate"),
		Description: r.FormValue("description"),
	}

	err := c.ParentService.UpdateParentCat(dto)
	if err != nil {
		http.Error(w, "親猫情報の更新に失敗しました", http.StatusInternalServerError)
		log.Printf("親猫情報の更新エラー: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("親猫情報を正常に更新しました"))
}

// 親猫削除コマンドの実行
func (c *CommandDeleteParentCat) Execute(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	parentCatIdStr, ok := vars["parentCatId"]
	if !ok {
		http.Error(w, "parentCatIdが必要です", http.StatusBadRequest)
		return
	}
	parentCatId := utils.ToInt(parentCatIdStr)

	err := c.ParentService.DeleteParentCat(parentCatId)
	if err != nil {
		http.Error(w, "親猫情報の削除に失敗しました", http.StatusInternalServerError)
		log.Printf("親猫情報の削除エラー: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("親猫情報を正常に削除しました"))
}
