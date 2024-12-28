package routes

import (
	"encoding/json"
	"os"
)

type Route struct {
	EndPoint   string `json:"endPoint"`
	Command    string `json:"command"`
	HttpMethod string `json:"httpMethod"`
}

type APIConfig struct {
	Routes []Route `json:"routes"`
}

// APIの設定ファイルを取得
func NewConfig(filename string) (APIConfig, error) {
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
