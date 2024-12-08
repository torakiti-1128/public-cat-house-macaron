package kitten

import (
	"chm-api/internal/storage"
	"fmt"
	"log"
	"mime/multipart"
	"sync"
)

// 子猫関連のビジネスロジックインターフェース
type KittenService interface {
	// 子猫一覧を取得
	GetKittens() ([]KittensDTO, error)
	// 子猫詳細を取得
	GetKittenDetail(kittenId int) (KittenDetailDTO, error)
	// 子猫を追加
	PostKitten(dto PostKittenDTO) (int, error)
	// 子猫の写真を追加
	PostKittenImages(kittenId int, files []multipart.File) ([]string, error)
	// 子猫の動画を追加
	PostKittenVideo(kittenId int, file multipart.File) error
	// 子猫の更新
	UpdateKitten(dto UpdateKittenDTO) error
	// 子猫の消去
	DeleteKitten(kittenId int) error
}

// 子猫関連のビジネスロジック実装
type KittenServiceImpl struct {
	Repo           KittenRepository
	StorageService storage.StorageService
}

// 子猫関連のビジネスロジックコンストラクタ
func NewKittenService(repo KittenRepository, storageService storage.StorageService) KittenService {
	return &KittenServiceImpl{Repo: repo, StorageService: storageService}
}

// 子猫一覧を取得
func (s *KittenServiceImpl) GetKittens() ([]KittensDTO, error) {
	kittens, err := s.Repo.GetKittens()
	if err != nil {
		fmt.Printf("子猫の一覧取得に失敗しました: %v\n", err)
		return nil, fmt.Errorf("子猫の一覧取得に失敗しました: %w", err)
	}
	return kittens, nil
}

// 子猫詳細を取得
func (s *KittenServiceImpl) GetKittenDetail(kittenId int) (KittenDetailDTO, error) {
	kittenDetail, err := s.Repo.GetKittenDetail(kittenId)
	if err != nil {
		fmt.Printf("子猫詳細の取得に失敗しました (KittenId: %d): %v\n", kittenId, err)
		return KittenDetailDTO{}, fmt.Errorf("子猫詳細の取得に失敗しました: %w", err)
	}
	return kittenDetail, nil
}

// 子猫を追加
func (s *KittenServiceImpl) PostKitten(dto PostKittenDTO) (int, error) {
	kittenId, err := s.Repo.PostKitten(dto)
	if err != nil {
		fmt.Printf("子猫の追加に失敗しました: %v\n", err)
		return 0, fmt.Errorf("子猫の追加に失敗しました: %w", err)
	}
	return kittenId, nil
}

// 子猫の写真を追加
func (s *KittenServiceImpl) PostKittenImages(kittenId int, files []multipart.File) ([]string, error) {
	var wg sync.WaitGroup
	var mu sync.Mutex
	sem := make(chan struct{}, 2) // 同時実行数を2に制限
	imageUrls := []string{}
	uploadErrors := []error{}

	// 各画像を並列に処理
	for i, file := range files {
		wg.Add(1)
		go func(i int, file multipart.File) {
			defer wg.Done()
			sem <- struct{}{}
			defer func() { <-sem }()

			imagePath := fmt.Sprintf("kittens/kitten%d/image%d.jpg", kittenId, i+1)
			uploadedFile, err := s.StorageService.UploadFileToStorage(file, "images", imagePath)
			if err != nil {
				log.Printf("画像%dのアップロードエラー: %v", i+1, err)
				mu.Lock()
				uploadErrors = append(uploadErrors, err)
				mu.Unlock()
				return
			}

			mu.Lock()
			imageUrls = append(imageUrls, uploadedFile.PublicUrl)
			mu.Unlock()

			err = s.Repo.PostKittenImage(kittenId, uploadedFile.PublicUrl)
			if err != nil {
				log.Printf("子猫画像のデータベース保存エラー: %v", err)
				mu.Lock()
				uploadErrors = append(uploadErrors, err)
				mu.Unlock()
			}
		}(i, file)
	}

	// 並列処理完了待機
	wg.Wait()

	// エラーが存在する場合はまとめて返す
	if len(uploadErrors) > 0 {
		return nil, fmt.Errorf("写真アップロード中にエラーが発生しました: %v", uploadErrors)
	}

	return imageUrls, nil
}

// 子猫の動画を追加
func (s *KittenServiceImpl) PostKittenVideo(kittenId int, file multipart.File) error {
	videoPath := fmt.Sprintf("kittens/kitten%d/video.mp4", kittenId)
	uploadedVideo, err := s.StorageService.UploadFileToStorage(file, "videos", videoPath)
	if err != nil {
		log.Printf("動画のアップロードエラー: %v", err)
		return err
	}

	if err := s.Repo.PostKittenVideo(kittenId, uploadedVideo.PublicUrl); err != nil {
		log.Printf("子猫の動画のデータベース保存エラー: %v", err)
		return fmt.Errorf("子猫の動画の保存に失敗しました: %w", err)
	}
	return nil
}

// 子猫の更新
func (s *KittenServiceImpl) UpdateKitten(dto UpdateKittenDTO) error {
	if err := s.Repo.UpdateKitten(dto); err != nil {
		fmt.Printf("子猫の更新に失敗しました: %v\n", err)
		return fmt.Errorf("子猫の更新に失敗しました: %w", err)
	}
	return nil
}

// 子猫の消去
func (s *KittenServiceImpl) DeleteKitten(kittenId int) error {
	if err := s.Repo.DeleteKitten(kittenId); err != nil {
		fmt.Printf("子猫の消去にお失敗しました (KittenId: %d): %v\n", kittenId, err)
		return fmt.Errorf("子猫の消去に失敗しました: %w", err)
	}
	return nil
}
