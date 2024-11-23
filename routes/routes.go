package routes

import (
	"chm-api/commands"
	config "chm-api/config/routes"
	"net/http"

	"github.com/gorilla/mux"
)

// ルーターを初期化
func InitializeRouter(apiConfig config.APIConfig) *mux.Router {
	router := mux.NewRouter()

	for _, route := range apiConfig.Routes {
		command := commands.GetCommand(route.Command)
		// if command == nil {
		// 	log.Printf("Invalid command: %s", route.Command)
		// 	continue
		// }

		// ハンドラを設定
		router.HandleFunc(route.EndPoint, func(w http.ResponseWriter, r *http.Request) {
			command.Execute(w, r)
		}).Methods(route.HttpMethod)
	}

	return router
}
