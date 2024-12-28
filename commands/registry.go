package commands

import (
	"chm-api/internal/adoption"
	"chm-api/internal/auth"
	"chm-api/internal/breed"
	"chm-api/internal/color"
	"chm-api/internal/inquiry"
	"chm-api/internal/kitten"
	"chm-api/internal/news"
	"chm-api/internal/parent"
)

// ビジネスロジックをコマンドに登録
func RegisterCommands(kittenService kitten.KittenService, authService auth.AuthService, parentService parent.ParentService, adoptionService adoption.AdoptionService, breedService breed.BreedService, colorService color.ColorService, newsService news.NewsService, inquiryService inquiry.InquiryService) {
	commandMap := map[string]func() Command{
		// 認証関連のコマンド
		"CommandLoginUser":  func() Command { return auth.NewCommandLoginUser(authService) },
		"CommandCreateUser": func() Command { return auth.NewCommandCreateUser(authService) },

		// 子猫関連のコマンド
		"CommandGetKittens":      func() Command { return kitten.NewCommandGetKittens(kittenService) },
		"CommandGetKittenDetail": func() Command { return kitten.NewCommandGetKittenDetail(kittenService) },
		"CommandPostKitten":      func() Command { return kitten.NewCommandPostKitten(kittenService) },
		"CommandUpdateKitten":    func() Command { return kitten.NewCommandUpdateKitten(kittenService) },
		"CommandDeleteKitten":    func() Command { return kitten.NewCommandDeleteKitten(kittenService) },

		// 親猫関連のコマンド
		"CommandGetParentCats":      func() Command { return parent.NewCommandGetParentCats(parentService) },
		"CommandGetParentCatDetail": func() Command { return parent.NewCommandGetParentCatDetail(parentService) },
		"CommandPostParentCat":      func() Command { return parent.NewCommandPostParentCat(parentService) },
		"CommandUpdateParentCat":    func() Command { return parent.NewCommandUpdateParentCat(parentService) },
		"CommandDeleteParentCat":    func() Command { return parent.NewCommandDeleteParentCat(parentService) },

		// 里親関連のコマンド
		"CommandGetAdoptionCats":      func() Command { return adoption.NewCommandGetAdoptionCats(adoptionService) },
		"CommandPostAdoptionCat":      func() Command { return adoption.NewCommandPostAdoptionCat(adoptionService) },
		"CommandUpdateAdoptionCat":    func() Command { return adoption.NewCommandUpdateAdoptionCat(adoptionService) },
		"CommandDeleteAdoptionCat":    func() Command { return adoption.NewCommandDeleteAdoptionCat(adoptionService) },

		// 猫種関連のコマンド
		"CommandGetBreeds":   func() Command { return breed.NewCommandGetBreeds(breedService) },
		"CommandPostBreed":   func() Command { return breed.NewCommandPostBreed(breedService) },
		"CommandUpdateBreed": func() Command { return breed.NewCommandUpdateBreed(breedService) },
		"CommandDeleteBreed": func() Command { return breed.NewCommandDeleteBreed(breedService) },

		// 猫色関連のコマンド
		"CommandGetColors":   func() Command { return color.NewCommandGetColors(colorService) },
		"CommandPostColor":   func() Command { return color.NewCommandPostColor(colorService) },
		"CommandUpdateColor": func() Command { return color.NewCommandUpdateColor(colorService) },
		"CommandDeleteColor": func() Command { return color.NewCommandDeleteColor(colorService) },

		// ニュース関連のコマンド
		"CommandGetNews":    func() Command { return news.NewCommandGetNews(newsService) },
		"CommandPostNews":   func() Command { return news.NewCommandPostNews(newsService) },
		"CommandUpdateNews": func() Command { return news.NewCommandUpdateNews(newsService) },
		"CommandDeleteNews": func() Command { return news.NewCommandDeleteNews(newsService) },

		// 問い合わせ関連のコマンド
		"CommandPostBaseInquiry":       func() Command { return inquiry.NewCommandPostBaseInquiry(inquiryService) },
		"CommandPostInspectionInquiry": func() Command { return inquiry.NewCommandPostInspectionInquiry(inquiryService) },
	}

	// コマンド登録
	for commandName, commandFactory := range commandMap {
		RegisterCommand(commandName, commandFactory)
	}
}
