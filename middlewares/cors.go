package middlewares

import (
	"net/http"
)

// CORSミドルウェア
func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// CORSヘッダーを設定
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")            // 許可するオリジンを指定
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS") // 許可するHTTPメソッド
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")     // 許可するヘッダー

		// プリフライトリクエスト（OPTIONS）への応答
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// 次のハンドラーに処理を渡す
		next.ServeHTTP(w, r)
	})
}
