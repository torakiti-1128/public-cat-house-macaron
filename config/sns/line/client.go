package line

import (
	"os"
)

// Lineの設定
type Config struct {
	LineApiUrl         string
	LineUserId         string
	ChannelAccessToken string
}

// Lineの設定
func NewConfig(path string) (Config, error) {
	var config Config

	// 環境変数から値を取得
	config.LineApiUrl = os.Getenv("LINE_API_URL")
	config.LineUserId = os.Getenv("LINE_USER_ID")
	config.ChannelAccessToken = os.Getenv("CHANNEL_ACCESS_TOKEN")

	return config, nil
}
