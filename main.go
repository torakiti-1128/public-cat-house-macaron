package main

import (
	"chm-api/commands"
	dbConfig "chm-api/config/database"
	apiConfig "chm-api/config/routes"
	"chm-api/internal/auth"
	"chm-api/internal/kitten"
	"chm-api/internal/parent"
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

	// ビジネスロジックの依存関係をインスタンス化
	kittenService := kitten.NewKittenService(kitten.NewKittenRepository(db))
	authService := auth.NewAuthService(auth.NewAuthRepository(db))
	parentService := parent.NewParenttService(parent.NewParentRepository(db))
	// storageService := storage.NewStorageService(storage.NewSupabaseRepository(supabase.NewClient()))

	// ビジネスロジックを各コマンドへ実装
	commands.RegisterCommands(kittenService, authService, parentService)

	// ルーターを初期化
	router := routes.InitializeRouter(apiConfig)

	// サーバーを起動
	log.Println("Server running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
