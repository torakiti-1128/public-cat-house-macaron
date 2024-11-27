package breed

import (
	"database/sql"
	"fmt"
)

// 猫種関連のDBインターフェース
type BreedRepository interface {
	// 猫種一覧をDBから取得
	GetBreeds() ([]BreedDTO, error)
	// 猫種をDBに追加
	PostBreed(dto PostBreedDTO) (int, error)
	// 猫種の更新をDBヘ反映
	UpdateBreed(dto UpdateBreedDTO) error
	// 猫種の消去をDBへ反映
	DeleteBreed(breedId int) error
}

// 猫種関連のDB実装
type BreedRepositoryImpl struct {
	DB *sql.DB
}

// 猫種関連のDBコンストラクタ
func NewBreedRepository(db *sql.DB) BreedRepository {
	return &BreedRepositoryImpl{DB: db}
}

// 猫種一覧をDBから取得
func (repo *BreedRepositoryImpl) GetBreeds() ([]BreedDTO, error) {
	query := `SELECT breed_id, breed_name FROM breeds`
	rows, err := repo.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("猫種一覧の取得に失敗しました: %w", err)
	}
	defer rows.Close()

	var breeds []BreedDTO
	for rows.Next() {
		var breed BreedDTO
		if err := rows.Scan(&breed.BreedId, &breed.BreedName); err != nil {
			return nil, fmt.Errorf("データのスキャンに失敗しました: %w", err)
		}
		breeds = append(breeds, breed)
	}
	return breeds, nil
}

// 猫種をDBに追加
func (repo *BreedRepositoryImpl) PostBreed(dto PostBreedDTO) (int, error) {
	query := `INSERT INTO breeds (breed_name) VALUES ($1) RETURNING breed_id`
	var breedId int
	err := repo.DB.QueryRow(query, dto.BreedName).Scan(&breedId)
	if err != nil {
		return 0, fmt.Errorf("猫種の追加に失敗しました: %w", err)
	}
	return breedId, nil
}

// 猫種の更新をDBヘ反映
func (repo *BreedRepositoryImpl) UpdateBreed(dto UpdateBreedDTO) error {
	query := `UPDATE breeds SET breed_name = $1 WHERE breed_id = $2`
	_, err := repo.DB.Exec(query, dto.BreedName, dto.BreedId)
	if err != nil {
		return fmt.Errorf("猫種の更新に失敗しました: %w", err)
	}
	return nil
}

// 猫種の消去をDBへ反映
func (repo *BreedRepositoryImpl) DeleteBreed(breedId int) error {
	query := `DELETE FROM breeds WHERE breed_id = $1`
	_, err := repo.DB.Exec(query, breedId)
	if err != nil {
		return fmt.Errorf("猫種の削除に失敗しました: %w", err)
	}
	return nil
}
