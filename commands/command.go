package commands

import (
	"net/http"
	"sync"
)

// Commandインターフェース
type Command interface {
	Execute(w http.ResponseWriter, r *http.Request)
}

// コマンドのレジストリ
var commandRegistry = make(map[string]func() Command)
var registryMutex = &sync.Mutex{}

// コマンドを登録する関数
func RegisterCommand(name string, factory func() Command) {
	registryMutex.Lock()
	defer registryMutex.Unlock()
	commandRegistry[name] = factory
	// fmt.Printf("Command registered: %s\n", name) // デバッグ用ログ
}

// コマンドを取得する関数
func GetCommand(name string) Command {
	registryMutex.Lock()
	defer registryMutex.Unlock()
	if factory, exists := commandRegistry[name]; exists {
		return factory()
	}
	// fmt.Printf("Invalid command requested: %s\n", name) // デバッグ用ログ
	return nil
}
