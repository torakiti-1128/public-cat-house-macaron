package inquiry

import (
	"chm-api/internal/notification"
	"chm-api/internal/utils"
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
	MessageFormatter utils.MessageFormatter
}

// 問い合わせ関連のビジネスロジックコンストラクタ
func NewInquiryService(repo InquiryRepository, notificationService notification.NotificationService, messageFormatter utils.MessageFormatter) InquiryService {
	return &InquiryServiceImpl{Repo: repo, NotificationService: notificationService, MessageFormatter: messageFormatter}
}

// 店舗に問い合わせ
func (s *InquiryServiceImpl) PostBaseInquiry(dto BaseInquiryDTO) error {
	data := map[string]string{
		"お名前":        fmt.Sprintf("%s %s", dto.FirstName, dto.LastName),
		"メールアドレス": dto.Email,
		"電話番号":      dto.PhoneNumber,
		"タイトル":      dto.Title,
		"メッセージ":    dto.Message,
	}

	// 送信内容を作成
	message := s.MessageFormatter.Format(data)

	// ToDo：サービスが終了していため、GCPを利用する
	// err := s.NotificationService.NotifyToMail("", "", "")
	// if err != nil {
	// 	fmt.Printf("メールの送信に失敗しました: %v\n", err)
	// 	return fmt.Errorf("メールの送信に失敗しました: %w", err)
	// }

	err := s.NotificationService.NotifyToChat(message)
	if err != nil {
		fmt.Printf("問い合わせに失敗しました: %v\n", err)
		return fmt.Errorf("問い合わせに失敗しました: %w", err)
	}
	return nil
}

// 店舗に見学の問い合わせ
func (s *InquiryServiceImpl) PostInspectionInquiry(dto InspectionInquiryDTO) error {
	data := map[string]string{
		"住所":         dto.Address,
		"メールアドレス": dto.Email,
		"お名前":       fmt.Sprintf("%s %s", dto.FirstName, dto.LastName),
		"子猫ID":       dto.KittenID,
		"メッセージ":   dto.Message,
		"ペットの状況": dto.PetStatus,
		"電話番号":    dto.PhoneNumber,
		"訪問日付":    dto.VisitDate,
		"訪問時間":    dto.VisitDate,
		"訪問方法":    dto.VisitMethod,
		"訪問人数":    dto.VisitPeople,
	}

	// 送信内容を作成
	message := s.MessageFormatter.Format(data)

	// ToDo：サービスが終了していため、GCPを利用する
	// err := s.NotificationService.NotifyToMail("", "", "")
	// if err != nil {
	// 	fmt.Printf("メールの送信に失敗しました: %v\n", err)
	// 	return fmt.Errorf("メールの送信に失敗しました: %w", err)
	// }

	err := s.NotificationService.NotifyToChat(message)
	if err != nil {
		fmt.Printf("チャットの送信に失敗しました: %v\n", err)
		return fmt.Errorf("チャットの送信に失敗しました: %w", err)
	}
	return nil
}
