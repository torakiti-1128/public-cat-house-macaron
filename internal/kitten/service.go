package kitten

import "fmt"

// インターフェース
type KittenService interface {
	GetKittens() ([]KittensDTO, error)
	GetKittenDetail(kittenId int) (KittenDetailDTO, error)
	PostKitten(dto PostKittenDTO) (int, error)
	PostKittenImage(kittenID int, imageUrl string) error
	PostKittenVideo(kittenID int, videoUrl string) error
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

// 子猫情報を保存
func (s *KittenServiceImpl) PostKitten(dto PostKittenDTO) (int, error) {
	// 子猫情報をリポジトリ経由で保存し、新しい KittenID を取得
	kittenID, err := s.Repo.PostKitten(dto)
	if err != nil {
		return 0, fmt.Errorf("failed to save kitten data: %w", err)
	}
	return kittenID, nil
}

// 子猫の画像を保存
func (s *KittenServiceImpl) PostKittenImage(kittenID int, imageUrl string) error {
	return s.Repo.PostKittenImage(kittenID, imageUrl)
}

// 子猫の動画を保存
func (s *KittenServiceImpl) PostKittenVideo(kittenID int, videoUrl string) error {
	return s.Repo.PostKittenVideo(kittenID, videoUrl)
}
