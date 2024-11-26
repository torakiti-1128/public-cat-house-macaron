package parent

import (
	"database/sql"
	"fmt"
)

// 親猫関連のDBインターフェース
type ParentRepository interface {
	// 親猫一覧をDBから取得
	GetParentCats() ([]ParentCatsDTO, error)
	// 親猫詳細をDBから取得
	GetParentCatDetail(ParentID int) (ParentCatDetailDTO, error)
	// 親猫をDBに追加
	PostParentCat(dto PostParentCatDTO) (int, error)
	// 親猫の画像をDBに更新
	UpdateParentCatImage(parentCatId int, imageUrl string) error
}

// 親猫関連のDB実装
type ParentRepositoryImpl struct {
	DB *sql.DB
}

// 親猫関連のDBコンストラクタ
func NewParentRepository(db *sql.DB) ParentRepository {
	return &ParentRepositoryImpl{DB: db}
}

// 親猫一覧をDBから取得
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
		return nil, fmt.Errorf("クエリの実行に失敗しました: %w", err)
	}
	defer rows.Close()

	var parentCats []ParentCatsDTO
	for rows.Next() {
		var parentCat ParentCatsDTO
		if err := rows.Scan(&parentCat.ParentCatId, &parentCat.Name, &parentCat.Sex, &parentCat.Breed, &parentCat.Age, &parentCat.ImageUrl); err != nil {
			return nil, fmt.Errorf("データのスキャンに失敗しました: %w", err)
		}
		parentCats = append(parentCats, parentCat)
	}
	return parentCats, nil
}

// 親猫詳細をDBから取得
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
		&parentCatDetail.ParentCatId,
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
			return ParentCatDetailDTO{}, fmt.Errorf("指定された%dの親猫が見つかりません", parentCatId)
		}
		return ParentCatDetailDTO{}, fmt.Errorf("クエリの実行に失敗しました: %w", err)
	}

	return parentCatDetail, nil
}

// 親猫をDBに追加
func (repo *ParentRepositoryImpl) PostParentCat(dto PostParentCatDTO) (int, error) {
	query := `
		INSERT INTO parent_cats (breed_id, color_id, name, sex, age, birth_date, description, image_url)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING parent_cat_id;
	`

	var parentCatId int
	err := repo.DB.QueryRow(query,
		dto.BreedId,
		dto.ColorId,
		dto.Name,
		dto.Sex,
		dto.Age,
		dto.BirthDate,
		dto.Description,
		dto.ImageUrl,
	).Scan(&parentCatId)

	if err != nil {
		return 0, fmt.Errorf("親猫の追加に失敗しました: %w", err)
	}

	return parentCatId, nil
}

// 親猫の画像をDBに更新
func (repo *ParentRepositoryImpl) UpdateParentCatImage(parentCatId int, imageUrl string) error {
	query := `
		UPDATE parent_cats
		SET image_url = $1
		WHERE parent_cat_id = $2;
	`

	_, err := repo.DB.Exec(query, imageUrl, parentCatId)
	if err != nil {
		return fmt.Errorf("親猫の画像更新に失敗しました (parentCatId: %d): %w", parentCatId, err)
	}

	return nil
}
