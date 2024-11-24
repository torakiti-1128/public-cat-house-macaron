package supabase

type Config struct {
	SupabaseURL    string
	SupabaseAPIKey string
}

func NewClient() Config {
	return Config{
		SupabaseURL:    "https://your-project.supabase.co",
		SupabaseAPIKey: "your-api-key",
	}
}
