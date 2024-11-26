package storage

import (
	"chm-api/internal/utils"
	"fmt"
	"mime/multipart"
)

// ストレージのビジネスロジックインターフェース
type StorageService interface {
	// ファイルをストレージにアップロード
	UploadFileToStorage(file multipart.File, bucket string, destPath string) (UploadedFileDTO, error)
}

// ストレージのビジネスロジック実装
type StorageServiceImpl struct {
	Repo StorageRepository
}

// ストレージのビジネスロジックコンストラクタ
func NewStorageService(repo StorageRepository) StorageService {
	return &StorageServiceImpl{Repo: repo}
}

// ファイルをストレージにアップロード
func (s *StorageServiceImpl) UploadFileToStorage(file multipart.File, bucket, destPath string) (UploadedFileDTO, error) {
	tempPath, err := utils.SaveTemporaryFile(file)
	if err != nil {
		return UploadedFileDTO{}, fmt.Errorf("一時ファイルの保存に失敗しました: %w", err)
	}
	defer utils.DeleteTemporaryFile(tempPath)

	publicURL, err := s.Repo.UploadFile(bucket, destPath, tempPath)
	if err != nil {
		return UploadedFileDTO{}, fmt.Errorf("ファイルのアップロードに失敗しました: %w", err)
	}

	return UploadedFileDTO{
		PublicUrl: publicURL,
		Bucket:    bucket,
		Path:      destPath,
	}, nil
}
