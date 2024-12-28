package supabase

import (
	"os"
)

type Config struct {
	SupabaseURL    string
	SupabaseAPIKey string
}

// Supabaseの設定
func NewConfig(path string) (Config, error) {
	var config Config

	// // .envファイルをロード
	// err := godotenv.Load(path)
	// if err != nil {
	// 	return config, fmt.Errorf("環境変数の読み込みに失敗しました: %v", err)
	// }

	// 環境変数から値を取得
	config.SupabaseURL= os.Getenv("SUPABASE_URL")
	config.SupabaseAPIKey = os.Getenv("SUPABASE_API_KEY")

	return config, nil
}