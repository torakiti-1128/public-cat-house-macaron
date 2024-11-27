package parent

import (
	"chm-api/internal/storage"
	"fmt"
	"log"
	"mime/multipart"
)

// 親猫関連のビジネスロジックインターフェース
type ParentService interface {
	// 親猫一覧を取得
	GetParentCats() ([]ParentCatsDTO, error)
	// 親猫詳細を取得
	GetParentCatDetail(parentCatId int) (ParentCatDetailDTO, error)
	// 親猫を追加
	PostParentCat(dto PostParentCatDTO) (int, error)
	// 親猫の写真を更新
	UpdateParentCatImage(parentCatId int, file multipart.File) error
	// 親猫を更新
	UpdateParentCat(dto UpdateParentCatDTO) error
	// 親猫を削除
	DeleteParentCat(parentCatId int) error
}

// 親猫関連のビジネスロジック実装
type ParentServiceImpl struct {
	Repo           ParentRepository
	StorageService storage.StorageService
}

// 親猫関連のビジネスロジックコンストラクタ
func NewParenttService(repo ParentRepository, storageService storage.StorageService) ParentService {
	return &ParentServiceImpl{Repo: repo, StorageService: storageService}
}

// 親猫一覧を取得
func (s *ParentServiceImpl) GetParentCats() ([]ParentCatsDTO, error) {
	parentCats, err := s.Repo.GetParentCats()
	if err != nil {
		fmt.Printf("親猫一覧の取得に失敗しました: %v\n", err)
		return nil, fmt.Errorf("親猫の一覧取得に失敗しました: %w", err)
	}
	return parentCats, nil
}

// 親猫詳細を取得
func (s *ParentServiceImpl) GetParentCatDetail(parentCatId int) (ParentCatDetailDTO, error) {
	parentCatDetail, err := s.Repo.GetParentCatDetail(parentCatId)
	if err != nil {
		fmt.Printf("親猫詳細の取得に失敗しました: %v\n", err)
		return ParentCatDetailDTO{}, fmt.Errorf("親猫詳細の取得に失敗しました: %w", err)
	}
	return parentCatDetail, nil
}

// 親猫を追加
func (s *ParentServiceImpl) PostParentCat(dto PostParentCatDTO) (int, error) {
	parentCatId, err := s.Repo.PostParentCat(dto)
	if err != nil {
		fmt.Printf("親猫の追加に失敗しました: %v\n", err)
		return 0, fmt.Errorf("親猫の追加に失敗しました: %w", err)
	}
	return parentCatId, nil
}

// 親猫の写真を更新
func (s *ParentServiceImpl) UpdateParentCatImage(parentCatId int, file multipart.File) error {
	imagePath := fmt.Sprintf("parent-cats/cat%d.jpg", parentCatId)
	uploadedFile, err := s.StorageService.UploadFileToStorage(file, "images", imagePath)
	if err != nil {
		log.Printf("画像のアップロードエラー: %v", err)
		return err
	}
	if err := s.Repo.UpdateParentCatImage(parentCatId, uploadedFile.PublicUrl); err != nil {
		fmt.Printf("親猫の写真の更新に失敗しました (parentCatid: %d, ImageUrl: %s): %v\n", parentCatId, uploadedFile.PublicUrl, err)
		return fmt.Errorf("親猫の写真の更新に失敗しました: %w", err)
	}
	return nil
}

// 親猫情報を更新
func (s *ParentServiceImpl) UpdateParentCat(dto UpdateParentCatDTO) error {
	err := s.Repo.UpdateParentCat(dto)
	if err != nil {
		return fmt.Errorf("親猫情報の更新に失敗しました: %w", err)
	}
	return nil
}

// 親猫を削除
func (s *ParentServiceImpl) DeleteParentCat(parentCatId int) error {
	err := s.Repo.DeleteParentCat(parentCatId)
	if err != nil {
		return fmt.Errorf("親猫情報の削除に失敗しました: %w", err)
	}
	return nil
}
