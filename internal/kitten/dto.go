package kitten

type KittensDTO struct {
	KittenID  int    `json:"kittenId"`
	Breed     string `json:"breed"`
	ImageUrl  string `json:"imageUrl"`
	TranState string `json:"tranState"`
	CreatedAt string `json:"createdAt"`
}

type KittenDetailDTO struct {
	KittenID    int      `json:"kittenId"`
	FatherCatID int      `json:"fatherCatId"`
	MotherCatID int      `json:"motherCatId"`
	Description string   `json:"description"`
	Breed       string   `json:"breed"`
	Color       string   `json:"color"`
	Sex         int      `json:"sex"`
	BirthDate   string   `json:"birthDate"`
	Price       int      `json:"price"`
	TranState   string   `json:"tranState"`
	ImageUrls   []string `json:"imageUrls"`
	VideoURL    string   `json:"videoUrl"`
}
