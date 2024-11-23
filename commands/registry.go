package commands

import (
	"chm-api/internal/auth"
	"chm-api/internal/kitten"
)

// サービスを注入してコマンドを登録
func RegisterCommands(kittenService kitten.KittenService, authService auth.AuthService) {
	RegisterCommand("CommandGetKittens", func() Command {
		return kitten.NewCommandGetKittens(kittenService)
	})
	RegisterCommand("CommandGetKittenDetail", func() Command {
		return kitten.NewCommandGetKittenDetail(kittenService)
	})
	RegisterCommand("CommandLoginUser", func() Command {
		return auth.NewCommandLoginUser(authService)
	})
	RegisterCommand("CommandCreateUser", func() Command {
		return auth.NewCommandCreateUser(authService)
	})
}
