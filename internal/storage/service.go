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
	// 写真を更新する
	UpdateFileInStorage(file multipart.File, bucket string, oldPath, newPath string) (UploadedFileDTO, error)
	// フォルダごと写真を消去する
	DeleteFolderFromStorage(bucket, folderPath string) error
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

// Supabaseの写真を更新する
func (s *StorageServiceImpl) UpdateFileInStorage(file multipart.File, bucket, oldPath, newPath string) (UploadedFileDTO, error) {
	err := s.Repo.DeleteFile(bucket, oldPath)
	if err != nil {
		return UploadedFileDTO{}, fmt.Errorf("古いファイルの削除に失敗しました: %w", err)
	}

	return s.UploadFileToStorage(file, bucket, newPath)
}

// Supabaseのフォルダを消去する
func (s *StorageServiceImpl) DeleteFolderFromStorage(bucket, folderPath string) error {
	err := s.Repo.DeleteFolder(bucket, folderPath)
	if err != nil {
		return fmt.Errorf("フォルダの消去に失敗しました (%s): %w", folderPath, err)
	}
	return nil
}
