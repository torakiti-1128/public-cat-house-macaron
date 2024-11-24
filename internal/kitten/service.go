package kitten

import (
	"fmt"
)

// インターフェース
type KittenService interface {
	GetKittens() ([]KittensDTO, error)
	GetKittenDetail(kittenId int) (KittenDetailDTO, error)
	PostKitten(dto PostKittenDTO) (int, error)
}

// 実装
type KittenServiceImpl struct {
	Repo KittenRepository
}

// コンストラクタ
func NewKittenService(repo KittenRepository) KittenService {
	return &KittenServiceImpl{Repo: repo}
}

// DBから子猫一覧を取得
func (s *KittenServiceImpl) GetKittens() ([]KittensDTO, error) {
	kittens, err := s.Repo.GetKittens()
	if err != nil {
		fmt.Printf("Error fetching kittens from repository: %v\n", err)
		return nil, err
	}
	return kittens, nil
}

// DBから子猫詳細を取得
func (s *KittenServiceImpl) GetKittenDetail(kittenId int) (KittenDetailDTO, error) {
	kittenDetail, err := s.Repo.GetKittenDetail(kittenId)
	if err != nil {
		fmt.Printf("Error fetching kitten detail from repository: %v\n", err)
		return KittenDetailDTO{}, err
	}
	return kittenDetail, nil
}

func (s *KittenServiceImpl) PostKitten(dto PostKittenDTO) (int, error) {
	kittenID, err := s.Repo.PostKitten(dto)
	if err != nil {
		return 0, fmt.Errorf("failed to save kitten data: %w", err)
	}

	for _, imageURL := range dto.ImageUrls {
		err := s.Repo.PostKittenImage(kittenID, imageURL)
		if err != nil {
			return 0, fmt.Errorf("failed to save kitten image: %w", err)
		}
	}

	if dto.VideoURL != "" {
		err := s.Repo.PostKittenVideo(kittenID, dto.VideoURL)
		if err != nil {
			return 0, fmt.Errorf("failed to save kitten video: %w", err)
		}
	}

	return kittenID, nil
}
