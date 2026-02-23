package inquiry

import (
	"encoding/json"
	"net/http"
)

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
	var dto BaseInquiryDTO
	if err := json.NewDecoder(r.Body).Decode(&dto); err != nil {
		http.Error(w, "無効なリクエスト形式です", http.StatusBadRequest)
		return
	}

	if err := c.InquiryService.PostBaseInquiry(dto); err != nil {
		http.Error(w, "問い合わせに失敗しました", http.StatusInternalServerError)
		return
	}
}

// 見学の問い合わせコマンドの実行
func (c *CommandPostInspectionInquiry) Execute(w http.ResponseWriter, r *http.Request) {
	var dto InspectionInquiryDTO
	if err := json.NewDecoder(r.Body).Decode(&dto); err != nil {
		http.Error(w, "無効なリクエスト形式です", http.StatusBadRequest)
		return
	}

	if err := c.InquiryService.PostInspectionInquiry(dto); err != nil {
		http.Error(w, "問い合わせに失敗しました", http.StatusInternalServerError)
		return
	}
}