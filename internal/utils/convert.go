package utils

import "strconv"

// 文字列を整数に変換
func ToInt(value string) int {
	intValue, _ := strconv.Atoi(value)
	return intValue
}
