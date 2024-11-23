package auth

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

// インターフェース
type AuthService interface {
	LoginUser(userName, password string) (AuthDTO, error)
	CreateUser(userName, password string) (AuthDTO, error)
}

// 実装
type AuthServiceImpl struct {
	Repo AuthRepository
}

// コンストラクタ
func NewAuthService(repo AuthRepository) AuthService {
	return &AuthServiceImpl{Repo: repo}
}

// ユーザーログイン
func (s *AuthServiceImpl) LoginUser(userName, password string) (AuthDTO, error) {
	// ユーザー取得
	user, err := s.Repo.FindUserByName(userName)
	if err != nil {
		return AuthDTO{}, err
	}

	// パスワード検証
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return AuthDTO{}, errors.New("invalid credentials")
	}

	return user, nil
}

// ユーザー作成
func (s *AuthServiceImpl) CreateUser(userName, password string) (AuthDTO, error) {
	// ユーザーが既に存在するかチェック
	existingUser, err := s.Repo.FindUserByName(userName)
	if err != nil {
		return AuthDTO{}, err
	}
	if existingUser.UserName != "" {
		return AuthDTO{}, errors.New("user already exists")
	}

	// パスワードをハッシュ化
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return AuthDTO{}, err
	}

	// ユーザーを作成
	newUser, err := s.Repo.CreateUser(userName, string(hashedPassword))
	if err != nil {
		return AuthDTO{}, err
	}

	return newUser, nil
}
