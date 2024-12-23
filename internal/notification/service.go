package notification

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
	s.MailRepo.SendMail("", "", "")
	return nil
}

// 問い合わせをチャットに通知
func (s *NotificationServiceImpl) NotifyToChat() error {
	s.ChatRepo.SendChat("", "")
	return nil
}
