package breed

type BreedDTO struct {
	BreedId   int    `json:"breedId"`
	BreedName string `json:"breedName"`
}

type PostBreedDTO struct {
	BreedName string `json:"breedName"`
}

type UpdateBreedDTO struct {
	BreedId   int    `json:"breedId"`
	BreedName string `json:"breedName"`
}
