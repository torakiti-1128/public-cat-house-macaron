package color

import "fmt"

// カラーサービスインターフェース
type ColorService interface {
	GetColors() ([]ColorDTO, error)
	PostColor(dto PostColorDTO) (int, error)
	UpdateColor(dto UpdateColorDTO) error
	DeleteColor(colorId int) error
}

// カラーサービス実装
type ColorServiceImpl struct {
	Repo ColorRepository
}

func NewColorService(repo ColorRepository) ColorService {
	return &ColorServiceImpl{Repo: repo}
}

func (s *ColorServiceImpl) GetColors() ([]ColorDTO, error) {
	colors, err := s.Repo.GetColors()
	if err != nil {
		fmt.Printf("カラー一覧の取得に失敗しました: %v\n", err)
		return nil, fmt.Errorf("カラー一覧の取得に失敗しました: %w", err)
	}
	return colors, nil
}

func (s *ColorServiceImpl) PostColor(dto PostColorDTO) (int, error) {
	colorId, err := s.Repo.PostColor(dto)
	if err != nil {
		fmt.Printf("カラーの追加に失敗しました (ColorName: %s): %v\n", dto.ColorName, err)
		return 0, fmt.Errorf("カラーの追加に失敗しました: %w", err)
	}
	return colorId, nil
}

func (s *ColorServiceImpl) UpdateColor(dto UpdateColorDTO) error {
	err := s.Repo.UpdateColor(dto)
	if err != nil {
		fmt.Printf("カラーの更新に失敗しました (ColorId: %d, ColorName: %s): %v\n", dto.ColorId, dto.ColorName, err)
		return fmt.Errorf("カラーの更新に失敗しました: %w", err)
	}
	return nil
}

func (s *ColorServiceImpl) DeleteColor(colorId int) error {
	err := s.Repo.DeleteColor(colorId)
	if err != nil {
		fmt.Printf("カラーの削除に失敗しました (ColorId: %d): %v\n", colorId, err)
		return fmt.Errorf("カラーの削除に失敗しました: %w", err)
	}
	return nil
}
