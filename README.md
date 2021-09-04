# Frienday

## 実装したい機能

- OGP 自動生成
- 絵文字デザイン

## ここから実装すること

- データベースの中の名前の部分だけ先に静的ジェネレイトしておく？

## MVP01

- 自分も作るボタン（新規登録）
- プロフィール
- 行きたいところ・誘うボタン
- ポム
- （右上通知）
- データベースは仮のもの
- 電話番号とパスワードは保管しない
- 複数人用にコメントを付けれるように「〇〇グループで」
- （編集画面）

### Instagram 基本表示 API

- https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-profiles-and-media
- https://developers.facebook.com/docs/instagram-basic-display-api/reference
- https://qiita.com/harapeko_momiji/items/446ab28c4f5c937d0962

### 今後

- 一つの email で複数のアカウントがあるかもしれないことを考慮する
- ポムの際に FireStore への通信が増えてしまう可能性がある
- 画像をアップロードして Rename してサイズを変えて保存
