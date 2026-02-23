package utils

import (
	"fmt"
	"strings"
)

type MessageFormatter interface {
	Format(data map[string]string) string
}

type DefaultMessageFormatter struct{}

func NewMessageFormatter() MessageFormatter {
	return &DefaultMessageFormatter{}
}

func (f *DefaultMessageFormatter) Format(data map[string]string) string {
	var message strings.Builder

	// 最初に改行を入れる
	message.WriteString("\n\n")
	message.WriteString("-----------------------------\n")

	for key, value := range data {
		// 項目を整形して追加
		message.WriteString(fmt.Sprintf("・%s:\n%s\n", key, value))
		message.WriteString("-----------------------------\n")
	}

	// 最後の区切り線を削除して終了
	finalMessage := strings.TrimSuffix(message.String(), "-----------------------------\n")
	message.Reset()
	message.WriteString(finalMessage)

	// 末尾に改行を追加
	message.WriteString("\n\n======================\n")

	return message.String()
}