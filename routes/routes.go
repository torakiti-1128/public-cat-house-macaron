package routes

import (
	"chm-api/commands"
	config "chm-api/config/routes"
	"chm-api/middlewares"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

// ルーターを初期化
func InitializeRouter(apiConfig config.APIConfig) *mux.Router {
	router := mux.NewRouter()

	// CORSミドルウェアを適用
	router.Use(middlewares.CORS)

	for _, route := range apiConfig.Routes {
		command, err := commands.GetCommand(route.Command)
		if command == nil {
			fmt.Printf("Failed to get command '%s': %v\n", route.Command, err)
			continue
		}
		// ハンドラを設定
		router.HandleFunc(route.EndPoint, func(w http.ResponseWriter, r *http.Request) {
			command.Execute(w, r)
		}).Methods(route.HttpMethod)
	}

	return router
}
