package line

type Config struct {
	LineAPI         string
	LineNotifyToken string
}
// Supabaseの設定
func NewConfig() Config {
	return Config {
		LineAPI: "https://notify-api.line.me/api/notify",
		LineNotifyToken: "ItQMmmLnuxDYqScQk5WbvsuLPeSNJQjNj4GYLG1eRAD",
	}
}
