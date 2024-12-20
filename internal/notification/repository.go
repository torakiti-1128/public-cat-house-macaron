package notification

import (
	"bytes"
	"fmt"
	"net/smtp"
)

// Gmailの設定
type GmailConfig struct {
	SMTPHost string
	SMTPPort string
	Username string
	Password string
}

// 通知関連のAPIインターフェース
type NotificationRepository interface {
	SendMail(to, subject, body string) error
}

// GmailのAPI実装
type GmailRepositoryImpl struct {
	Config GmailConfig
}

// GmailのAPIコンストラクタ
func NewGmailRepository(config GmailConfig) NotificationRepository {
	return &GmailRepositoryImpl{
		Config: config,
	}
}

// 引数の内容をGmailに送信
func (r *GmailRepositoryImpl) SendMail(to, subject, body string) error {
	// SMTPサーバー情報
	auth := smtp.PlainAuth("", r.Config.Username, r.Config.Password, r.Config.SMTPHost)

	// ヘッダーの作成
	header := make(map[string]string)
	header["From"] = r.Config.Username
	header["To"] = to
	header["Subject"] = subject
	header["MIME-Version"] = "1.0"
	header["Content-Type"] = "multipart/mixed; boundary=boundary"

	// メール本文
	var message bytes.Buffer
	for key, value := range header {
		message.WriteString(fmt.Sprintf("%s: %s\r\n", key, value))
	}
	message.WriteString("\r\n--boundary\r\n")
	message.WriteString("Content-Type: text/plain; charset=\"utf-8\"\r\n\r\n")
	message.WriteString(body + "\r\n")
	message.WriteString("--boundary--")

	// メールの送信
	smtpAddr := fmt.Sprintf("%s:%s", r.Config.SMTPHost, r.Config.SMTPPort)
	if err := smtp.SendMail(smtpAddr, auth, r.Config.Username, []string{to}, message.Bytes()); err != nil {
		return fmt.Errorf("メールの送信に失敗しました: %w", err)
	}

	return nil
}