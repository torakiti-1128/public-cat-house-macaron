概要
cat-house-macaron-apiは、猫の詳細情報、子猫リスト、および関連データを管理するAPIサーバーです。  
このプロジェクトは **Go 言語** で構築されており、依存性注入（DI）とクリーンアーキテクチャを採用しています。


## **目次**

- [特徴](#特徴)
- [技術スタック](#技術スタック)
- [プロジェクト構成](#プロジェクト構成)
- [セットアップ](#セットアップ)
- [エンドポイント一覧](#エンドポイント一覧)
- [今後の改善](#今後の改善)

---

## **特徴**

1. RESTful API 構築
   - 子猫リスト取得
   - 子猫詳細取得
   - 新しい子猫データの登録・更新・削除
2. **依存性注入（DI）** による柔軟な設計
3. **PostgreSQL** を使用したリレーショナルデータベース管理
4. **GORILLA/MUX** によるルーティング処理
5. JSON フォーマットでのクライアントレスポンス

---

## **技術スタック**

- **言語**: Go (Golang)
- **データベース**: PostgreSQL
- **ルーティング**: Gorilla/Mux
- **依存性注入**: コンストラクタによる注入
- **JSON ハンドリング**: 標準ライブラリ `encoding/json`

---

## **プロジェクト構成**

```
cat-house-macaron-api/
├── commands/             # コマンドとルーティングの実装
│   ├── command.go        # コマンドのインターフェース定義
│   ├── registry.go       # コマンド登録用ロジック
│   └── kitten/           # 子猫コマンド（GET, POST, DELETE など）
├── config/               # 設定ファイル関連
│   ├── database/         # データベース設定
│   │   ├── settings.json # DB 設定ファイル
│   │   └── connection.go # DB 接続ロジック
│   ├── routes/           # API エンドポイント設定
│   │   ├── settings.json # ルーティング設定ファイル
│   │   └── load.go       # 設定ファイル読み込みロジック
├── internal/             # ドメインロジック
│   ├── kitten/           # 子猫のサービス・リポジトリ・DTO
├── routes/               # ルーティングの初期化
│   └── routes.go
├── main.go               # エントリーポイント
└── go.mod                # Go モジュール設定
```

---

## **セットアップ**

### 1. **クローン**

```bash
git clone https://github.com/<username>/cat-house-macaron-api.git
cd cat-house-macaron-api
```

### 2. **依存関係のインストール**

```bash
go mod tidy
```

### 3. **データベースのセットアップ**

1. PostgreSQL サーバーをインストールし、起動します。
2. `config/database/settings.json` に適切な設定を入力します。
3. 以下のコマンドでデータベースを作成します。

```sql
CREATE DATABASE cat_house_macaron_db;
```

### 4. **API サーバーの起動**

```bash
go run main.go
```

---

## **エンドポイント一覧**

### 子猫関連

| メソッド | エンドポイント        | 説明                         |
|----------|-----------------------|------------------------------|
| `GET`    | `/api/v1/kittens`     | 子猫のリストを取得する       |
| `GET`    | `/api/v1/kittens/{id}`| 指定された子猫の詳細を取得   |
| `POST`   | `/api/v1/kittens`     | 子猫情報を登録する           |
| `PUT`    | `/api/v1/kittens/{id}`| 指定された子猫の情報を更新   |
| `DELETE` | `/api/v1/kittens/{id}`| 指定された子猫を削除する     |

### その他
`routes/settings.json` を参照してください。
