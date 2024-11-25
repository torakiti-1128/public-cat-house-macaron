package main

import (
	"chm-api/commands"
	dbConfig "chm-api/config/database"
	apiConfig "chm-api/config/routes"
	"chm-api/config/storage/supabase"
	"chm-api/internal/auth"
	"chm-api/internal/kitten"
	"chm-api/internal/parent"
	"chm-api/internal/storage"
	"chm-api/routes"
	"log"
	"net/http"
)

// アプリケーションのエントリーポイント
func main() {
	// APIの設定を取得
	apiConfig, err := apiConfig.LoadConfig("config/routes/settings.json")
	if err != nil {
		log.Fatalf("APIの設定を読み込めません: %v", err)
	}

	// データベースの設定を取得
	databaseConfig, err := dbConfig.LoadConfig("config/database/settings.json")
	if err != nil {
		log.Fatalf("データベースの設定を読み込めません: %v", err)
	}

	// データベースぼ接続を設定
	db, err := dbConfig.NewDB(databaseConfig)
	if err != nil {
		log.Fatalf("データベースの接続に失敗しました: %v", err)
	}
	defer db.Close()

	// ビジネスロジックの依存関係をインスタンス化
	kittenService := kitten.NewKittenService(kitten.NewKittenRepository(db))
	authService := auth.NewAuthService(auth.NewAuthRepository(db))
	parentService := parent.NewParenttService(parent.NewParentRepository(db))
	storageService := storage.NewStorageService(storage.NewSupabaseRepository(storage.Config(supabase.NewConfig())))

	// ビジネスロジックを各コマンドへ実装
	commands.RegisterCommands(kittenService, authService, parentService, storageService)

	// ルーターを初期化
	router := routes.InitializeRouter(apiConfig)

	// サーバーを起動
	log.Println("Server running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
