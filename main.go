package main

import (
	"log"
	"net/http"

	dbConfig "chm-api/config/database"
	emailConfig "chm-api/config/e-mail/gmail"
	apiConfig "chm-api/config/routes"
	snsConfig "chm-api/config/sns/line"
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
	"chm-api/internal/utils"
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

	// Repositoryインスタンスの生成
	supabaseRepo := storage.NewSupabaseRepository(storage.SupabaseConfig(storageConfig.NewConfig()))
	gmailRepo := notification.NewGmailRepository(notification.GmailConfig(emailConfig.NewConfig()))
	lineRepo := notification.NewLineRepository(notification.LineConfig(snsConfig.NewConfig()))
	inquiryRepo := inquiry.NewInquiryRepository(db)
	kittenRepo := kitten.NewKittenRepository(db)
	authRepo := auth.NewAuthRepository(db)
	parentRepo := parent.NewParentRepository(db)
	adoptionRepo := adoption.NewAdoptionRepository(db)
	breedRepo := breed.NewBreedRepository(db)
	colorRepo := color.NewColorRepository(db)
	newsRepo := news.NewNewsRepository(db)

	// Serviceインスタンスの生成
	storageService := storage.NewStorageService(supabaseRepo)
	notificationService := notification.NewNotificationService(gmailRepo, lineRepo)
	inquiryService := inquiry.NewInquiryService(inquiryRepo, notificationService, utils.NewMessageFormatter())
	kittenService := kitten.NewKittenService(kittenRepo, storageService)
	authService := auth.NewAuthService(authRepo)
	parentService := parent.NewParentService(parentRepo, storageService)
	adoptionService := adoption.NewAdoptionService(adoptionRepo, storageService)
	breedService := breed.NewBreedService(breedRepo)
	colorService := color.NewColorService(colorRepo)
	newsService := news.NewNewsService(newsRepo)

	// ビジネスロジックをコマンドへ実装
	commands.RegisterCommands(
		kittenService, 
		authService, 
		parentService, 
		adoptionService, 
		breedService, 
		colorService, 
		newsService, 
		inquiryService,
	)

	// エンドポイントのルーターを設定
	router := routes.InitializeRouter(apiConfig)

	// サーバーを起動
	log.Println("Server running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
