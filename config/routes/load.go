package config

import (
	"encoding/json"
	"os"
)

// ルート設定を格納する構造体
type Route struct {
	EndPoint   string `json:"endPoint"`
	Command    string `json:"command"`
	HttpMethod string `json:"httpMethod"`
}

type APIConfig struct {
	Routes []Route `json:"routes"`
}

// APIの設定ファイルをロードする
func LoadConfig(filename string) (APIConfig, error) {
	var config APIConfig
	file, err := os.Open(filename)
	if err != nil {
		return config, err
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&config)
	return config, err
}
