package commands

import (
	"chm-api/internal/auth"
	"chm-api/internal/kitten"
	"chm-api/internal/parent"
	"chm-api/internal/storage"
)

// ビジネスロジックをコマンドに登録
func RegisterCommands(kittenService kitten.KittenService, authService auth.AuthService, parentServise parent.ParentService, storageService storage.StorageService) {
	RegisterCommand("CommandGetKittens", func() Command {
		return kitten.NewCommandGetKittens(kittenService)
	})
	RegisterCommand("CommandGetKittenDetail", func() Command {
		return kitten.NewCommandGetKittenDetail(kittenService)
	})
	RegisterCommand("CommandPostKitten", func() Command {
		return kitten.NewCommandPostKitten(kittenService, storageService)
	})
	RegisterCommand("CommandLoginUser", func() Command {
		return auth.NewCommandLoginUser(authService)
	})
	RegisterCommand("CommandCreateUser", func() Command {
		return auth.NewCommandCreateUser(authService)
	})
	RegisterCommand("CommandGetParentCats", func() Command {
		return parent.NewCommandGetParentCats(parentServise)
	})
	RegisterCommand("CommandGetParentCatDetail", func() Command {
		return parent.NewCommandGetParentCatDetail(parentServise)
	})
	RegisterCommand("CommandPostParentCat", func() Command {
		return parent.NewCommandPostParentCat(parentServise, storageService)
	})
}
