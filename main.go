package main

import (
	"log"
	"net/http"

	dbConfig "chm-api/config/database"
	apiConfig "chm-api/config/routes"
	storageConfig "chm-api/config/storage/supabase"

	"chm-api/commands"
	"chm-api/internal/adoption"
	"chm-api/internal/auth"
	"chm-api/internal/breed"
	"chm-api/internal/color"
	"chm-api/internal/inquiry"
	"chm-api/internal/kitten"
	"chm-api/internal/news"
	"chm-api/internal/notification"
	"chm-api/internal/parent"
	"chm-api/internal/storage"
	"chm-api/routes"
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

	// データベースの接続を設定
	db, err := dbConfig.NewDB(databaseConfig)
	if err != nil {
		log.Fatalf("データベースの接続に失敗しました: %v", err)
	}
	defer db.Close()

	// ビジネスロジックの依存関係をインスタンス化
	storageService := storage.NewStorageService(storage.NewSupabaseRepository(storage.SupabaseConfig(storageConfig.NewConfig())))
	notificationService := notification.NewNotificationService(notification.NewGmailRepository(notification.GmailConfig{}))
	inquiryService := inquiry.NewInquiryService(inquiry.NewInquiryRepository(db), notificationService)
	kittenService := kitten.NewKittenService(kitten.NewKittenRepository(db), storageService)
	authService := auth.NewAuthService(auth.NewAuthRepository(db))
	parentService := parent.NewParenttService(parent.NewParentRepository(db), storageService)
	adoptionSercice := adoption.NewAdoptionService(adoption.NewAdoptionRepository(db), storageService)
	breedService := breed.NewBreedService(breed.NewBreedRepository(db))
	colorService := color.NewColorService(color.NewColorRepository(db))
	newsService := news.NewNewsService(news.NewNewsRepository(db))

	// ビジネスロジックを各コマンドへ実装
	commands.RegisterCommands(kittenService, authService, parentService, adoptionSercice, breedService, colorService, newsService, inquiryService)

	// ルーターを初期化
	router := routes.InitializeRouter(apiConfig)

	// サーバーを起動
	log.Println("Server running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
