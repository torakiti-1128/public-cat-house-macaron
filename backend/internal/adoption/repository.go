package adoption

import (
	"database/sql"
	"fmt"
)

// 里親募集中猫関連のDBインターフェース
type AdoptionRepository interface {
	// 里親募集中猫一覧をDBから取得
	GetAdoptionCats() ([]AdoptionCatsDTO, error)
	// 里親募集中猫をDBに追加
	PostAdoptionCat(dto PostAdoptionCatDTO) (int, error)
	// 里親募集中猫の画像をDBに更新
	UpdateAdoptionCatImage(adoptionCatId int, imageUrl string) error
	// 里親募集中猫の更新をDBへ反映
	UpdateAdoptionCat(dto UpdateAdoptionCatDTO) error
	// 里親募集中猫の消去をDBへ反映
	DeleteAdoptionCat(adoptionCatId int) error
}

// 里親募集中猫関連のDB実装
type AdoptionRepositoryImpl struct {
	DB *sql.DB
}

// 里親募集中猫関連のDBコンストラクタ
func NewAdoptionRepository(db *sql.DB) AdoptionRepository {
	return &AdoptionRepositoryImpl{DB: db}
}

// 里親募集中猫一覧をDBから取得
func (repo *AdoptionRepositoryImpl) GetAdoptionCats() ([]AdoptionCatsDTO, error) {
	query := `
		SELECT 
			ac.adoption_cat_id,
			ac.name,
			ac.sex,
			b.breed_name,
			c.color_name,
			ac.age,
			ac.birth_date, 
			ac.description, 
			ac.url
		FROM 
			adoption_cats ac
		JOIN 
			breeds b
		ON 
			ac.breed_id = b.breed_id
		JOIN 
			colors c
		ON 
			ac.color_id = c.color_id
	`
	rows, err := repo.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("クエリの実行に失敗しました: %w", err)
	}
	defer rows.Close()

	var adoptionCats []AdoptionCatsDTO
	for rows.Next() {
		var adoptionCat AdoptionCatsDTO
		if err := rows.Scan(&adoptionCat.AdoptionCatId, &adoptionCat.Name, &adoptionCat.Sex, &adoptionCat.Breed, &adoptionCat.Color, &adoptionCat.Age, &adoptionCat.BirthDate, &adoptionCat.Description, &adoptionCat.ImageUrl); err != nil {
			return nil, fmt.Errorf("データのスキャンに失敗しました: %w", err)
		}
		adoptionCats = append(adoptionCats, adoptionCat)
	}
	return adoptionCats, nil
}

// 里親募集中猫をDBに追加
func (repo *AdoptionRepositoryImpl) PostAdoptionCat(dto PostAdoptionCatDTO) (int, error) {
	query := `
		INSERT INTO 
			adoption_cats (
				breed_id, 
				color_id, 
				name, 
				sex, 
				age, 
				birth_date, 
				description, 
				url
			)
		VALUES 
			($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING 
			adoption_cat_id;
	`

	var adoptionCatId int
	err := repo.DB.QueryRow(query,
		dto.BreedId,
		dto.ColorId,
		dto.Name,
		dto.Sex,
		dto.Age,
		dto.BirthDate,
		dto.Description,
		dto.ImageUrl,
	).Scan(&adoptionCatId)

	if err != nil {
		return 0, fmt.Errorf("里親募集中猫の追加に失敗しました: %w", err)
	}

	return adoptionCatId, nil
}

// 里親募集中猫の画像をDBに更新
func (repo *AdoptionRepositoryImpl) UpdateAdoptionCatImage(adoptionCatId int, imageUrl string) error {
	query := `
		UPDATE adoption_cats
		SET url = $1
		WHERE adoption_cat_id = $2;
	`

	_, err := repo.DB.Exec(query, imageUrl, adoptionCatId)
	if err != nil {
		return fmt.Errorf("里親募集中猫の画像更新に失敗しました (adoptionCatId: %d): %w", adoptionCatId, err)
	}

	return nil
}

// 里親募集中猫の更新をDBへ反映
func (repo *AdoptionRepositoryImpl) UpdateAdoptionCat(dto UpdateAdoptionCatDTO) error {
	query := `
		UPDATE 
			adoption_cats
		SET 
			breed_id = $1, 
			color_id = $2, 
			name = $3, 
			sex = $4, 
			age = $5, 
			birth_date = $6, 
			description = $7
		WHERE 
			adoption_cat_id = $8;
	`

	_, err := repo.DB.Exec(query,
		dto.BreedId,
		dto.ColorId,
		dto.Name,
		dto.Sex,
		dto.Age,
		dto.BirthDate,
		dto.Description,
		dto.AdoptionCatId,
	)
	if err != nil {
		return fmt.Errorf("里親募集中猫の更新に失敗しました: %w", err)
	}
	return nil
}

// 里親募集中猫の消去をDBへ反映
func (repo *AdoptionRepositoryImpl) DeleteAdoptionCat(adoptionCatId int) error {
	query := `
		DELETE FROM adoption_cats
		WHERE adoption_cat_id = $1;
	`

	_, err := repo.DB.Exec(query, adoptionCatId)
	if err != nil {
		return fmt.Errorf("里親募集中猫の削除に失敗しました: %w", err)
	}
	return nil
}