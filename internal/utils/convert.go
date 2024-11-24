package utils

import "strconv"

// toInt - 文字列を整数に変換。失敗時は 0 を返す。
func ToInt(value string) int {
	intValue, _ := strconv.Atoi(value)
	return intValue
}
