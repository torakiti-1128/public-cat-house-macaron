package line

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	LineAPI         string
	LineNotifyToken string
}

// Lineの設定
func NewConfig(path string) (Config, error) {
	var config Config

	// .envファイルをロード
	err := godotenv.Load(path)
	if err != nil {
		return config, fmt.Errorf("環境変数の読み込みに失敗しました: %v", err)
	}

	// 環境変数から値を取得
	config.LineAPI= os.Getenv("LINE_API")
	config.LineNotifyToken = os.Getenv("LINE_NOTIFY_TOKEN")

	return config, nil
}