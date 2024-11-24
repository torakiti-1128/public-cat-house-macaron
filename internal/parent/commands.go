package parent

import (
	"encoding/json"
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

// コンストラクタ
func NewCommandGetParentCats(service ParentService) *CommandGetParentCats {
	return &CommandGetParentCats{Service: service}
}

// コンストラクタ
func NewCommandGetParentCatDetail(service ParentService) *CommandGetParentCatDetail {
	return &CommandGetParentCatDetail{Service: service}
}

// 親猫一覧取得
func (c *CommandGetParentCats) Execute(w http.ResponseWriter, r *http.Request) {
	parentCats, err := c.Service.GetParentCats()
	if err != nil {
		http.Error(w, "Failed to fetch parent cats", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(parentCats); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

// 親猫詳細取得
func (c *CommandGetParentCatDetail) Execute(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	parentCatIdStr, ok := vars["parentCatId"]
	if !ok {
		http.Error(w, "parentCatId is required", http.StatusBadRequest)
		return
	}

	parentCatId, err := strconv.Atoi(parentCatIdStr)
	if err != nil {
		http.Error(w, "parentCatId must be a valid number", http.StatusBadRequest)
		return
	}

	parentCatDetail, err := c.Service.GetParentCatDetail(parentCatId)
	if err != nil {
		http.Error(w, "Failed to fetch parent cat detail", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(parentCatDetail); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
