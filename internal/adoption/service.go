package adoption

import (
	"chm-api/internal/storage"
	"fmt"
	"log"
	"mime/multipart"
)

// 里親募集中猫関連のビジネスロジックインターフェース
type AdoptionService interface {
	// 里親募集中猫一覧を取得
	GetAdoptionCats() ([]AdoptionCatsDTO, error)
	// 里親募集中猫詳細を取得
	GetAdoptionCatDetail(adoptionCatId int) (AdoptionCatDetailDTO, error)
	// 里親募集中猫を追加
	PostAdoptionCat(dto PostAdoptionCatDTO) (int, error)
	// 里親募集中猫の写真を更新
	UpdateAdoptionCatImage(adoptionCatId int, file multipart.File) error
	// 里親募集中猫を更新
	UpdateAdoptionCat(dto UpdateAdoptionCatDTO) error
	// 里親募集中猫を削除
	DeleteAdoptionCat(adoptionCatId int) error
}

// 里親募集中猫関連のビジネスロジック実装
type AdoptionServiceImpl struct {
	Repo           AdoptionRepository
	StorageService storage.StorageService
}

// 里親募集中猫関連のビジネスロジックコンストラクタ
func NewAdoptionService(repo AdoptionRepository, storageService storage.StorageService) AdoptionService {
	return &AdoptionServiceImpl{Repo: repo, StorageService: storageService}
}

// 里親募集中猫一覧を取得
func (s *AdoptionServiceImpl) GetAdoptionCats() ([]AdoptionCatsDTO, error) {
	adoptionCats, err := s.Repo.GetAdoptionCats()
	if err != nil {
		fmt.Printf("里親募集中猫一覧の取得に失敗しました: %v\n", err)
		return nil, fmt.Errorf("里親募集中猫の一覧取得に失敗しました: %w", err)
	}
	return adoptionCats, nil
}

// 里親募集中猫詳細を取得
func (s *AdoptionServiceImpl) GetAdoptionCatDetail(adoptionCatId int) (AdoptionCatDetailDTO, error) {
	adoptionCatDetail, err := s.Repo.GetAdoptionCatDetail(adoptionCatId)
	if err != nil {
		fmt.Printf("里親募集中猫詳細の取得に失敗しました: %v\n", err)
		return AdoptionCatDetailDTO{}, fmt.Errorf("里親募集中猫詳細の取得に失敗しました: %w", err)
	}
	return adoptionCatDetail, nil
}

// 里親募集中猫を追加
func (s *AdoptionServiceImpl) PostAdoptionCat(dto PostAdoptionCatDTO) (int, error) {
	adoptionCatId, err := s.Repo.PostAdoptionCat(dto)
	if err != nil {
		fmt.Printf("里親募集中猫の追加に失敗しました: %v\n", err)
		return 0, fmt.Errorf("里親募集中猫の追加に失敗しました: %w", err)
	}
	return adoptionCatId, nil
}

// 里親募集中猫の写真を更新
func (s *AdoptionServiceImpl) UpdateAdoptionCatImage(adoptionCatId int, file multipart.File) error {
	imagePath := fmt.Sprintf("adoption-cats/cat%d.jpg", adoptionCatId)
	uploadedFile, err := s.StorageService.UploadFileToStorage(file, "images", imagePath)
	if err != nil {
		log.Printf("画像のアップロードエラー: %v", err)
		return err
	}
	if err := s.Repo.UpdateAdoptionCatImage(adoptionCatId, uploadedFile.PublicUrl); err != nil {
		fmt.Printf("里親募集中猫の写真の更新に失敗しました (adoptionCatId: %d, ImageUrl: %s): %v\n", adoptionCatId, uploadedFile.PublicUrl, err)
		return fmt.Errorf("里親募集中猫の写真の更新に失敗しました: %w", err)
	}
	return nil
}

// 里親募集中猫情報を更新
func (s *AdoptionServiceImpl) UpdateAdoptionCat(dto UpdateAdoptionCatDTO) error {
	err := s.Repo.UpdateAdoptionCat(dto)
	if err != nil {
		return fmt.Errorf("里親募集中猫情報の更新に失敗しました: %w", err)
	}
	return nil
}

// 里親募集中猫を削除
func (s *AdoptionServiceImpl) DeleteAdoptionCat(adoptionCatId int) error {
	err := s.Repo.DeleteAdoptionCat(adoptionCatId)
	if err != nil {
		return fmt.Errorf("里親募集中猫情報の削除に失敗しました: %w", err)
	}
	return nil
}