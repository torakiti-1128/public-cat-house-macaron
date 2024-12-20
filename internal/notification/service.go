package notification

// 通知関連のビジネスロジックインターフェース
type NotificationService interface {
	
}

// 通知関連のビジネスロジック実装
type NotificationServiceImpl struct {
	Repo NotificationRepository
}

// 通知関連のビジネスロジックコンストラクタ 
func NewNotificationService(repo NotificationRepository) NotificationService {
	return &NotificationServiceImpl{Repo: repo}
}
