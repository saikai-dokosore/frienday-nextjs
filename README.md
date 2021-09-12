# 設計方針

1. リンク欄からタップされた時の挙動は少しでも速くなるようにする
2. できるだけアプリと近いような動きを目指す

## フロントエンド

### StaticBuild したい内容

- Path

### グローバルで持ちたい変数

- ログイン情報
  - currentUser
- 自分のアカウントの情報（色んなところで使う & State に入れることで編集がすぐに反映される）
  - myId
  - name
  - email
  - job
  - job
  - bio
  - ImageUrl?

### 変数名

| 変数名     | 用途                         | 例                   |
| ---------- | ---------------------------- | -------------------- |
| myId       | 自分の ID                    | saikai_official      |
| viewUserId | 表示中ユーザーの ID          | middle_shizu         |
| email      | 自分の Google メールアドレス | saikai0011@gmail.com |
| job        | 自分の職業                   | 学生                 |
| name       | 自分のニックネーム           | さいかい             |

### リーダブルコード

> [変数などによく使う英単語](https://qiita.com/Ted-HM/items/7dde25dcffae4cdc7923#%E9%96%93%E9%81%95%E3%81%84%E3%82%84%E3%81%99%E3%81%84%E8%A8%80%E8%91%89)

| 変数名         | 用途                         |
| -------------- | ---------------------------- |
| tmp            | ループなどでの一時的な代入   |
| i,j,k          | ループのイテレータ           |
| user_i, user_k | ループのイテレータ           |
| start_ms       | ミリ秒                       |
| \_id           | 一時的に id を置き換えるもの |

- `// TODO : ここの関数を綺麗にする`みたいなコメントは後から直すところ
- 説明変数と要約変数を使う
- 最初にグローバルで使いたい変数（ログイン情報など）を全て洗い出して、そこから定義していく
- それ以外の変数はスコープをできるだけ短くすることで、同じ単語でも後から使えるようにする
- 関数でやりたいことを日本語で書き出してみる（一つのタスクごとに切り分けてみる）

## DB (FireStore)

```json
{
  "users": {
    "saikai_official": {
      "email": "saikai0011@gmail.com",
      "name": "さいかい",
      "places": {
        "[randomID]": {
          "name": "#表参道カフェ",
          "[randomID]": {
            "middle_shizu": {
              "messages": "テニサーで行こう！",
              "created_at": "2021-09-12",
            }
            "// 1,2個くらいのはず"
          }
        }
        "// placeが5個くらい"
      },
      "follows": {
        "middle_shizu": {
          "num": 12
        }
        "// 要するにポムなので5~10人くらい"
      },
      "followers": {
        "middle_shizu": {
          "num": 50
        }
        "// ポムられている人も多くて5人くらい"
      }
    }
    "// ユーザーはIDを固有のものとして10万人くらい"
  }
}
```

### 今後実装

- 一つの email で複数のアカウントがあるかもしれないことを考慮する
- 全ページ戻るボタン
- ポムの際に FireStore への通信が増えてしまう可能性がある
- 画像をアップロードして Rename してサイズを変えて保存[画像](https://zenn.dev/fujiyama/articles/50b0a73acd89b7)
- [Falling Balls](https://codepen.io/asha23/pen/rewmp)
- [ハッシュタグ検索](https://developers.facebook.com/docs/instagram-api/guides/hashtag-search)
- Good 関係を後から admin 用に記録していくシステム

### Instagram 基本表示 API

- https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-profiles-and-media
- https://developers.facebook.com/docs/instagram-basic-display-api/reference
- https://qiita.com/harapeko_momiji/items/446ab28c4f5c937d0962
