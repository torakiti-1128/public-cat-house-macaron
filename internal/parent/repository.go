package parent

import (
	"database/sql"
	"fmt"
)

// インターフェース
type ParentRepository interface {
	GetParentCats() ([]ParentCatsDTO, error)
	GetParentCatDetail(ParentID int) (ParentCatDetailDTO, error)
}

// 実装
type ParentRepositoryImpl struct {
	DB *sql.DB
}

// コンストラクタ
func NewParentRepository(db *sql.DB) ParentRepository {
	return &ParentRepositoryImpl{DB: db}
}

// 親猫一覧を取得
func (repo *ParentRepositoryImpl) GetParentCats() ([]ParentCatsDTO, error) {
	query := `
		SELECT 
			pc.parent_cat_id,
			pc.name,
			pc.sex,
			b.breed_name,
			pc.age,
			pc.url
		FROM 
			parent_cats pc
		JOIN 
			breeds b
		ON 
			pc.breed_id = b.breed_id
		`
	rows, err := repo.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %w", err)
	}
	defer rows.Close()

	var parentCats []ParentCatsDTO
	for rows.Next() {
		var parentCat ParentCatsDTO
		if err := rows.Scan(&parentCat.ParentCatID, &parentCat.Name, &parentCat.Sex, &parentCat.Breed, &parentCat.Age, &parentCat.ImageUrl); err != nil {
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}
		parentCats = append(parentCats, parentCat)
	}
	return parentCats, nil
}

// 親猫詳細を取得
func (repo *ParentRepositoryImpl) GetParentCatDetail(parentCatId int) (ParentCatDetailDTO, error) {
	query := `
		SELECT 
			pc.parent_cat_id,
			pc.name,
			pc.sex,
			b.breed_name,
			c.color_name,
			pc.age,
			pc.birth_date,
			pc.description,
			pc.url
		FROM 
			parent_cats pc
		JOIN 
			breeds b
		ON 
			pc.breed_id = b.breed_id
		JOIN 
			colors c
		ON 
			pc.color_id = c.color_id
		WHERE 
			pc.parent_cat_id = $1
	`

	var parentCatDetail ParentCatDetailDTO
	err := repo.DB.QueryRow(query, parentCatId).Scan(
		&parentCatDetail.ParentCatID,
		&parentCatDetail.Name,
		&parentCatDetail.Sex,
		&parentCatDetail.Breed,
		&parentCatDetail.Color,
		&parentCatDetail.Age,
		&parentCatDetail.BirthDate,
		&parentCatDetail.Description,
		&parentCatDetail.ImageUrl,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return ParentCatDetailDTO{}, fmt.Errorf("no parent cat found with id %d", parentCatId)
		}
		return ParentCatDetailDTO{}, fmt.Errorf("failed to execute query: %w", err)
	}

	return parentCatDetail, nil
}
