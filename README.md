# 設計方針

- リンク欄からタップされた時の挙動は少しでも速くなるようにする
- できるだけアプリと近いような動きを目指す

## 変数名

| 変数名     | 用途                         | 例                   |
| ---------- | ---------------------------- | -------------------- |
| myId       | 自分の ID                    | saikai_official      |
| ViewUserId | 表示中ユーザーの ID          | middle_shizu         |
| email      | 自分の Google メールアドレス | saikai0011@gmail.com |
| job        | 自分の職業                   | 学生                 |
| name       | 自分のニックネーム           | さいかい             |

## DB (FireStore)

```json
{
  users: {
     saikai_official: {
        email : "saikai0011@gmail.com",
        name : "さいかい",
        job: "学生",
        places : {
          [randomID] : {
            name: "焼肉",
            month: 5,
            emoji: "0x1F37B",
          },
          ...
        },
        follows : {
          middle_shizu : {
            now : true,
          },
          ...
        },
        followers : {
          middle_shizu : {
            now : true,
          },
          ...
        },
    },
    ...
  },
}
```

### Instagram 基本表示 API

- https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-profiles-and-media
- https://developers.facebook.com/docs/instagram-basic-display-api/reference
- https://qiita.com/harapeko_momiji/items/446ab28c4f5c937d0962

### 今後実装

- 一つの email で複数のアカウントがあるかもしれないことを考慮する
- ポムの際に FireStore への通信が増えてしまう可能性がある
- 画像をアップロードして Rename してサイズを変えて保存
