package inquiry

import "chm-api/internal/notification"

// 問い合わせ関連のビジネスロジックインターフェース
type InquiryService interface {
	// 店舗に問い合わせ
	PostBaseInquiry(dto BaseInquiryDTO) error
	// 店舗に見学の問い合わせ
	PostInspectionInquiry(dto InspectionInquiryDTO) error
}

// 問い合わせ関連のビジネスロジック実装
type InquiryServiceImpl struct {
	Repo InquiryRepository
	NotificationService notification.NotificationService
}

// 問い合わせ関連のビジネスロジックコンストラクタ
func NewInquiryService(repo InquiryRepository, notificationService notification.NotificationService) InquiryService {
	return &InquiryServiceImpl{Repo: repo, NotificationService: notificationService}
}

// 店舗に問い合わせ
func (s *InquiryServiceImpl) PostBaseInquiry(dto BaseInquiryDTO) error {
	return nil
}

// 店舗に見学の問い合わせ
func (s *InquiryServiceImpl) PostInspectionInquiry(dto InspectionInquiryDTO) error {
	return nil
}
