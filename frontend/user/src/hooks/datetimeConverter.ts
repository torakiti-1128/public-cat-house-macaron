// ISO形式の日時を「◯年◯月◯日」に置き換える関数
export function formatDateTimeToJapanese(dateTime: string): string {
  try {
    const date = new Date(dateTime)
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1 // 月は0から始まるため+1
    const day = date.getUTCDate()
    return `${year}年${month}月${day}日`
  } catch (error) {
    console.error('日時のフォーマットに失敗しました:', error)
    return ''
  }
}

// ISO形式の日付（YYYY-MM-DD）を「◯年◯月◯日」に置き換える関数
export function formatDateToJapanese(dateString: string): string {
  try {
    const [year, month, day] = dateString.split('-').map(Number)
    return `${year}年${month}月${day}日`
  } catch (error) {
    console.error('日付のフォーマットに失敗しました:', error)
    return ''
  }
}
