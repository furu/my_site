---
title: エラー通知システムの導入
---


**2014年4月2日に残してあったメモなので情報が古いはずです。**


何があるか
---

### 無料

* exception_nortification
  - メール通知のみ
* errbit

### 有料

* airbrake
* Exceptional.io
* Bugsnag
* Raygun


何を導入するか
---

errbit を使うことにした。errbit 側にエラーを投げる仕組みは、airbrake gem が使える。
heroku で動かしてみている。設定をしてみたが動かない。

### airbrake gem

https://github.com/airbrake/airbrake/blob/master/lib/airbrake/tasks.rb

にテスト用の rake タスクが定義されていてこれでテストすることができるっぽい。
コード見てみたら rails 用に書かれているっぽいので sinatra だとこのタスクは使えない。

https://github.com/airbrake/airbrake/wiki/Using-Airbrake-with-plain-Ruby

を見てプレーンな ruby コードで試してみると errbit 側に通知がいっていて動いていることを確認した。
errbit 側に問題はない。sinatra 側でうまく通知が動いていないっぽい。

ローカルで最小限の環境で試してみた。どうも development 環境だと airbrake は通知を送信しないらしい。
production にすると動作した。

ということは、本番環境で production になっていない？

本番環境でもう一度試してみると、動作しているようにみえる。
