package auth

import (
	"encoding/json"
	"net/http"
)

// ログインコマンド
type CommandLoginUser struct {
	Service AuthService
}

// ユーザー作成コマンド
type CommandCreateUser struct {
	Service AuthService
}

// コンストラクタ
func NewCommandLoginUser(service AuthService) *CommandLoginUser {
	return &CommandLoginUser{Service: service}
}

// コンストラクタ
func NewCommandCreateUser(service AuthService) *CommandCreateUser {
	return &CommandCreateUser{Service: service}
}

// ログイン
func (c *CommandLoginUser) Execute(w http.ResponseWriter, r *http.Request) {
	var credentials AuthDTO
	if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	user, err := c.Service.LoginUser(credentials.UserName, credentials.Password)
	if err != nil {
		http.Error(w, "Login failed: "+err.Error(), http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

// ユーザー作成
func (c *CommandCreateUser) Execute(w http.ResponseWriter, r *http.Request) {
	var newUser AuthDTO
	if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	createdUser, err := c.Service.CreateUser(newUser.UserName, newUser.Password)
	if err != nil {
		http.Error(w, "User creation failed: "+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(createdUser)
}
