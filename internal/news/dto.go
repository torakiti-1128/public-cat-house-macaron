package news

// ニュースデータ
type NewsDTO struct {
	NewsId  int    `json:"newsId"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

// ニュース追加データ
type PostNewsDTO struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

// ニュース更新データ
type UpdateNewsDTO struct {
	NewsId  int    `json:"newsId"`
	Title   string `json:"title"`
	Content string `json:"content"`
}
