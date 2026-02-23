package gmail

import (
	"os"
)

type Config struct {
	SMTPHost string
	SMTPPort string
	Username string
	Password string
}

// Gmailの設定
func NewConfig(path string) (Config, error) {
	var config Config

	// // .envファイルをロード
	// err := godotenv.Load(path)
	// if err != nil {
	// 	return config, fmt.Errorf("環境変数の読み込みに失敗しました: %v", err)
	// }

	// 環境変数から値を取得
	config.SMTPHost = os.Getenv("MAIL_SMTP_HOST")
	config.SMTPPort = os.Getenv("MAIL_SMTP_PORT")
	config.Username = os.Getenv("MAIL_USERNAME")
	config.Password = os.Getenv("MAIL_PASSWORD")

	return config, nil
}