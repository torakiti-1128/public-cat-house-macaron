package parent

import "fmt"

// インターフェース
type ParentService interface {
	GetParentCats() ([]ParentCatsDTO, error)
	GetParentCatDetail(parentCatId int) (ParentCatDetailDTO, error)
}

// 実装
type ParentServiceImpl struct {
	Repo ParentRepository
}

// コンストラクタ
func NewParenttService(repo ParentRepository) ParentService {
	return &ParentServiceImpl{Repo: repo}
}

// DBから親猫詳細を取得
func (s *ParentServiceImpl) GetParentCats() ([]ParentCatsDTO, error) {
	parentCats, err := s.Repo.GetParentCats()
	if err != nil {
		fmt.Printf("Error fetching parent cats from repository: %v\n", err)
		return nil, err
	}
	return parentCats, nil
}

// DBから親猫一覧を取得
func (s *ParentServiceImpl) GetParentCatDetail(parentCatId int) (ParentCatDetailDTO, error) {
	parentCatDetail, err := s.Repo.GetParentCatDetail(parentCatId)
	if err != nil {
		fmt.Printf("Error fetching parent cat detail from repository: %v\n", err)
		return ParentCatDetailDTO{}, err
	}
	return parentCatDetail, nil
}
