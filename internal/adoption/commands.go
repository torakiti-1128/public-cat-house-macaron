package adoption

import (
	"chm-api/internal/utils"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// 里親募集中猫一覧取得コマンド
type CommandGetAdoptionCats struct {
	AdoptionService AdoptionService
}

// 里親募集中猫詳細取得コマンド
type CommandGetAdoptionCatDetail struct {
	AdoptionService AdoptionService
}

// 里親募集中猫追加コマンド
type CommandPostAdoptionCat struct {
	AdoptionService AdoptionService
}

// 里親募集中猫更新コマンド
type CommandUpdateAdoptionCat struct {
	AdoptionService AdoptionService
}

// 里親募集中猫削除コマンド
type CommandDeleteAdoptionCat struct {
	AdoptionService AdoptionService
}

// 里親募集中猫一覧取得コンストラクタ
func NewCommandGetAdoptionCats(adoptionService AdoptionService) *CommandGetAdoptionCats {
	return &CommandGetAdoptionCats{AdoptionService: adoptionService}
}

// 里親募集中猫追加コンストラクタ
func NewCommandPostAdoptionCat(adoptionService AdoptionService) *CommandPostAdoptionCat {
	return &CommandPostAdoptionCat{AdoptionService: adoptionService}
}

// 里親募集中猫更新コンストラクタ
func NewCommandUpdateAdoptionCat(adoptionService AdoptionService) *CommandUpdateAdoptionCat {
	return &CommandUpdateAdoptionCat{AdoptionService: adoptionService}
}

// 里親募集中猫削除コンストラクタ
func NewCommandDeleteAdoptionCat(adoptionService AdoptionService) *CommandDeleteAdoptionCat {
	return &CommandDeleteAdoptionCat{AdoptionService: adoptionService}
}

// 里親募集中猫一覧取得コマンドの実行
func (c *CommandGetAdoptionCats) Execute(w http.ResponseWriter, r *http.Request) {
	adoptionCats, err := c.AdoptionService.GetAdoptionCats()
	if err != nil {
		http.Error(w, "里親募集中猫一覧の取得に失敗しました", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(adoptionCats); err != nil {
		http.Error(w, "レスポンスの変換に失敗しました", http.StatusInternalServerError)
		return
	}
}

// 里親募集中猫追加コマンドの実行
func (c *CommandPostAdoptionCat) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	// リクエストをデータにマッピング
	dto := PostAdoptionCatDTO{
		BreedId:     utils.ToInt(r.FormValue("breedId")),
		ColorId:     utils.ToInt(r.FormValue("colorId")),
		Name:        r.FormValue("name"),
		Sex:         utils.ToInt(r.FormValue("sex")),
		Age:         utils.ToInt(r.FormValue("age")),
		BirthDate:   r.FormValue("birthDate"),
		Description: r.FormValue("description"),
		ImageUrl:    "",
	}

	adoptionCatId, err := c.AdoptionService.PostAdoptionCat(dto)
	if err != nil {
		http.Error(w, "里親募集中猫情報の保存に失敗しました", http.StatusInternalServerError)
		log.Printf("里親募集中猫情報の保存エラー: %v", err)
		return
	}

	file, _, err := r.FormFile("image")
	if err != nil {
		log.Printf("画像がリクエストに含まれていません: %v", err)
		return
	}

	err = c.AdoptionService.UpdateAdoptionCatImage(adoptionCatId, file)
	if err != nil {
		log.Printf("里親募集中猫画像の更新エラー: %v", err)
	}
}

// 里親募集中猫更新コマンドの実行
func (c *CommandUpdateAdoptionCat) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	// リクエストをデータにマッピング
	dto := UpdateAdoptionCatDTO{
		AdoptionCatId: utils.ToInt(r.FormValue("adoptionCatId")),
		BreedId:       utils.ToInt(r.FormValue("breedId")),
		ColorId:       utils.ToInt(r.FormValue("colorId")),
		Name:          r.FormValue("name"),
		Sex:           utils.ToInt(r.FormValue("sex")),
		Age:           utils.ToInt(r.FormValue("age")),
		BirthDate:     r.FormValue("birthDate"),
		Description:   r.FormValue("description"),
	}

	err := c.AdoptionService.UpdateAdoptionCat(dto)
	if err != nil {
		http.Error(w, "里親募集中猫情報の更新に失敗しました", http.StatusInternalServerError)
		log.Printf("里親募集中猫情報の更新エラー: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("里親募集中猫情報を正常に更新しました"))
}

// 里親募集中猫削除コマンドの実行
func (c *CommandDeleteAdoptionCat) Execute(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	adoptionCatIdStr, ok := vars["adoptionCatId"]
	if !ok {
		http.Error(w, "adoptionCatIdが必要です", http.StatusBadRequest)
		return
	}
	adoptionCatId := utils.ToInt(adoptionCatIdStr)

	err := c.AdoptionService.DeleteAdoptionCat(adoptionCatId)
	if err != nil {
		http.Error(w, "里親募集中猫情報の削除に失敗しました", http.StatusInternalServerError)
		log.Printf("里親募集中猫情報の削除エラー: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("里親募集中猫情報を正常に削除しました"))
}