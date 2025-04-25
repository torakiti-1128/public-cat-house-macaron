package notification

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/smtp"
)

// Gmailの設定
type GmailConfig struct {
	SMTPHost string
	SMTPPort string
	Username string
	Password string
}

// Lineの設定
type LineConfig struct {
	LineApiUrl         string
	LineUserId         string
	ChannelAccessToken string
}

// メール関連のAPIインターフェース
type MailNotificationRepository interface {
	SendMail(to, subject, body string) error
}

// チャット関連のAPIインターフェース
type ChatNotificationRepository interface {
	SendChat(message string) error
}

// GmailのAPI実装
type GmailRepositoryImpl struct {
	Config GmailConfig
}

// LineのAPI実装
type LineRepositoryImpl struct {
	Config LineConfig
}

// GmailのAPIコンストラクタ
func NewGmailRepository(config GmailConfig) MailNotificationRepository {
	return &GmailRepositoryImpl{
		Config: config,
	}
}

// GmailのAPIコンストラクタ
func NewLineRepository(config LineConfig) ChatNotificationRepository {
	return &LineRepositoryImpl{
		Config: config,
	}
}

// 問い合わせをGmailに送信
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

// 問い合わせをLineに送信（Message API版）
func (r *LineRepositoryImpl) SendChat(message string) error {
	payload := LineMessage{
		To: r.Config.LineUserId,
		Messages: []TextMessage{
			{Type: "text", Text: message},
		},
	}

	jsonBody, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("JSON変換失敗: %w", err)
	}

	req, err := http.NewRequest("POST", r.Config.LineApiUrl, bytes.NewBuffer(jsonBody))
	if err != nil {
		return fmt.Errorf("リクエスト作成失敗: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+r.Config.ChannelAccessToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("送信中にエラー発生: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("送信失敗: ステータスコード %d, レスポンス: %s", resp.StatusCode, string(body))
	}

	return nil
}
