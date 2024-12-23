package inquiry

import (
	"chm-api/internal/notification"
	"fmt"
)

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
	err := s.NotificationService.NotifyToMail()
	if err != nil {
		fmt.Printf("メールの送信に失敗しました: %v\n", err)
		return fmt.Errorf("メールの送信に失敗しました: %w", err)
	}
	err = s.NotificationService.NotifyToChat()
	if err != nil {
		fmt.Printf("問い合わせに失敗しました: %v\n", err)
		return fmt.Errorf("問い合わせに失敗しました: %w", err)
	}
	return nil
}

// 店舗に見学の問い合わせ
func (s *InquiryServiceImpl) PostInspectionInquiry(dto InspectionInquiryDTO) error {
	err := s.NotificationService.NotifyToMail()
	if err != nil {
		fmt.Printf("メールの送信に失敗しました: %v\n", err)
		return fmt.Errorf("メールの送信に失敗しました: %w", err)
	}
	err = s.NotificationService.NotifyToChat()
	if err != nil {
		fmt.Printf("チャットの送信に失敗しました: %v\n", err)
		return fmt.Errorf("チャットの送信に失敗しました: %w", err)
	}
	return nil
}
