package parent

import (
	"chm-api/internal/storage"
	"fmt"
	"log"
	"mime/multipart"
	"sync"
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
	PostParentCatImage(parentCatId int, file multipart.File) error
	// 親猫を更新
	UpdateParentCat(dto UpdateParentCatDTO, ile multipart.File) error
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

// 親猫の写真を追加
func (s *ParentServiceImpl) PostParentCatImage(parentCatId int, file multipart.File) error {
	imagePath := fmt.Sprintf("parent-cats/cat%d.jpg", parentCatId)
	uploadedFile, err := s.StorageService.UploadFileToStorage(file, "images", imagePath)
	if err != nil {
		log.Printf("画像のアップロードエラー: %v", err)
		return err
	}
	if err := s.Repo.UpdateParentCatImage(parentCatId, uploadedFile.PublicUrl); err != nil {
		fmt.Printf("親猫の写真の追加に失敗しました (parentCatid: %d, ImageUrl: %s): %v\n", parentCatId, uploadedFile.PublicUrl, err)
		return fmt.Errorf("親猫の写真の追加に失敗しました: %w", err)
	}
	return nil
}

// 親猫情報を更新
func (s *ParentServiceImpl) UpdateParentCat(dto UpdateParentCatDTO, file multipart.File) error {
	var wg sync.WaitGroup
	errChan := make(chan error, 2)
	imagePath := fmt.Sprintf("parent-cats/cat%d.jpg", dto.ParentCatId)

	wg.Add(1)
	go func() {
		defer wg.Done()
		if err := s.Repo.UpdateParentCat(dto); err != nil {
			errChan <- fmt.Errorf("親猫情報の更新に失敗しました: %w", err)
		}
	}()

	// ファイルが含まれる場合
	if file != nil {
		wg.Add(1)
		go func() {
			defer wg.Done()
			uploadedFile, err := s.StorageService.UpdateFileInStorage(file, "images", imagePath, imagePath)
			if err != nil {
				errChan <- fmt.Errorf("storageへの親猫の写真の更新に失敗しました: %w", err)
				// ストレージの更新ができない場合は処理を中断
				return
			}
			if err := s.Repo.UpdateParentCatImage(dto.ParentCatId, uploadedFile.PublicUrl); err != nil {
				errChan <- fmt.Errorf("dbへの親猫の写真の更新に失敗しました (parentCatid: %d, ImageUrl: %s): %v", dto.ParentCatId, uploadedFile.PublicUrl, err)
			}
		}()
	}

	wg.Wait()
	close(errChan)

	for err := range errChan {
		return err
	}

	return nil
}

// 親猫情報を消去
func (s *ParentServiceImpl) DeleteParentCat(parentCatId int) error {
	var wg sync.WaitGroup
	errChan := make(chan error, 2)

	imagePath := fmt.Sprintf("parent-cats/cat%d.jpg", parentCatId)

	// DBからフィールド削除
	wg.Add(1)
	go func() {
		defer wg.Done()
		if err := s.Repo.DeleteParentCat(parentCatId); err != nil {
			errChan <- fmt.Errorf("親猫情報の削除に失敗しました: %w", err)
		}
	}()

	// ストレージから画像削除
	wg.Add(1)
	go func() {
		defer wg.Done()
		if err := s.StorageService.DeleteFileInStorage("images", imagePath); err != nil {
			errChan <- fmt.Errorf("画像の削除に失敗しました: %w", err)
		}
	}()

	wg.Wait()
	close(errChan)

	for err := range errChan {
		return err
	}

	return nil
}
