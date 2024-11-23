package kitten

import (
	"database/sql"
	"fmt"
)

// KittenRepository インターフェース
type KittenRepository interface {
	GetKittens() ([]KittensDTO, error)
	GetKittenDetail(kittenID int) (KittenDetailDTO, error)
}

// KittenRepositoryImpl 実装
type KittenRepositoryImpl struct {
	DB *sql.DB
}

// NewKittenRepository コンストラクタ
func NewKittenRepository(db *sql.DB) KittenRepository {
	return &KittenRepositoryImpl{DB: db}
}

// GetKittens 募集中の子猫一覧を取得
func (repo *KittenRepositoryImpl) GetKittens() ([]KittensDTO, error) {
	query := `
		SELECT 
			k.kitten_id, 
			b.breed_name AS breed, 
			k.created_at, 
			ki.url
		FROM 
			kittens k
		JOIN 
			breeds b
		ON 
			k.breed_id = b.breed_id
		LEFT JOIN 
			(
				SELECT DISTINCT ON (kitten_id)
					kitten_id, 
					url
				FROM 
					kitten_images
				ORDER BY 
					kitten_id, created_at DESC
			) ki
		ON 
			k.kitten_id = ki.kitten_id
	`

	// クエリ実行
	rows, err := repo.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %w", err)
	}
	defer rows.Close()

	var kittens []KittensDTO
	for rows.Next() {
		var kitten KittensDTO
		if err := rows.Scan(&kitten.KittenID, &kitten.Breed, &kitten.CreatedAt, &kitten.ImageUrl); err != nil {
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}
		kittens = append(kittens, kitten)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("rows iteration error: %w", err)
	}

	return kittens, nil
}

// GetKittenDetail 子猫の詳細情報を取得
func (repo *KittenRepositoryImpl) GetKittenDetail(kittenID int) (KittenDetailDTO, error) {
	queryDetail := `
		SELECT 
			k.kitten_id,
			k.father_cat_id,
			k.mother_cat_id,
			k.description,
			b.breed_name AS breed,
			c.color_name AS color,
			k.sex,
			k.birth_date,
			k.price
		FROM 
			kittens k
		JOIN 
			breeds b
		ON 
			k.breed_id = b.breed_id
		JOIN 
			colors c
		ON 
			k.color_id = c.color_id
		WHERE 
			k.kitten_id = $1
	`

	// 子猫の詳細を取得
	var detail KittenDetailDTO
	err := repo.DB.QueryRow(queryDetail, kittenID).Scan(
		&detail.KittenID,
		&detail.FatherCatID,
		&detail.MotherCatID,
		&detail.Description,
		&detail.Breed,
		&detail.Color,
		&detail.Sex,
		&detail.BirthDate,
		&detail.Price,
	)
	if err != nil {
		return KittenDetailDTO{}, fmt.Errorf("failed to fetch kitten detail: %w", err)
	}

	// 子猫の画像URLを取得
	queryImages := `
		SELECT 
			url
		FROM 
			kitten_images
		WHERE 
			kitten_id = $1
		ORDER BY 
			created_at DESC
	`

	rows, err := repo.DB.Query(queryImages, kittenID)
	if err != nil {
		return KittenDetailDTO{}, fmt.Errorf("failed to fetch kitten images: %w", err)
	}
	defer rows.Close()

	var imageUrls []string
	for rows.Next() {
		var url string
		if err := rows.Scan(&url); err != nil {
			return KittenDetailDTO{}, fmt.Errorf("failed to scan image URL: %w", err)
		}
		imageUrls = append(imageUrls, url)
	}
	detail.ImageUrls = imageUrls

	// 子猫の動画URLを取得
	queryVideo := `
		SELECT 
			url
		FROM 
			kitten_videos
		WHERE 
			kitten_id = $1
		ORDER BY 
			created_at DESC
		LIMIT 1
	`

	err = repo.DB.QueryRow(queryVideo, kittenID).Scan(&detail.VideoURL)
	if err != nil && err != sql.ErrNoRows {
		return KittenDetailDTO{}, fmt.Errorf("failed to fetch kitten video: %w", err)
	}

	return detail, nil
}
