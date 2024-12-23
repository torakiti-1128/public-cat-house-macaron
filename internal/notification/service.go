package notification

import "fmt"

// 通知関連のビジネスロジックインターフェース
type NotificationService interface {
	// 問い合わせをメールに通知
	NotifyToMail() error
	// 問い合わせをチャットに通知
	NotifyToChat() error
}

// 通知関連のビジネスロジック実装
type NotificationServiceImpl struct {
	MailRepo MailNotificationRepository
	ChatRepo ChatNotificationRepository
}

// 通知関連のビジネスロジックコンストラクタ
func NewNotificationService(mailRepo MailNotificationRepository, chatRepo ChatNotificationRepository) NotificationService {
	return &NotificationServiceImpl{MailRepo: mailRepo, ChatRepo: chatRepo}
}

// 問い合わせをメールに通知
func (s *NotificationServiceImpl) NotifyToMail() error {
	err := s.MailRepo.SendMail("Test", "auto.inquiry.1128@gmail.com", "Test")
	if err != nil {
		return fmt.Errorf("メールの送信に失敗しました: %w", err)
	}
	return nil
}

// 問い合わせをチャットに通知
func (s *NotificationServiceImpl) NotifyToChat() error {
	err := s.ChatRepo.SendChat("Test", "Test")
	if err != nil {
		return fmt.Errorf("チャットの送信に失敗しました: %w", err)
	}
	return nil
}
