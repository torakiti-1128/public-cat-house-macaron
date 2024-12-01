package commands

import (
	"chm-api/internal/auth"
	"chm-api/internal/breed"
	"chm-api/internal/color"
	"chm-api/internal/kitten"
	"chm-api/internal/news"
	"chm-api/internal/parent"
)

// ビジネスロジックをコマンドに登録
func RegisterCommands(kittenService kitten.KittenService, authService auth.AuthService, parentService parent.ParentService, breedService breed.BreedService, colorService color.ColorService, newsService news.NewsService) {
	commandMap := map[string]func() Command{
		// Auth コマンド
		"CommandLoginUser":  func() Command { return auth.NewCommandLoginUser(authService) },
		"CommandCreateUser": func() Command { return auth.NewCommandCreateUser(authService) },

		// Kittenコマンド
		"CommandGetKittens":      func() Command { return kitten.NewCommandGetKittens(kittenService) },
		"CommandGetKittenDetail": func() Command { return kitten.NewCommandGetKittenDetail(kittenService) },
		"CommandPostKitten":      func() Command { return kitten.NewCommandPostKitten(kittenService) },
		"CommandUpdateKitten":    func() Command { return kitten.NewCommandUpdateKitten(kittenService) },
		"CommandDeleteKitten":    func() Command { return kitten.NewCommandDeleteKitten(kittenService) },

		// Parentコマンド
		"CommandGetParentCats":      func() Command { return parent.NewCommandGetParentCats(parentService) },
		"CommandGetParentCatDetail": func() Command { return parent.NewCommandGetParentCatDetail(parentService) },
		"CommandPostParentCat":      func() Command { return parent.NewCommandPostParentCat(parentService) },
		"CommandUpdateParentCat":    func() Command { return parent.NewCommandUpdateParentCat(parentService) },
		"CommandDeleteParentCat":    func() Command { return parent.NewCommandDeleteParentCat(parentService) },

		// Breedコマンド
		"CommandGetBreeds":   func() Command { return breed.NewCommandGetBreeds(breedService) },
		"CommandPostBreed":   func() Command { return breed.NewCommandPostBreed(breedService) },
		"CommandUpdateBreed": func() Command { return breed.NewCommandUpdateBreed(breedService) },
		"CommandDeleteBreed": func() Command { return breed.NewCommandDeleteBreed(breedService) },

		// Colorコマンド
		"CommandGetColors":   func() Command { return color.NewCommandGetColors(colorService) },
		"CommandPostColor":   func() Command { return color.NewCommandPostColor(colorService) },
		"CommandUpdateColor": func() Command { return color.NewCommandUpdateColor(colorService) },
		"CommandDeleteColor": func() Command { return color.NewCommandDeleteColor(colorService) },

		// Newsコマンド
		"CommandGetNews":    func() Command { return news.NewCommandGetNews(newsService) },
		"CommandPostNews":   func() Command { return news.NewCommandPostNews(newsService) },
		"CommandUpdateNews": func() Command { return news.NewCommandUpdateNews(newsService) },
		"CommandDeleteNews": func() Command { return news.NewCommandDeleteNews(newsService) },
	}

	// コマンド登録
	for commandName, commandFactory := range commandMap {
		RegisterCommand(commandName, commandFactory)
	}
}
