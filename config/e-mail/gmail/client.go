package gmail

type Config struct {
	SMTPHost string
	SMTPPort string
	Username string
	Password string
}

// Gmailの設定
func NewConfig() Config {
	return Config{
		SMTPHost: "smtp.gmail.com",
		SMTPPort: "587",
		Username: "auto.inquiry.1128@gmail.com",
		Password: "/Dis0151128!",
	}
}
