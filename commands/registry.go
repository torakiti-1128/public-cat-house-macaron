package commands

import (
	"chm-api/internal/auth"
	"chm-api/internal/breed"
	"chm-api/internal/color"
	"chm-api/internal/kitten"
	"chm-api/internal/news"
	"chm-api/internal/parent"
	"chm-api/internal/storage"
)

// ビジネスロジックをコマンドに登録
func RegisterCommands(kittenService kitten.KittenService, authService auth.AuthService, parentService parent.ParentService, storageService storage.StorageService, breedService breed.BreedService, colorServise color.ColorService, newsService news.NewsService) {
	RegisterCommand("CommandLoginUser", func() Command {
		return auth.NewCommandLoginUser(authService)
	})
	RegisterCommand("CommandCreateUser", func() Command {
		return auth.NewCommandCreateUser(authService)
	})
	RegisterCommand("CommandGetKittens", func() Command {
		return kitten.NewCommandGetKittens(kittenService)
	})
	RegisterCommand("CommandGetKittenDetail", func() Command {
		return kitten.NewCommandGetKittenDetail(kittenService)
	})
	RegisterCommand("CommandPostKitten", func() Command {
		return kitten.NewCommandPostKitten(kittenService, storageService)
	})
	RegisterCommand("CommandUpdateKitten", func() Command {
		return kitten.NewCommandGetKittenDetail(kittenService)
	})
	RegisterCommand("CommandDeleteKitten", func() Command {
		return kitten.NewCommandGetKittenDetail(kittenService)
	})
	RegisterCommand("CommandGetParentCats", func() Command {
		return parent.NewCommandGetParentCats(parentService)
	})
	RegisterCommand("CommandGetParentCatDetail", func() Command {
		return parent.NewCommandGetParentCatDetail(parentService)
	})
	RegisterCommand("CommandPostParentCat", func() Command {
		return parent.NewCommandPostParentCat(parentService, storageService)
	})
	RegisterCommand("CommandUpdateParentCat", func() Command {
		return parent.NewCommandUpdateParentCat(parentService)
	})
	RegisterCommand("CommandDeleteParentCat", func() Command {
		return parent.NewCommandDeleteParentCat(parentService)
	})
	RegisterCommand("CommandGetBreeds", func() Command {
		return breed.NewCommandGetBreeds(breedService)
	})
	RegisterCommand("CommandPostBreed", func() Command {
		return breed.NewCommandPostBreed(breedService)
	})
	RegisterCommand("CommandUpdateBreed", func() Command {
		return breed.NewCommandUpdateBreed(breedService)
	})
	RegisterCommand("CommandDeleteBreed", func() Command {
		return breed.NewCommandDeleteBreed(breedService)
	})
	RegisterCommand("CommandGetColors", func() Command {
		return color.NewCommandGetColors(colorServise)
	})
	RegisterCommand("CommandPostColor", func() Command {
		return color.NewCommandPostColor(colorServise)
	})
	RegisterCommand("CommandUpdateColor", func() Command {
		return color.NewCommandUpdateColor(colorServise)
	})
	RegisterCommand("CommandDeleteColor", func() Command {
		return color.NewCommandDeleteColor(colorServise)
	})
	RegisterCommand("CommandGetNews", func() Command {
		return news.NewCommandGetNews(newsService)
	})
	RegisterCommand("CommandPostNews", func() Command {
		return news.NewCommandPostNews(newsService)
	})
	RegisterCommand("CommandUpdateNews", func() Command {
		return news.NewCommandUpdateNews(newsService)
	})
	RegisterCommand("CommandDeleteNews", func() Command {
		return news.NewCommandDeleteNews(newsService)
	})
}
