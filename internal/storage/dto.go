package storage

type UploadFileDTO struct {
	Bucket   string `json:"bucket"`
	Path     string `json:"path"`
	FilePath string `json:"filePath"`
}

type UploadedFileDTO struct {
	PublicURL string `json:"publicUrl"`
	Bucket    string `json:"bucket"`
	Path      string `json:"path"`
}
