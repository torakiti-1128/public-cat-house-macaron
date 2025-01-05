package kitten

import (
	"chm-api/internal/storage"
	"fmt"
	"log"
	"mime/multipart"
	"sync"
	"time"
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
	PostKittenVideos(kittenId int, file []multipart.File) ([]string, error)
	// 子猫の情報を更新
	UpdateKittenInfo(dto UpdateKittenDTO) error
	// 子猫の消去
	DeleteKitten(kittenId int) error
	// 子猫の画像だけ消去
	DeleteKittenImages(deleteImages []MediaDTO) error
	// 子猫の動画だけ消去
	DeleteKittenVideos(deleteVideos []MediaDTO) error
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
	sem := make(chan struct{}, 2)
	imageUrls := []string{}
	uploadErrors := []error{}

	// 各画像を並列に処理
	for i, file := range files {
		wg.Add(1)
		go func(i int, file multipart.File) {
			defer wg.Done()
			sem <- struct{}{}
			defer func() { <-sem }()

			// タイムスタンプを利用して写真名をユニークにする
			timestamp := time.Now().UnixNano()
			imagePath := fmt.Sprintf("kittens/kittenTest%d/image_%d.jpg",kittenId, timestamp)

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
func (s *KittenServiceImpl) PostKittenVideos(kittenId int, files []multipart.File) ([]string, error) {
	var wg sync.WaitGroup
	var mu sync.Mutex
	sem := make(chan struct{}, 2)
	videoUrls := []string{}
	uploadErrors := []error{}

	// 各動画を並列に処理
	for i, file := range files {
		wg.Add(1)
		go func(i int, file multipart.File) {
			defer wg.Done()
			sem <- struct{}{}
			defer func() { <-sem }()

			// タイムスタンプを利用して動画名をユニークにする
			timestamp := time.Now().UnixNano()
			videoPath := fmt.Sprintf("kittens/kittenTest%d/video_%d.mp4", kittenId, timestamp)

			uploadedFile, err := s.StorageService.UploadFileToStorage(file, "videos", videoPath)
			if err != nil {
				log.Printf("動画%dのアップロードエラー: %v", i+1, err)
				mu.Lock()
				uploadErrors = append(uploadErrors, err)
				mu.Unlock()
				return
			}

			mu.Lock()
			videoUrls = append(videoUrls, uploadedFile.PublicUrl)
			mu.Unlock()

			err = s.Repo.PostKittenVideo(kittenId, uploadedFile.PublicUrl)
			if err != nil {
				log.Printf("子猫動画のデータベース保存エラー: %v", err)
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
		return nil, fmt.Errorf("動画アップロード中にエラーが発生しました: %v", uploadErrors)
	}

	return videoUrls, nil
}

// 子猫の情報を更新
func (s *KittenServiceImpl) UpdateKittenInfo(dto UpdateKittenDTO) error {
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

// 子猫の写真だけ消去
func (s *KittenServiceImpl) DeleteKittenImages(deleteImages []MediaDTO) error {
	var deleteErrors []error

	for _, image := range deleteImages {
		// DBからフィールド削除
		if err := s.Repo.DeleteKittenImage(image.Id); err != nil {
			deleteErrors = append(deleteErrors, fmt.Errorf("DBから画像の削除に失敗しました (ImageID: %d): %w", image.Id, err))
			continue
		}

		// ストレージから画像削除
		if err := s.StorageService.DeleteFileInStorage("", image.Url); err != nil {
			deleteErrors = append(deleteErrors, fmt.Errorf("ストレージから画像の削除に失敗しました (ImageUrl: %s): %w", image.Url, err))
		}
	}

	if len(deleteErrors) > 0 {
		return fmt.Errorf("写真消去中にエラーが発生しました: %v", deleteErrors)
	}

	return nil
}

// 子猫の動画だけ消去
func (s *KittenServiceImpl) DeleteKittenVideos(deleteVideos []MediaDTO) error {
	var deleteErrors []error

	for _, video := range deleteVideos {
		// DBからフィールド削除
		if err := s.Repo.DeleteKittenVideo(video.Id); err != nil {
			deleteErrors = append(deleteErrors, fmt.Errorf("DBから動画の削除に失敗しました (VideoID: %d): %w", video.Id, err))
			continue
		}

		// ストレージから画像削除
		if err := s.StorageService.DeleteFileInStorage("", video.Url); err != nil {
			deleteErrors = append(deleteErrors, fmt.Errorf("ストレージから動画の削除に失敗しました (VideoUrl: %s): %w", video.Url, err))
		}
	}

	if len(deleteErrors) > 0 {
		return fmt.Errorf("動画消去中にエラーが発生しました: %v", deleteErrors)
	}

	return nil
}