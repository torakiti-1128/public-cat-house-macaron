package auth

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

// 認証機能のビジネスロジックインターフェース
type AuthService interface {
	// ログイン
	LoginUser(userName, password string) (AuthDTO, error)
	// ユーザー作成
	CreateUser(userName, password string) (AuthDTO, error)
}

// 認証機能の実装
type AuthServiceImpl struct {
	Repo AuthRepository
}

// 認証機能のコンストラクタ
func NewAuthService(repo AuthRepository) AuthService {
	return &AuthServiceImpl{Repo: repo}
}

// ログイン
func (s *AuthServiceImpl) LoginUser(userName, password string) (AuthDTO, error) {
	user, err := s.Repo.FindUserByName(userName)
	if err != nil {
		return AuthDTO{}, err
	}

	// パスワードを検証
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return AuthDTO{}, errors.New("パスワードが無効です")
	}

	return user, nil
}

// ユーザー作成
func (s *AuthServiceImpl) CreateUser(userName, password string) (AuthDTO, error) {
	existingUser, err := s.Repo.FindUserByName(userName)
	if err != nil {
		return AuthDTO{}, err
	}
	if existingUser.UserName != "" {
		return AuthDTO{}, errors.New("ユーザーがすでに存在します")
	}

	// パスワードをハッシュ化
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return AuthDTO{}, err
	}

	newUser, err := s.Repo.CreateUser(userName, string(hashedPassword))
	if err != nil {
		return AuthDTO{}, err
	}

	return newUser, nil
}
