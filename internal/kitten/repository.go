package kitten

import (
	"database/sql"
	"fmt"
	"log"
)

// 子猫関連のDBインターフェース
type KittenRepository interface {
	// 子猫一覧をDBから取得
	GetKittens() ([]KittensDTO, error)
	// 子猫の詳細情報をDBから取得
	GetKittenDetail(kittenId int) (KittenDetailDTO, error)
	// 子猫をDBに追加
	PostKitten(dto PostKittenDTO) (int, error)
	// 子猫の写真をDBに追加
	PostKittenImage(kittenId int, imageUrl string) error
	// 子猫の動画をDBに追加
	PostKittenVideo(kittenId int, videoUrl string) error
	// 子猫の更新をDBヘ反映
	UpdateKitten(dto UpdateKittenDTO) error
	// 子猫の消去をDBへ反映
	DeleteKitten(kittenId int) error
}

// 子猫関連のDB実装
type KittenRepositoryImpl struct {
	DB *sql.DB
}

// 子猫関連のDBコンストラクタ
func NewKittenRepository(db *sql.DB) KittenRepository {
	return &KittenRepositoryImpl{DB: db}
}

// 募集中の子猫一覧をDBから取得
func (repo *KittenRepositoryImpl) GetKittens() ([]KittensDTO, error) {
	query := `
		SELECT 
			k.kitten_id, 
			b.breed_name AS breed, 
			ki.url,
			k.tran_state,
			k.created_at
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

	rows, err := repo.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("子猫一覧の取得に失敗しました: %w", err)
	}
	defer rows.Close()

	var kittens []KittensDTO
	for rows.Next() {
		var kitten KittensDTO
		if err := rows.Scan(&kitten.KittenId, &kitten.Breed, &kitten.ImageUrl, &kitten.TranState, &kitten.CreatedAt); err != nil {
			return nil, fmt.Errorf("子猫一覧の読み込みに失敗しました: %w", err)
		}
		kittens = append(kittens, kitten)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("子猫一覧の処理中にエラーが発生しました: %w", err)
	}

	return kittens, nil
}

// 子猫の詳細情報をDBから取得
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
			k.price,
			k.tran_state
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

	var detail KittenDetailDTO
	err := repo.DB.QueryRow(queryDetail, kittenID).Scan(
		&detail.KittenId,
		&detail.FatherCatId,
		&detail.MotherCatId,
		&detail.Description,
		&detail.Breed,
		&detail.Color,
		&detail.Sex,
		&detail.BirthDate,
		&detail.Price,
		&detail.TranState,
	)
	if err != nil {
		return KittenDetailDTO{}, fmt.Errorf("子猫詳細の取得に失敗しました: %w", err)
	}

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
		return KittenDetailDTO{}, fmt.Errorf("子猫画像の取得に失敗しました: %w", err)
	}
	defer rows.Close()

	var imageUrls []string
	for rows.Next() {
		var url string
		if err := rows.Scan(&url); err != nil {
			return KittenDetailDTO{}, fmt.Errorf("子猫画像の読み込みに失敗しました: %w", err)
		}
		imageUrls = append(imageUrls, url)
	}
	detail.ImageUrls = imageUrls

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

	err = repo.DB.QueryRow(queryVideo, kittenID).Scan(&detail.VideoUrl)
	if err != nil && err != sql.ErrNoRows {
		return KittenDetailDTO{}, fmt.Errorf("子猫動画の取得に失敗しました: %w", err)
	}

	return detail, nil
}

// 子猫をDBに追加
func (r *KittenRepositoryImpl) PostKitten(dto PostKittenDTO) (int, error) {
	query := `
		INSERT INTO kittens (father_cat_id, mother_cat_id, breed_id, color_id, sex, birth_date, description, price, tran_state)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING kitten_id;
	`
	var kittenId int
	err := r.DB.QueryRow(query, dto.FatherCatId, dto.MotherCatId, dto.BreedId, dto.ColorId, dto.Sex, dto.BirthDate, dto.Description, dto.Price, dto.TranState).Scan(&kittenId)
	if err != nil {
		return 0, fmt.Errorf("子猫の追加に失敗しました: %w", err)
	}
	return kittenId, nil
}

// 子猫の写真をDBに追加
func (r *KittenRepositoryImpl) PostKittenImage(kittenID int, imageUrl string) error {
	query := `
		INSERT INTO kitten_images (kitten_id, url)
		VALUES ($1, $2)
	`
	_, err := r.DB.Exec(query, kittenID, imageUrl)
	if err != nil {
		log.Printf("子猫の写真追加エラー: %v (kitten_id: %d, url: %s)", err, kittenID, imageUrl)
	}
	return err
}

// 子猫の動画をDBに追加
func (r *KittenRepositoryImpl) PostKittenVideo(kittenID int, videoUrl string) error {
	query := `
		INSERT INTO kitten_videos (kitten_id, url)
		VALUES ($1, $2)
	`
	_, err := r.DB.Exec(query, kittenID, videoUrl)
	if err != nil {
		log.Printf("子猫の動画追加エラー: %v (kitten_id: %d, url: %s)", err, kittenID, videoUrl)
	}
	return err
}

// 子猫の更新をDBヘ反映
func (r *KittenRepositoryImpl) UpdateKitten(dto UpdateKittenDTO) error {
	query := `
		UPDATE 
			kittens
		SET 
			father_cat_id = $1, 
			mother_cat_id = $2,
			breed_id = $3,
			color_id =  $4,
			sex = $5,
			birth_date = $6,
			description = $7,
			price = $8,
			tran_state = &9
		WHERE
			kitten_id = &10
	`
	_, err := r.DB.Exec(query,
		dto.FatherCatId,
		dto.MotherCatId,
		dto.BreedId,
		dto.ColorId,
		dto.Sex,
		dto.BirthDate,
		dto.Description,
		dto.Price,
		dto.TranState,
		dto.KittenId,
	)
	if err != nil {
		log.Printf("子猫の更新エラー: %v", err)
	}
	return err
}

// 子猫の消去をDBへ反映
func (r *KittenRepositoryImpl) DeleteKitten(kittenId int) error {
	query := `
		DELETE FROM kittens
		WHERE kitten_id = $1;
	`
	_, err := r.DB.Exec(query, kittenId)
	if err != nil {
		log.Printf("子猫の消去エラー: %v (kitten_id: %d)", err, kittenId)
	}
	return err
}
