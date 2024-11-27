package news

import "fmt"

// ニュースサービスインターフェース
type NewsService interface {
	GetNews() ([]NewsDTO, error)
	PostNews(dto PostNewsDTO) (int, error)
	UpdateNews(dto UpdateNewsDTO) error
	DeleteNews(newsId int) error
}

// ニュースサービス実装
type NewsServiceImpl struct {
	Repo NewsRepository
}

func NewNewsService(repo NewsRepository) NewsService {
	return &NewsServiceImpl{Repo: repo}
}

func (s *NewsServiceImpl) GetNews() ([]NewsDTO, error) {
	news, err := s.Repo.GetNews()
	if err != nil {
		fmt.Printf("ニュース一覧の取得に失敗しました: %v\n", err)
		return nil, fmt.Errorf("ニュース一覧の取得に失敗しました: %w", err)
	}
	return news, nil
}

func (s *NewsServiceImpl) PostNews(dto PostNewsDTO) (int, error) {
	newsId, err := s.Repo.PostNews(dto)
	if err != nil {
		fmt.Printf("ニュースの追加に失敗しました (Title: %s): %v\n", dto.Title, err)
		return 0, fmt.Errorf("ニュースの追加に失敗しました: %w", err)
	}
	return newsId, nil
}

func (s *NewsServiceImpl) UpdateNews(dto UpdateNewsDTO) error {
	err := s.Repo.UpdateNews(dto)
	if err != nil {
		fmt.Printf("ニュースの更新に失敗しました (NewsId: %d, Title: %s): %v\n", dto.NewsId, dto.Title, err)
		return fmt.Errorf("ニュースの更新に失敗しました: %w", err)
	}
	return nil
}

func (s *NewsServiceImpl) DeleteNews(newsId int) error {
	err := s.Repo.DeleteNews(newsId)
	if err != nil {
		fmt.Printf("ニュースの削除に失敗しました (NewsId: %d): %v\n", newsId, err)
		return fmt.Errorf("ニュースの削除に失敗しました: %w", err)
	}
	return nil
}
