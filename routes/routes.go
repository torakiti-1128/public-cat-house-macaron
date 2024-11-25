package routes

import (
	"chm-api/commands"
	config "chm-api/config/routes"
	"chm-api/middlewares"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

// ルーターを設定
func InitializeRouter(apiConfig config.APIConfig) *mux.Router {
	router := mux.NewRouter()

	// CORSを適用
	router.Use(middlewares.CORS)

	for _, route := range apiConfig.Routes {
		command, err := commands.GetCommand(route.Command)
		if command == nil {
			fmt.Printf("コマンドの取得に失敗しました '%s': %v\n", route.Command, err)
			continue
		}
		// ハンドラを設定
		router.HandleFunc(route.EndPoint, func(w http.ResponseWriter, r *http.Request) {
			command.Execute(w, r)
		}).Methods(route.HttpMethod)
	}

	return router
}
