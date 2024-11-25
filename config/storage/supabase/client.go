package supabase

type Config struct {
	SupabaseURL    string
	SupabaseAPIKey string
}

// Supabaseの設定
func NewConfig() Config {
	return Config{
		SupabaseURL:    "https://stmiseskirombbqtwacm.supabase.co",
		SupabaseAPIKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0bWlzZXNraXJvbWJicXR3YWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0MjI3ODEsImV4cCI6MjA0Nzk5ODc4MX0.2LR-ZFVpIJuPDmG8EROSwkFQS4ueFCZTnajlcUCoSCA",
	}
}
