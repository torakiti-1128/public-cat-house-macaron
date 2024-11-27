package color

import (
	"database/sql"
	"fmt"
)

// カラーリポジトリインターフェース
type ColorRepository interface {
	GetColors() ([]ColorDTO, error)
	PostColor(dto PostColorDTO) (int, error)
	UpdateColor(dto UpdateColorDTO) error
	DeleteColor(colorId int) error
}

// カラーリポジトリ実装
type ColorRepositoryImpl struct {
	DB *sql.DB
}

func NewColorRepository(db *sql.DB) ColorRepository {
	return &ColorRepositoryImpl{DB: db}
}

func (repo *ColorRepositoryImpl) GetColors() ([]ColorDTO, error) {
	query := `SELECT color_id, color_name FROM colors`
	rows, err := repo.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("カラー一覧の取得に失敗しました: %w", err)
	}
	defer rows.Close()

	var colors []ColorDTO
	for rows.Next() {
		var color ColorDTO
		if err := rows.Scan(&color.ColorId, &color.ColorName); err != nil {
			return nil, fmt.Errorf("データのスキャンに失敗しました: %w", err)
		}
		colors = append(colors, color)
	}
	return colors, nil
}

func (repo *ColorRepositoryImpl) PostColor(dto PostColorDTO) (int, error) {
	query := `INSERT INTO colors (color_name) VALUES ($1) RETURNING color_id`
	var colorId int
	err := repo.DB.QueryRow(query, dto.ColorName).Scan(&colorId)
	if err != nil {
		return 0, fmt.Errorf("カラーの追加に失敗しました: %w", err)
	}
	return colorId, nil
}

func (repo *ColorRepositoryImpl) UpdateColor(dto UpdateColorDTO) error {
	query := `UPDATE colors SET color_name = $1 WHERE color_id = $2`
	_, err := repo.DB.Exec(query, dto.ColorName, dto.ColorId)
	if err != nil {
		return fmt.Errorf("カラーの更新に失敗しました: %w", err)
	}
	return nil
}

func (repo *ColorRepositoryImpl) DeleteColor(colorId int) error {
	query := `DELETE FROM colors WHERE color_id = $1`
	_, err := repo.DB.Exec(query, colorId)
	if err != nil {
		return fmt.Errorf("カラーの削除に失敗しました: %w", err)
	}
	return nil
}
