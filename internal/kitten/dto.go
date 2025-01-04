package kitten

// 子猫一覧データ
type KittensDTO struct {
	KittenId  int    `json:"kittenId"`
	Breed     string `json:"breed"`
	ImageUrl  string `json:"imageUrl"`
	TranState string `json:"tranState"`
	CreatedAt string `json:"createdAt"`
}

// 子猫詳細データ
type KittenDetailDTO struct {
	KittenId    int         `json:"kittenId"`
	FatherCatId int         `json:"fatherCatId"`
	MotherCatId int         `json:"motherCatId"`
	Description string      `json:"description"`
	Breed       string      `json:"breed"`
	Color       string      `json:"color"`
	Sex         int         `json:"sex"`
	BirthDate   string      `json:"birthDate"`
	Price       int         `json:"price"`
	TranState   string      `json:"tranState"`
	ImageUrls   []ImageDTO  `json:"imageUrls"`
	VideoUrls   []VideoDTO  `json:"videoUrls"`
}

// 画像データ
type ImageDTO struct {
	ImageId  int    `json:"imageId"`
	ImageUrl string `json:"imageUrl"`
}

// 動画データ
type VideoDTO struct {
	VideoId  int    `json:"videoId"` 
	VideoUrl string `json:"videoUrl"`
}

// 　子猫追加データ
type PostKittenDTO struct {
	FatherCatId int    `json:"fatherCatId"`
	MotherCatId int    `json:"motherCatId"`
	BreedId     int    `json:"breedId"`
	ColorId     int    `json:"colorId"`
	Sex         int    `json:"sex"`
	BirthDate   string `json:"birthDate"`
	Description string `json:"description"`
	Price       int    `json:"price"`
	TranState   string `json:"tranState"`
	ImageUrls   []string
	VideoUrl    string
}

// 　子猫更新データ
type UpdateKittenDTO struct {
	KittenId    int    `json:"kittenId"`
	FatherCatId int    `json:"fatherCatId"`
	MotherCatId int    `json:"motherCatId"`
	BreedId     int    `json:"breedId"`
	ColorId     int    `json:"colorId"`
	Sex         int    `json:"sex"`
	BirthDate   string `json:"birthDate"`
	Description string `json:"description"`
	Price       int    `json:"price"`
	TranState   string `json:"tranState"`
}
