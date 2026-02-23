package inquiry

// 店舗に問い合わせするデータ
type BaseInquiryDTO struct {
	FirstName      string `json:"firstName"`
	LastName       string `json:"lastName"`         
	Email          string   `json:"email"`            
	PhoneNumber    string   `json:"phoneNumber"`             
	Title          string   `json:"title"`      
	Message        string   `json:"message"`         
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
	VisitDate    string `json:"visitDate"`
	VisitTime    string `json:"visitTime"`
	VisitMethod  string `json:"visitMethod"`
	VisitPeople  string `json:"visitPeople"`
}