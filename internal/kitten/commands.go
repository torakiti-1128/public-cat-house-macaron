package kitten

import (
	"encoding/json"
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

// コンストラクタ
func NewCommandGetKittens(service KittenService) *CommandGetKittens {
	return &CommandGetKittens{Service: service}
}

// コンストラクタ
func NewCommandGetKittenDetail(service KittenService) *CommandGetKittenDetail {
	return &CommandGetKittenDetail{Service: service}
}

// Execute 子猫リスト取得コマンドの実行
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

// Execute 子猫詳細取得コマンドの実行
func (c *CommandGetKittenDetail) Execute(w http.ResponseWriter, r *http.Request) {
	// パスパラメータから kittenID を取得
	vars := mux.Vars(r)
	kittenIdStr, ok := vars["kittenId"]
	if !ok {
		http.Error(w, "kittenId is required", http.StatusBadRequest)
		return
	}

	// kittenID を整数に変換
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

	// JSON レスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(kittenDetail); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
