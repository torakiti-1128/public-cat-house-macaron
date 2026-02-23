package commands

import (
	"fmt"
	"net/http"
	"sync"
)

// コマンドインターフェース
type Command interface {
	Execute(w http.ResponseWriter, r *http.Request)
}

var commandRegistry = make(map[string]func() Command)
var registryMutex = &sync.Mutex{}

// コマンドを登録
func RegisterCommand(name string, factory func() Command) {
	registryMutex.Lock()
	defer registryMutex.Unlock()
	commandRegistry[name] = factory
}

// コマンドを取得
func GetCommand(name string) (Command, error) {
	registryMutex.Lock()
	defer registryMutex.Unlock()
	if factory, exists := commandRegistry[name]; exists {
		return factory(), nil
	}
	return nil, fmt.Errorf("command not found: %s", name)
}
