package main

import (
	"chm-api/commands"
	dbConfig "chm-api/config/database"
	apiConfig "chm-api/config/routes"
	"chm-api/internal/kitten"
	"chm-api/routes"
	"log"
	"net/http"
)

func main() {
	// API設定を読み込む
	apiConfig, err := apiConfig.LoadConfig("config/routes/settings.json")
	if err != nil {
		log.Fatalf("API設定を読み込めません: %v", err)
	}

	// データベース設定を読み込む
	databaseConfig, err := dbConfig.LoadConfig("config/database/settings.json")
	if err != nil {
		log.Fatalf("データベース設定を読み込めません: %v", err)
	}

	// データベース接続を初期化
	db, err := dbConfig.NewDB(databaseConfig)
	if err != nil {
		log.Fatalf("データベース接続に失敗しました: %v", err)
	}
	defer db.Close()

	// Kittenリポジトリとサービスを初期化
	kittenRepo := kitten.NewKittenRepository(db)
	kittenService := kitten.NewKittenService(kittenRepo)

	// コマンドを登録
	commands.RegisterCommands(kittenService)

	// ルーターを初期化
	router := routes.InitializeRouter(apiConfig)

	// サーバーを起動
	log.Println("Server running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
