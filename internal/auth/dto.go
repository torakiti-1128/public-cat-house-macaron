package auth

// 認証データ
type AuthDTO struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}
