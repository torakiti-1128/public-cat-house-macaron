package kitten

import "fmt"

// KittenService インターフェース
type KittenService interface {
	GetKittens() ([]KittensDTO, error)
	GetKittenDetail(kittenID int) (KittenDetailDTO, error)
}

// KittenServiceImpl 実装
type KittenServiceImpl struct {
	Repo KittenRepository
}

func NewKittenService(repo KittenRepository) KittenService {
	return &KittenServiceImpl{Repo: repo}
}

func (s *KittenServiceImpl) GetKittens() ([]KittensDTO, error) {
	kittens, err := s.Repo.GetKittens()
	if err != nil {
		fmt.Printf("Error fetching kittens from repository: %v\n", err)
		return nil, err
	}
	return kittens, nil
}

func (s *KittenServiceImpl) GetKittenDetail(kittenId int) (KittenDetailDTO, error) {
	kittenDetail, err := s.Repo.GetKittenDetail(kittenId)
	if err != nil {
		fmt.Printf("Error fetching kitten detail from repository: %v\n", err)
		return KittenDetailDTO{}, err
	}
	return kittenDetail, nil
}
