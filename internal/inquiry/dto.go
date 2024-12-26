package inquiry

// 店舗に問い合わせするデータ
type BaseInquiryDTO struct {

}

// 店舗に見学の問い合わせデータ
type InspectionInquiryDTO struct {
	Address      string `json:"address"`
	Email        string `json:"email"`
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	KittenID     string `json:"kittenId"`
	Message      string `json:"message"`
	PetStatus    string `json:"petStatus"`
	PhoneNumber  string `json:"phoneNumber"`
	VisitDate    string `json:"visitDate"` // 日付と時間を統合
	VisitTime    string `json:"visitTime"` // 日付と時間を統合
	VisitMethod  string `json:"visitMethod"`
	VisitPeople  string `json:"visitPeople"`
}