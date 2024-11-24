package storage

import "fmt"

type StorageService struct {
	Repo StorageRepository
}

func NewStorageService(repo StorageRepository) *StorageService {
	return &StorageService{Repo: repo}
}

// ファイルをアップロードするロジック
func (s *StorageService) UploadFile(dto UploadFileDTO) (UploadedFileDTO, error) {
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
