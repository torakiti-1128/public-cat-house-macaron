package parent

type ParentCatsDTO struct {
	ParentCatID int    `json:"parentCatId"`
	Name        string `json:"name"`
	Sex         string `jsomn:"sex"`
	Breed       string `json:"breed"`
	Age         string `json:"age"`
	ImageUrl    string `json:"imageUrl"`
}

type ParentCatDetailDTO struct {
	ParentCatID int    `json:"parentCatId"`
	Name        string `json:"name"`
	Sex         string `json:"sex"`
	Breed       string `json:"breed"`
	Age         int    `json:"age"`
	BirthDate   string `json:"birthDate"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl"`
	BreedID     int    `json:"breedId"`
	ColorID     int    `json:"colorId"`
}
