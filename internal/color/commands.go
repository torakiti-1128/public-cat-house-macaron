package color

import (
	"chm-api/internal/utils"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

// カラー一覧取得コマンド
type CommandGetColors struct {
	ColorService ColorService
}

// カラー追加コマンド
type CommandPostColor struct {
	ColorService ColorService
}

// カラー更新コマンド
type CommandUpdateColor struct {
	ColorService ColorService
}

// カラー削除コマンド
type CommandDeleteColor struct {
	ColorService ColorService
}

// カラー一覧取得コンストラクタ
func NewCommandGetColors(colorService ColorService) *CommandGetColors {
	return &CommandGetColors{ColorService: colorService}
}

// カラー追加コマンドコンストラクタ
func NewCommandPostColor(colorService ColorService) *CommandPostColor {
	return &CommandPostColor{ColorService: colorService}
}

// カラー更新コマンドコンストラクタ
func NewCommandUpdateColor(colorService ColorService) *CommandUpdateColor {
	return &CommandUpdateColor{ColorService: colorService}
}

// カラー削除コマンドコンストラクタ
func NewCommandDeleteColor(colorService ColorService) *CommandDeleteColor {
	return &CommandDeleteColor{ColorService: colorService}
}

// カラー一覧取得コマンドの実行
func (c *CommandGetColors) Execute(w http.ResponseWriter, r *http.Request) {
	colors, err := c.ColorService.GetColors()
	if err != nil {
		http.Error(w, "カラー一覧の取得に失敗しました", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(colors); err != nil {
		http.Error(w, "レスポンスの変換に失敗しました", http.StatusInternalServerError)
		return
	}
}

// カラー追加コマンドの実行
func (c *CommandPostColor) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	dto := PostColorDTO{
		ColorName: r.FormValue("colorName"),
	}

	colorId, err := c.ColorService.PostColor(dto)
	if err != nil {
		http.Error(w, "カラーの保存に失敗しました", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("カラーが正常に追加されました。ID: %d", colorId)))
}

// カラー更新コマンドの実行
func (c *CommandUpdateColor) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	dto := UpdateColorDTO{
		ColorId:   utils.ToInt(r.FormValue("colorId")),
		ColorName: r.FormValue("colorName"),
	}

	err := c.ColorService.UpdateColor(dto)
	if err != nil {
		http.Error(w, "カラーの更新に失敗しました", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("カラーが正常に更新されました"))
}

// カラー削除コマンドの実行
func (c *CommandDeleteColor) Execute(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	colorIdStr, ok := vars["colorId"]
	if !ok {
		http.Error(w, "colorIdが必要です", http.StatusBadRequest)
		return
	}
	colorId := utils.ToInt(colorIdStr)

	err := c.ColorService.DeleteColor(colorId)
	if err != nil {
		http.Error(w, "カラーの削除に失敗しました", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("カラーが正常に削除されました"))
}
