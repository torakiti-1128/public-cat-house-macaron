package storage

// アップロードデータ
type UploadFileDTO struct {
	Bucket   string `json:"bucket"`
	Path     string `json:"path"`
	FilePath string `json:"filePath"`
}

// アップロード後のデータ
type UploadedFileDTO struct {
	PublicUrl string `json:"publicUrl"`
	Bucket    string `json:"bucket"`
	Path      string `json:"path"`
}
