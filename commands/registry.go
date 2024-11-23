package commands

import (
	"chm-api/internal/kitten"
)

// RegisterCommands サービスを注入してコマンドを登録
func RegisterCommands(kittenService kitten.KittenService) {
	RegisterCommand("CommandGetKittens", func() Command {
		return kitten.NewCommandGetKittens(kittenService)
	})
	RegisterCommand("CommandGetKittenDetail", func() Command {
		return kitten.NewCommandGetKittenDetail(kittenService)
	})
}
