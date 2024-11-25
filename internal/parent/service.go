package parent

import "fmt"

// 親猫関連のビジネスロジックインターフェース
type ParentService interface {
	GetParentCats() ([]ParentCatsDTO, error)
	GetParentCatDetail(parentCatId int) (ParentCatDetailDTO, error)
}

// 親猫関連のビジネスロジック実装
type ParentServiceImpl struct {
	Repo ParentRepository
}

// 親猫関連のビジネスロジックコンストラクタ
func NewParenttService(repo ParentRepository) ParentService {
	return &ParentServiceImpl{Repo: repo}
}

// 親猫詳細を取得
func (s *ParentServiceImpl) GetParentCats() ([]ParentCatsDTO, error) {
	parentCats, err := s.Repo.GetParentCats()
	if err != nil {
		fmt.Printf("Error fetching parent cats from repository: %v\n", err)
		return nil, err
	}
	return parentCats, nil
}

// 親猫一覧を取得
func (s *ParentServiceImpl) GetParentCatDetail(parentCatId int) (ParentCatDetailDTO, error) {
	parentCatDetail, err := s.Repo.GetParentCatDetail(parentCatId)
	if err != nil {
		fmt.Printf("Error fetching parent cat detail from repository: %v\n", err)
		return ParentCatDetailDTO{}, err
	}
	return parentCatDetail, nil
}
