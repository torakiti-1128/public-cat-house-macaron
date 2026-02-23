package news

import (
	"database/sql"
	"fmt"
)

// ニュース関連のDBインターフェース
type NewsRepository interface {
	// ニュース一覧をDBから取得
	GetNews() ([]NewsDTO, error)
	// ニュースをDBに追加
	PostNews(dto PostNewsDTO) (int, error)
	// ニュースの更新をDBへ反映
	UpdateNews(dto UpdateNewsDTO) error
	// ニュースの消去をDBへ反映
	DeleteNews(newsId int) error
}

// ニュース関連のDB実装
type NewsRepositoryImpl struct {
	DB *sql.DB
}

// ニュース関連のDBコンストラクタ
func NewNewsRepository(db *sql.DB) NewsRepository {
	return &NewsRepositoryImpl{DB: db}
}

// ニュース一覧をDBから取得
func (repo *NewsRepositoryImpl) GetNews() ([]NewsDTO, error) {
	query := `SELECT news_id, title, content FROM news`
	rows, err := repo.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("ニュース一覧の取得に失敗しました: %w", err)
	}
	defer rows.Close()

	var newsList []NewsDTO
	for rows.Next() {
		var news NewsDTO
		if err := rows.Scan(&news.NewsId, &news.Title, &news.Content); err != nil {
			return nil, fmt.Errorf("データのスキャンに失敗しました: %w", err)
		}
		newsList = append(newsList, news)
	}
	return newsList, nil
}

// ニュースをDBに追加
func (repo *NewsRepositoryImpl) PostNews(dto PostNewsDTO) (int, error) {
	query := `INSERT INTO news (title, content) VALUES ($1, $2) RETURNING news_id`
	var newsId int
	err := repo.DB.QueryRow(query, dto.Title, dto.Content).Scan(&newsId)
	if err != nil {
		return 0, fmt.Errorf("ニュースの追加に失敗しました: %w", err)
	}
	return newsId, nil
}

// ニュースの更新をDBへ反映
func (repo *NewsRepositoryImpl) UpdateNews(dto UpdateNewsDTO) error {
	query := `UPDATE news SET title = $1, content = $2 WHERE news_id = $3`
	_, err := repo.DB.Exec(query, dto.Title, dto.Content, dto.NewsId)
	if err != nil {
		return fmt.Errorf("ニュースの更新に失敗しました: %w", err)
	}
	return nil
}

// ニュースの消去をDBへ反映
func (repo *NewsRepositoryImpl) DeleteNews(newsId int) error {
	query := `DELETE FROM news WHERE news_id = $1`
	_, err := repo.DB.Exec(query, newsId)
	if err != nil {
		return fmt.Errorf("ニュースの削除に失敗しました: %w", err)
	}
	return nil
}
