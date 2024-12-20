package storage

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
)

// Supabaseの設定
type SupabaseConfig struct {
	SupabaseURL    string
	SupabaseAPIKey string
}

// ストレージのAPIインターフェース
type StorageRepository interface {
	UploadFile(bucket, path, filePath string) (string, error)
	DeleteFile(bucket, path string) error
	DeleteFolder(bucket, folderPath string) error
}

// SupabaseストレージのAPI実装
type SupabaseRepositoryImp struct {
	Config SupabaseConfig
	Client *http.Client
}

// ストレージのAPIコンストラクタ
func NewSupabaseRepository(config SupabaseConfig) StorageRepository {
	return &SupabaseRepositoryImp{
		Config: config,
		Client: &http.Client{},
	}
}

// ファイルをSupabaseストレージにアップロード
func (r *SupabaseRepositoryImp) UploadFile(bucket, path, filePath string) (string, error) {
	fileData, err := os.ReadFile(filePath)
	if err != nil {
		return "", fmt.Errorf("ファイルの読み込みに失敗しました (%s): %w", filePath, err)
	}

	url := fmt.Sprintf("%s/storage/v1/object/%s/%s", r.Config.SupabaseURL, bucket, path)
	req, err := http.NewRequest("POST", url, bytes.NewReader(fileData))
	if err != nil {
		return "", fmt.Errorf("HTTPリクエストの作成に失敗しました: %w", err)
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", r.Config.SupabaseAPIKey))
	req.Header.Set("Content-Type", "application/octet-stream")

	resp, err := r.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("リクエストの送信に失敗しました (%s): %w", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("アップロードに失敗しました (ステータスコード: %d, レスポンス: %s)", resp.StatusCode, string(body))
	}

	publicURL := fmt.Sprintf("%s/storage/v1/object/public/%s/%s", r.Config.SupabaseURL, bucket, path)
	return publicURL, nil
}

// ファイルをSupabaseから削除
func (r *SupabaseRepositoryImp) DeleteFile(bucket, path string) error {
	url := fmt.Sprintf("%s/storage/v1/object/%s/%s", r.Config.SupabaseURL, bucket, path)
	req, err := http.NewRequest("DELETE", url, nil)
	if err != nil {
		return fmt.Errorf("HTTPリクエストの作成に失敗しました: %w", err)
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", r.Config.SupabaseAPIKey))

	resp, err := r.Client.Do(req)
	if err != nil {
		return fmt.Errorf("リクエストの送信に失敗しました (%s): %w", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusNoContent {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("削除に失敗しました (ステータスコード: %d, レスポンス: %s)", resp.StatusCode, string(body))
	}

	return nil
}

// フォルダをSupabaseから削除
func (r *SupabaseRepositoryImp) DeleteFolder(bucket, folderPath string) error {
	url := fmt.Sprintf("%s/storage/v1/object/%s/%s?recursive=true", r.Config.SupabaseURL, bucket, folderPath)
	req, err := http.NewRequest("DELETE", url, nil)
	if err != nil {
		return fmt.Errorf("HTTPリクエストの作成に失敗しました: %w", err)
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", r.Config.SupabaseAPIKey))

	resp, err := r.Client.Do(req)
	if err != nil {
		return fmt.Errorf("リクエストの送信に失敗しました (%s): %w", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusNoContent {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("フォルダ消去に失敗しました (ステータスコード: %d, レスポンス: %s)", resp.StatusCode, string(body))
	}

	return nil
}
