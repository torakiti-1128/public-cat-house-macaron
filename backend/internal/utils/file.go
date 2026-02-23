package utils

import (
	"io"
	"os"
)

// 一時ファイルにデータを保存
func SaveTemporaryFile(file io.Reader) (string, error) {
	tempDir := os.TempDir()
	tempFile, err := os.CreateTemp(tempDir, "upload-*")
	if err != nil {
		return "", err
	}
	defer tempFile.Close()

	_, err = io.Copy(tempFile, file)
	if err != nil {
		return "", err
	}

	return tempFile.Name(), nil
}

// 一時ファイルを削除
func DeleteTemporaryFile(path string) {
	_ = os.Remove(path)
}
