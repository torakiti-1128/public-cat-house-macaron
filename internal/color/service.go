package color

import "fmt"

// カラービジネスロジックインターフェース
type ColorService interface {
	// カラー一覧を取得
	GetColors() ([]ColorDTO, error)
	// カラーを追加
	PostColor(dto PostColorDTO) (int, error)
	// カラーの更新
	UpdateColor(dto UpdateColorDTO) error
	// カラーの消去
	DeleteColor(colorId int) error
}

// カラービジネスロジック実装
type ColorServiceImpl struct {
	Repo ColorRepository
}

// カラービジネスロジックコンストラクタ
func NewColorService(repo ColorRepository) ColorService {
	return &ColorServiceImpl{Repo: repo}
}

// カラー一覧を取得
func (s *ColorServiceImpl) GetColors() ([]ColorDTO, error) {
	colors, err := s.Repo.GetColors()
	if err != nil {
		fmt.Printf("カラー一覧の取得に失敗しました: %v\n", err)
		return nil, fmt.Errorf("カラー一覧の取得に失敗しました: %w", err)
	}
	return colors, nil
}

// カラーを追加
func (s *ColorServiceImpl) PostColor(dto PostColorDTO) (int, error) {
	colorId, err := s.Repo.PostColor(dto)
	if err != nil {
		fmt.Printf("カラーの追加に失敗しました (ColorName: %s): %v\n", dto.ColorName, err)
		return 0, fmt.Errorf("カラーの追加に失敗しました: %w", err)
	}
	return colorId, nil
}

// カラーの更新
func (s *ColorServiceImpl) UpdateColor(dto UpdateColorDTO) error {
	err := s.Repo.UpdateColor(dto)
	if err != nil {
		fmt.Printf("カラーの更新に失敗しました (ColorId: %d, ColorName: %s): %v\n", dto.ColorId, dto.ColorName, err)
		return fmt.Errorf("カラーの更新に失敗しました: %w", err)
	}
	return nil
}

// カラーの消去
func (s *ColorServiceImpl) DeleteColor(colorId int) error {
	err := s.Repo.DeleteColor(colorId)
	if err != nil {
		fmt.Printf("カラーの削除に失敗しました (ColorId: %d): %v\n", colorId, err)
		return fmt.Errorf("カラーの削除に失敗しました: %w", err)
	}
	return nil
}
