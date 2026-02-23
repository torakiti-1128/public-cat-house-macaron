package news

import (
	"chm-api/internal/utils"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

// ニュース一覧取得コマンド
type CommandGetNews struct {
	NewsService NewsService
}

// ニュース追加コマンド
type CommandPostNews struct {
	NewsService NewsService
}

// ニュース更新コマンド
type CommandUpdateNews struct {
	NewsService NewsService
}

// ニュース削除コマンド
type CommandDeleteNews struct {
	NewsService NewsService
}

// ニュース一覧取得コマンドコンストラクタ
func NewCommandGetNews(newsService NewsService) *CommandGetNews {
	return &CommandGetNews{NewsService: newsService}
}

// ニュース追加コマンドコンストラクタ
func NewCommandPostNews(newsService NewsService) *CommandPostNews {
	return &CommandPostNews{NewsService: newsService}
}

// ニュース更新コマンドコンストラクタ
func NewCommandUpdateNews(newsService NewsService) *CommandUpdateNews {
	return &CommandUpdateNews{NewsService: newsService}
}

// ニュース削除コマンドコンストラクタ
func NewCommandDeleteNews(newsService NewsService) *CommandDeleteNews {
	return &CommandDeleteNews{NewsService: newsService}
}

// ニュース一覧取得コマンドの実行
func (c *CommandGetNews) Execute(w http.ResponseWriter, r *http.Request) {
	news, err := c.NewsService.GetNews()
	if err != nil {
		http.Error(w, "ニュース一覧の取得に失敗しました", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(news); err != nil {
		http.Error(w, "レスポンスの変換に失敗しました", http.StatusInternalServerError)
		return
	}
}

// ニュース追加コマンドの実行
func (c *CommandPostNews) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	dto := PostNewsDTO{
		Title:   r.FormValue("title"),
		Content: r.FormValue("content"),
	}

	newsId, err := c.NewsService.PostNews(dto)
	if err != nil {
		http.Error(w, "ニュースの保存に失敗しました", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("ニュースが正常に追加されました。ID: %d", newsId)))
}

// ニュース更新コマンドの実行
func (c *CommandUpdateNews) Execute(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "リクエストの処理に失敗しました", http.StatusBadRequest)
		return
	}

	dto := UpdateNewsDTO{
		NewsId:  utils.ToInt(r.FormValue("newsId")),
		Title:   r.FormValue("title"),
		Content: r.FormValue("content"),
	}

	err := c.NewsService.UpdateNews(dto)
	if err != nil {
		http.Error(w, "ニュースの更新に失敗しました", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ニュースが正常に更新されました"))
}

// ニュース削除コマンドの実行
func (c *CommandDeleteNews) Execute(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	newsIdStr, ok := vars["newsId"]
	if !ok {
		http.Error(w, "newsIdが必要です", http.StatusBadRequest)
		return
	}
	newsId := utils.ToInt(newsIdStr)

	err := c.NewsService.DeleteNews(newsId)
	if err != nil {
		http.Error(w, "ニュースの削除に失敗しました", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ニュースが正常に削除されました"))
}
