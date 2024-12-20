package inquiry

import "net/http"

// 基本的な問い合わせコマンド
type CommandPostBaseInquiry struct {
	InquiryService InquiryService
}

// 見学問い合わせコマンド
type CommandPostInspectionInquiry struct {
	InquiryService InquiryService
}

// 基本的な問い合わせコンストラクタ
func NewCommandPostBaseInquiry(inquiryService InquiryService) *CommandPostBaseInquiry {
	return &CommandPostBaseInquiry{InquiryService: inquiryService}
}

// 見学問い合わせコンストラクタ
func NewCommandPostInspectionInquiry(inquiryService InquiryService) *CommandPostInspectionInquiry {
	return &CommandPostInspectionInquiry{InquiryService: inquiryService}
}

// 基本的な問い合わせコマンドの実行
func (c *CommandPostBaseInquiry) Execute(w http.ResponseWriter, r *http.Request) {
	
}

// 見学の問い合わせコマンドの実行
func (c *CommandPostInspectionInquiry) Execute(w http.ResponseWriter, r *http.Request) {
	
}