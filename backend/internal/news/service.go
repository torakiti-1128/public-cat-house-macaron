package news

import "fmt"

// ニュースビジネスロジックインターフェース
type NewsService interface {
	// ニュース一覧を取得
	GetNews() ([]NewsDTO, error)
	// ニュースを追加
	PostNews(dto PostNewsDTO) (int, error)
	// ニュースの更新
	UpdateNews(dto UpdateNewsDTO) error
	// ニュースの消去
	DeleteNews(newsId int) error
}

// ニュースビジネスロジック実装
type NewsServiceImpl struct {
	Repo NewsRepository
}

// ニュースビジネスロジックコンストラクタ
func NewNewsService(repo NewsRepository) NewsService {
	return &NewsServiceImpl{Repo: repo}
}

// ニュース一覧を取得
func (s *NewsServiceImpl) GetNews() ([]NewsDTO, error) {
	news, err := s.Repo.GetNews()
	if err != nil {
		fmt.Printf("ニュース一覧の取得に失敗しました: %v\n", err)
		return nil, fmt.Errorf("ニュース一覧の取得に失敗しました: %w", err)
	}
	return news, nil
}

// ニュースを追加
func (s *NewsServiceImpl) PostNews(dto PostNewsDTO) (int, error) {
	newsId, err := s.Repo.PostNews(dto)
	if err != nil {
		fmt.Printf("ニュースの追加に失敗しました (Title: %s): %v\n", dto.Title, err)
		return 0, fmt.Errorf("ニュースの追加に失敗しました: %w", err)
	}
	return newsId, nil
}

// ニュースの更新
func (s *NewsServiceImpl) UpdateNews(dto UpdateNewsDTO) error {
	err := s.Repo.UpdateNews(dto)
	if err != nil {
		fmt.Printf("ニュースの更新に失敗しました (NewsId: %d, Title: %s): %v\n", dto.NewsId, dto.Title, err)
		return fmt.Errorf("ニュースの更新に失敗しました: %w", err)
	}
	return nil
}

// ニュースの消去
func (s *NewsServiceImpl) DeleteNews(newsId int) error {
	err := s.Repo.DeleteNews(newsId)
	if err != nil {
		fmt.Printf("ニュースの削除に失敗しました (NewsId: %d): %v\n", newsId, err)
		return fmt.Errorf("ニュースの削除に失敗しました: %w", err)
	}
	return nil
}
