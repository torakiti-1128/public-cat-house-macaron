package inquiry

import "database/sql"

// ToDo：20241220
// DBに問い合わせを保存する予定、現在は必要ない
// 問い合わせ関連のDBインターフェース
type InquiryRepository interface {

}

// 問い合わせ関連のDB実装
type InquiryRepositoryImpl struct {
	DB *sql.DB
}

// 問い合わせ関連のDBコンストラクタ
func NewInquiryRepository(db *sql.DB) InquiryRepository {
	return &InquiryRepositoryImpl{DB: db}
}