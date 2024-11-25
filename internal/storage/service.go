package storage

import (
	"chm-api/internal/utils"
	"fmt"
	"mime/multipart"
)

// ストレージのビジネスロジックインターフェース
type StorageService interface {
	UploadFile(dto UploadFileDTO) (UploadedFileDTO, error)
	SaveFileWithTemp(file multipart.File, bucket string, destPath string) (UploadedFileDTO, error)
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
func (s *StorageServiceImpl) UploadFile(dto UploadFileDTO) (UploadedFileDTO, error) {
	publicURL, err := s.Repo.UploadFile(dto.Bucket, dto.Path, dto.FilePath)
	if err != nil {
		return UploadedFileDTO{}, fmt.Errorf("failed to upload file: %w", err)
	}

	return UploadedFileDTO{
		PublicUrl: publicURL,
		Bucket:    dto.Bucket,
		Path:      dto.Path,
	}, nil
}

func (s *StorageServiceImpl) SaveFileWithTemp(file multipart.File, bucket, destPath string) (UploadedFileDTO, error) {
	tempPath, err := utils.SaveTemporaryFile(file)
	if err != nil {
		return UploadedFileDTO{}, fmt.Errorf("failed to save temporary file: %w", err)
	}
	defer utils.DeleteTemporaryFile(tempPath)

	uploadedFile, err := s.UploadFile(UploadFileDTO{
		Bucket:   bucket,
		Path:     destPath,
		FilePath: tempPath,
	})
	if err != nil {
		return UploadedFileDTO{}, fmt.Errorf("failed to upload file: %w", err)
	}

	return uploadedFile, nil
}
