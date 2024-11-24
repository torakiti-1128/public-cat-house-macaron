package kitten

import "fmt"

// インターフェース
type KittenService interface {
	GetKittens() ([]KittensDTO, error)
	GetKittenDetail(kittenId int) (KittenDetailDTO, error)
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
