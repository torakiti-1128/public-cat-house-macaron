package health

import (
	"net/http"
)

// ヘルスチェクコマンド
type CommandHealthCheck struct {}

// ヘルスチェックコマンドのコンストラクタ
func NewCommandHealthCheck() *CommandHealthCheck {
	return &CommandHealthCheck{}
}

// ヘルスチェックコマンドの実行
func (c *CommandHealthCheck) Execute(w http.ResponseWriter, r *http.Request) {	
	w.WriteHeader(http.StatusOK)
    w.Write([]byte("OK"))	
}