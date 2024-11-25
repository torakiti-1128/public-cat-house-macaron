package storage

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
)

// Supabaseの設定
type Config struct {
	SupabaseURL    string
	SupabaseAPIKey string
}

// ストレージのAPIインターフェース
type StorageRepository interface {
	UploadFile(bucket, path, filePath string) (string, error)
}

// ストレージのAPI実装
type SupabaseRepository struct {
	Config Config
	Client *http.Client
}

// ストレージのAPIコンストラクタ
func NewSupabaseRepository(config Config) StorageRepository {
	return &SupabaseRepository{
		Config: config,
		Client: &http.Client{},
	}
}

// ファイルをSupabaseストレージにアップロード
func (r *SupabaseRepository) UploadFile(bucket, path, filePath string) (string, error) {
	// ファイルを読み込む
	fileData, err := os.ReadFile(filePath)
	if err != nil {
		return "", fmt.Errorf("ファイルの読み込みに失敗しました (%s): %w", filePath, err)
	}

	// リクエストURLを構築
	url := fmt.Sprintf("%s/storage/v1/object/%s/%s", r.Config.SupabaseURL, bucket, path)

	// HTTPリクエストを作成
	req, err := http.NewRequest("POST", url, bytes.NewReader(fileData))
	if err != nil {
		return "", fmt.Errorf("HTTPリクエストの作成に失敗しました: %w", err)
	}

	// リクエストヘッダーを設定
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", r.Config.SupabaseAPIKey))
	req.Header.Set("Content-Type", "application/octet-stream")

	// HTTPリクエストを送信
	resp, err := r.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("リクエストの送信に失敗しました (%s): %w", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("アップロードに失敗しました (ステータスコード: %d, レスポンス: %s)", resp.StatusCode, string(body))
	}

	// 表示するURLを生成
	publicURL := fmt.Sprintf("%s/storage/v1/object/public/%s/%s", r.Config.SupabaseURL, bucket, path)
	return publicURL, nil
}
