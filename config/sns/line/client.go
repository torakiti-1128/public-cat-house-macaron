package line

type Config struct {
	LineAPI         string
	LineNotifyToken string
}
// Supabaseの設定
func NewConfig() Config {
	return Config {
		LineAPI: "https://notify-api.line.me/api/notify",
		LineNotifyToken: "KYZXrxfxXLWEzpBinb9QVCIeYhOv5G8l9OkOYJk63NC",
	}
}
