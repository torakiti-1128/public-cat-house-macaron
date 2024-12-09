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
	// Storageのファイルを消去
	UpdateFileInStorage(file multipart.File, bucket string, oldPath string, newPath string) (UploadedFileDTO, error)
	// Storageのファイルを更新
	DeleteFileInStorage(bucket string, filePath string) error
	// Storageのフォルダを消去
	DeleteFolderFromStorage(bucket string, folderPath string) error
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

// Storageのファイルを更新
func (s *StorageServiceImpl) UpdateFileInStorage(file multipart.File, bucket string, oldPath string, newPath string) (UploadedFileDTO, error) {
	err := s.Repo.DeleteFile(bucket, oldPath)
	if err != nil {
		return UploadedFileDTO{}, fmt.Errorf("古いファイルの削除に失敗しました: %w", err)
	}

	return s.UploadFileToStorage(file, bucket, newPath)
}

// Storageのファイルを消去
func (s *StorageServiceImpl) DeleteFileInStorage(bucket string, filePath string) error {
	err := s.Repo.DeleteFile(bucket, filePath)
	if err != nil {
		return fmt.Errorf("ファイルの消去に失敗しました (%s): %w", filePath, err)
	}
	return nil
}

// Storageのフォルダを消去
func (s *StorageServiceImpl) DeleteFolderFromStorage(bucket string, folderPath string) error {
	err := s.Repo.DeleteFolder(bucket, folderPath)
	if err != nil {
		return fmt.Errorf("フォルダの消去に失敗しました (%s): %w", folderPath, err)
	}
	return nil
}
