package breed

import "fmt"

// 猫種関連のビジネスロジックインターフェース
type BreedService interface {
	// 猫種一覧を取得
	GetBreeds() ([]BreedDTO, error)
	// 猫種を追加
	PostBreed(dto PostBreedDTO) (int, error)
	// 猫種の更新
	UpdateBreed(dto UpdateBreedDTO) error
	// 猫種の消去
	DeleteBreed(breedId int) error
}

// 猫種関連のビジネスロジック実装
type BreedServiceImpl struct {
	Repo BreedRepository
}

// 猫種関連のビジネスロジックコンストラクタ
func NewBreedService(repo BreedRepository) BreedService {
	return &BreedServiceImpl{Repo: repo}
}

// 猫種一覧を取得
func (s *BreedServiceImpl) GetBreeds() ([]BreedDTO, error) {
	breeds, err := s.Repo.GetBreeds()
	if err != nil {
		fmt.Printf("猫種一覧の取得に失敗しました: %v\n", err)
		return nil, fmt.Errorf("猫種一覧の取得に失敗しました: %w", err)
	}
	return breeds, nil
}

// 猫種を追加
func (s *BreedServiceImpl) PostBreed(dto PostBreedDTO) (int, error) {
	breedId, err := s.Repo.PostBreed(dto)
	if err != nil {
		fmt.Printf("猫種の追加に失敗しました (BreedName: %s): %v\n", dto.BreedName, err)
		return 0, fmt.Errorf("猫種の追加に失敗しました: %w", err)
	}
	return breedId, nil
}

// 猫種の更新
func (s *BreedServiceImpl) UpdateBreed(dto UpdateBreedDTO) error {
	err := s.Repo.UpdateBreed(dto)
	if err != nil {
		fmt.Printf("猫種の更新に失敗しました (BreedId: %d, BreedName: %s): %v\n", dto.BreedId, dto.BreedName, err)
		return fmt.Errorf("猫種の更新に失敗しました: %w", err)
	}
	return nil
}

// 猫種の消去
func (s *BreedServiceImpl) DeleteBreed(breedId int) error {
	err := s.Repo.DeleteBreed(breedId)
	if err != nil {
		fmt.Printf("猫種の削除に失敗しました (BreedId: %d): %v\n", breedId, err)
		return fmt.Errorf("猫種の削除に失敗しました: %w", err)
	}
	return nil
}
