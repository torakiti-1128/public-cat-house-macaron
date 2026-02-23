package auth

import (
	"database/sql"
	"errors"
)

// 認証機能のDBインターフェース
type AuthRepository interface {
	// ユーザー名とパスワードに基づいてユーザーを検索
	FindUserByCredentials(userName, password string) (AuthDTO, error)
	// ユーザー名に基づいてユーザーを検索
	FindUserByName(userName string) (AuthDTO, error)
	// 新しいユーザーを作成
	CreateUser(userName, password string) (AuthDTO, error)
}

// 認証機能のDB実装
type AuthRepositoryImpl struct {
	DB *sql.DB
}

// 認証機能のDBコンストラクタ
func NewAuthRepository(db *sql.DB) AuthRepository {
	return &AuthRepositoryImpl{DB: db}
}

// ユーザー名とパスワードに基づいてユーザーを検索
func (repo *AuthRepositoryImpl) FindUserByCredentials(userName, password string) (AuthDTO, error) {
	query := "SELECT user_name, password FROM users WHERE user_name = $1 AND password = $2"
	row := repo.DB.QueryRow(query, userName, password)

	var user AuthDTO
	err := row.Scan(&user.UserName, &user.Password)
	if err == sql.ErrNoRows {
		return AuthDTO{}, errors.New("ユーザーが見つかりません")
	}
	if err != nil {
		return AuthDTO{}, err
	}

	return user, nil
}

// ユーザー名に基づいてユーザーを検索
func (repo *AuthRepositoryImpl) FindUserByName(userName string) (AuthDTO, error) {
	query := "SELECT user_name, password FROM users WHERE user_name = $1"
	row := repo.DB.QueryRow(query, userName)

	var user AuthDTO
	err := row.Scan(&user.UserName, &user.Password)
	if err == sql.ErrNoRows {
		return AuthDTO{}, nil
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
