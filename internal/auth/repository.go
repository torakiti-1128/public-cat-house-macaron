package auth

import (
	"database/sql"
	"errors"
)

// インターフェース
type AuthRepository interface {
	// ユーザーを検索
	FindUserByCredentials(userName, password string) (AuthDTO, error)

	// ユーザー名でユーザーを検索
	FindUserByName(userName string) (AuthDTO, error)

	// ユーザー作成
	CreateUser(userName, password string) (AuthDTO, error)
}

// 実装
type AuthRepositoryImpl struct {
	DB *sql.DB
}

// コンストラクタ
func NewAuthRepository(db *sql.DB) AuthRepository {
	return &AuthRepositoryImpl{DB: db}
}

// FindUserByCredentials 資格情報に基づいてユーザーを検索
func (repo *AuthRepositoryImpl) FindUserByCredentials(userName, password string) (AuthDTO, error) {
	query := "SELECT user_name, password FROM users WHERE user_name = $1 AND password = $2"
	row := repo.DB.QueryRow(query, userName, password)

	var user AuthDTO
	err := row.Scan(&user.UserName, &user.Password)
	if err == sql.ErrNoRows {
		return AuthDTO{}, errors.New("user not found")
	}
	if err != nil {
		return AuthDTO{}, err
	}

	return user, nil
}

// FindUserByName ユーザー名に基づいてユーザーを検索
func (repo *AuthRepositoryImpl) FindUserByName(userName string) (AuthDTO, error) {
	query := "SELECT user_name, password FROM users WHERE user_name = $1"
	row := repo.DB.QueryRow(query, userName)

	var user AuthDTO
	err := row.Scan(&user.UserName, &user.Password)
	if err == sql.ErrNoRows {
		return AuthDTO{}, nil // ユーザーが存在しない場合はエラーではない
	}
	if err != nil {
		return AuthDTO{}, err
	}

	return user, nil
}

// 新しいユーザーを作成
func (repo *AuthRepositoryImpl) CreateUser(userName, password string) (AuthDTO, error) {
	query := "INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING user_name, password"
	row := repo.DB.QueryRow(query, userName, password)

	var newUser AuthDTO
	err := row.Scan(&newUser.UserName, &newUser.Password)
	if err != nil {
		return AuthDTO{}, err
	}

	return newUser, nil
}
