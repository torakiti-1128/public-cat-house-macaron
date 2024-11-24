package storage

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
)

// Config - Supabase の設定を保持
type Config struct {
	SupabaseURL    string
	SupabaseAPIKey string
}

// StorageRepository - ストレージ操作のインターフェース
type StorageRepository interface {
	UploadFile(bucket, path, filePath string) (string, error)
}

// SupabaseRepository - Supabase に対する実装
type SupabaseRepository struct {
	Config Config
	Client *http.Client
}

// NewSupabaseRepository - SupabaseRepository のコンストラクタ
func NewSupabaseRepository(config Config) StorageRepository {
	return &SupabaseRepository{
		Config: config,
		Client: &http.Client{}, // HTTP クライアントを再利用
	}
}

// UploadFile - ファイルを Supabase ストレージにアップロード
func (r *SupabaseRepository) UploadFile(bucket, path, filePath string) (string, error) {
	// ファイルを読み込む
	fileData, err := os.ReadFile(filePath)
	if err != nil {
		return "", fmt.Errorf("failed to read file %s: %w", filePath, err)
	}

	// リクエスト URL を構築
	url := fmt.Sprintf("%s/storage/v1/object/%s/%s", r.Config.SupabaseURL, bucket, path)

	// HTTP リクエストを作成
	req, err := http.NewRequest("POST", url, bytes.NewReader(fileData))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}

	// リクエストヘッダーを設定
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", r.Config.SupabaseAPIKey))
	req.Header.Set("Content-Type", "application/octet-stream")

	// HTTP リクエストを送信
	resp, err := r.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to send request to %s: %w", url, err)
	}
	defer resp.Body.Close()

	// レスポンスのステータスコードを確認
	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("upload failed with status %d: %s", resp.StatusCode, string(body))
	}

	// 公開 URL を生成して返す
	publicURL := fmt.Sprintf("%s/storage/v1/object/public/%s/%s", r.Config.SupabaseURL, bucket, path)
	return publicURL, nil
}
