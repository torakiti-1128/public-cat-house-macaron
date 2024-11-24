package storage

import "fmt"

// StorageService - ストレージサービスのインターフェース
type StorageService interface {
	UploadFile(dto UploadFileDTO) (UploadedFileDTO, error)
}

// StorageServiceImpl - ストレージサービスの実装
type StorageServiceImpl struct {
	Repo StorageRepository
}

// NewStorageService - ストレージサービスのコンストラクタ
func NewStorageService(repo StorageRepository) StorageService {
	return &StorageServiceImpl{Repo: repo}
}

// UploadFile - ファイルアップロードの実装
func (s *StorageServiceImpl) UploadFile(dto UploadFileDTO) (UploadedFileDTO, error) {
	publicURL, err := s.Repo.UploadFile(dto.Bucket, dto.Path, dto.FilePath)
	if err != nil {
		return UploadedFileDTO{}, fmt.Errorf("failed to upload file: %w", err)
	}

	return UploadedFileDTO{
		PublicURL: publicURL,
		Bucket:    dto.Bucket,
		Path:      dto.Path,
	}, nil
}
