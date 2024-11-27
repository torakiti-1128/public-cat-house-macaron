package news

type NewsDTO struct {
	NewsId  int    `json:"newsId"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

type PostNewsDTO struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

type UpdateNewsDTO struct {
	NewsId  int    `json:"newsId"`
	Title   string `json:"title"`
	Content string `json:"content"`
}
