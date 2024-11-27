package kitten

import "fmt"

// 子猫関連のビジネスロジックインターフェース
type KittenService interface {
	// 子猫一覧を取得
	GetKittens() ([]KittensDTO, error)
	// 子猫詳細を取得
	GetKittenDetail(kittenId int) (KittenDetailDTO, error)
	// 子猫を追加
	PostKitten(dto PostKittenDTO) (int, error)
	// 子猫の写真を追加
	PostKittenImage(kittenId int, imageUrl string) error
	// 子猫の動画を追加
	PostKittenVideo(kittenId int, videoUrl string) error
	// 子猫の更新
	UpdateKitten(dto UpdateKittenDTO) error
	// 子猫の消去
	DeleteKitten(kittenId int) error
}

// 子猫関連のビジネスロジック実装
type KittenServiceImpl struct {
	Repo KittenRepository
}

// 子猫関連のビジネスロジックコンストラクタ
func NewKittenService(repo KittenRepository) KittenService {
	return &KittenServiceImpl{Repo: repo}
}

// 子猫詳細を取得
func (s *KittenServiceImpl) GetKittens() ([]KittensDTO, error) {
	kittens, err := s.Repo.GetKittens()
	if err != nil {
		fmt.Printf("子猫の一覧取得に失敗しました: %v\n", err)
		return nil, fmt.Errorf("子猫の一覧取得に失敗しました: %w", err)
	}
	return kittens, nil
}

// 子猫詳細を取得
func (s *KittenServiceImpl) GetKittenDetail(kittenId int) (KittenDetailDTO, error) {
	kittenDetail, err := s.Repo.GetKittenDetail(kittenId)
	if err != nil {
		fmt.Printf("子猫詳細の取得に失敗しました (KittenId: %d): %v\n", kittenId, err)
		return KittenDetailDTO{}, fmt.Errorf("子猫詳細の取得に失敗しました: %w", err)
	}
	return kittenDetail, nil
}

// 子猫を追加
func (s *KittenServiceImpl) PostKitten(dto PostKittenDTO) (int, error) {
	kittenId, err := s.Repo.PostKitten(dto)
	if err != nil {
		fmt.Printf("子猫の追加に失敗しました: %v\n", err)
		return 0, fmt.Errorf("子猫の追加に失敗しました: %w", err)
	}
	return kittenId, nil
}

// 子猫の写真を追加
func (s *KittenServiceImpl) PostKittenImage(kittenId int, imageUrl string) error {
	if err := s.Repo.PostKittenImage(kittenId, imageUrl); err != nil {
		fmt.Printf("子猫の写真の保存に失敗しました (KittenId: %d, ImageUrl: %s): %v\n", kittenId, imageUrl, err)
		return fmt.Errorf("子猫の写真の保存に失敗しました: %w", err)
	}
	return nil
}

// 子猫の動画を追加
func (s *KittenServiceImpl) PostKittenVideo(kittenId int, videoUrl string) error {
	if err := s.Repo.PostKittenVideo(kittenId, videoUrl); err != nil {
		fmt.Printf("子猫の動画の保存に失敗しました (KittenId: %d, VideoUrl: %s): %v\n", kittenId, videoUrl, err)
		return fmt.Errorf("子猫の動画の保存に失敗しました: %w", err)
	}
	return nil
}

// 子猫の更新
func (s *KittenServiceImpl) UpdateKitten(dto UpdateKittenDTO) error {
	if err := s.Repo.UpdateKitten(dto); err != nil {
		fmt.Printf("子猫の更新に失敗しました: %v\n", err)
		return fmt.Errorf("子猫の更新に失敗しました: %w", err)
	}
	return nil
}

// 子猫の消去
func (s *KittenServiceImpl) DeleteKitten(kittenId int) error {
	if err := s.Repo.DeleteKitten(kittenId); err != nil {
		fmt.Printf("子猫の消去にお失敗しました (KittenId: %d): %v\n", kittenId, err)
		return fmt.Errorf("子猫の消去に失敗しました: %w", err)
	}
	return nil
}
