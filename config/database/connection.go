package database

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

// DBの設定データ
type Config struct {
	Host     string
	Port     int 
	User     string 
	Password string
	DBName   string 
	SSLMode  string
}

// 環境変数から設定を読み込む
func NewConfig(path string) (Config, error) {
	var config Config

	// // .envファイルをロード
	// err := godotenv.Load(path)
	// if err != nil {
	// 	return config, fmt.Errorf("環境変数の読み込みに失敗しました: %v", err)
	// }

	// 環境変数から値を取得
	config.Host = os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	fmt.Sscanf(port, "%d", &config.Port)
	config.User = os.Getenv("DB_USER")
	config.Password = os.Getenv("DB_PASSWORD")
	config.DBName = os.Getenv("DB_NAME")
	config.SSLMode = os.Getenv("DB_SSLMODE")

	return config, nil
}


// DBの接続を作成
func NewDB(config Config) (*sql.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		config.Host, config.Port, config.User, config.Password, config.DBName, config.SSLMode,
	)

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return db, nil
}
