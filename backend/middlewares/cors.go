package middlewares

import (
	"net/http"
)

// CORSを設定
func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// オリジンを取得
		origin := r.Header.Get("Origin")
		if 
		origin == "https://cat-house-macaron.jp" || 
		origin == "https://www.cat-house-macaron.jp" || 
		origin == "https://cat-house-macaron-management.vercel.app" ||
		origin == "http://localhost:3000" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// OPTIONSの応答
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// 次のハンドラーに処理を渡す
		next.ServeHTTP(w, r)
	})
}
