package breed

import (
	"chm-api/internal/utils"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// 猫種一覧取得コマンド
type CommandGetBreeds struct {
	BreedService BreedService
}

// 猫種追加コマンド
type CommandPostBreed struct {
	BreedService BreedService
}

// 猫種更新コマンド
type CommandUpdateBreed struct {
	BreedService BreedService
}

// 猫種削除コマンド
type CommandDeleteBreed struct {
	BreedService BreedService
}

// 猫種一覧取得コマンドコンストラクタ
func NewCommandGetBreeds(breedService BreedService) *CommandGetBreeds {
	return &CommandGetBreeds{BreedService: breedService}
}

// 猫種追加コマンドコンストラクタ
func NewCommandPostBreed(breedService BreedService) *CommandPostBreed {
	return &CommandPostBreed{BreedService: breedService}
}

// 猫種更新コマンドコンストラクタ
func NewCommandUpdateBreed(breedService BreedService) *CommandUpdateBreed {
	return &CommandUpdateBreed{BreedService: breedService}
}

// 猫種削除コマンドコンストラクタ
func NewCommandDeleteBreed(breedService BreedService) *CommandDeleteBreed {
	return &CommandDeleteBreed{BreedService: breedService}
}

// 猫種一覧取得コマンドの実行
func (c *CommandGetBreeds) Execute(w http.ResponseWriter, r *http.Request) {
	breeds, err := c.BreedService.GetBreeds()
	if err != nil {
		http.Error(w, "猫種一覧の取得に失敗しました", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(breeds); err != nil {
		http.Error(w, "レスポンスの変換に失敗しました", http.StatusInternalServerError)
		return
	}
}

// 猫種追加コマンドの実行
func (c *CommandPostBreed) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	dto := PostBreedDTO{
		BreedName: r.FormValue("breedName"),
	}

	breedId, err := c.BreedService.PostBreed(dto)
	if err != nil {
		http.Error(w, "猫種の保存に失敗しました", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("猫種が正常に追加されました。ID: %d", breedId)))
}

// 猫種更新コマンドの実行
func (c *CommandUpdateBreed) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	dto := UpdateBreedDTO{
		BreedId:   utils.ToInt(r.FormValue("breedId")),
		BreedName: r.FormValue("breedName"),
	}

	log.Printf("breedId: %s, breedName: %s", r.FormValue("breedId"), r.FormValue("breedName"))

	err := c.BreedService.UpdateBreed(dto)
	if err != nil {
		http.Error(w, "猫種の更新に失敗しました", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("猫種が正常に更新されました"))
}

// 猫種削除コマンドの実行
func (c *CommandDeleteBreed) Execute(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	breedIdStr, ok := vars["breedId"]
	if !ok {
		http.Error(w, "breedIdが必要です", http.StatusBadRequest)
		return
	}
	breedId := utils.ToInt(breedIdStr)

	err := c.BreedService.DeleteBreed(breedId)
	if err != nil {
		http.Error(w, "猫種の削除に失敗しました", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("猫種が正常に削除されました"))
}
