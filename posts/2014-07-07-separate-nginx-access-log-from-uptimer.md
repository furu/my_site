---
title: 七夕分離ロガップタイマー
---

少し前から [Papertrail](https://papertrailapp.com) を使ってみている。

ずいぶんと前に広島Ruby勉強会で、@jmettraux さんが紹介しててそこで初めて存在を知ったという記憶がある。
探してみたら[あった](http://jmettraux.github.io/2013-03-04-papertrail.html)。

今まで全くログをどうにもこうにもしていなくて、時々 SSH でログインして tailf して眺めるとかしかやっていない。
そういう訳で Papertrail 機運が高まり使い始めた。簡単。

似たようなサービスに [loggy](https://www.loggly.com/) というものがあったのだけれど、登録が最高にめんどくさかったのでやめた。
loggy や New Relicの登録、会社名やら電話番号やら他にもいろいろ必須項目を入力しなくてはならなくて、本当に辛い。New Relic 使いたいんだけれど、挫折している。

Papertrail のことはまた今度いろいろ書くとして、Nginx のアクセスログと [Uptimer](https://uptimer.at/) の話を書く。

Uptimer は、登録した URL に対して1分間に1回 HEAD リクエストを投げて返ってきたステータスコードを見てサイトがダウンしていないかどうかをチェックしてくれる死活監視サービス（てきとう）。
[見た](https://uptimer.at/http://tfrkd.org/)ほうがはやい。

1分間に1回 Uptimer からアクセスが来るので、当然アクセスログが Uptimer で埋まる。悲しいｼｸｼｸ。
見づらいので、if ディレクティブを使って Uptimer のアクセスログは別のファイルに書くようにした。
if ディレクティブ、使い方わかっていなくて適切な設定なのかどうか不安になるけれど、うまく動いている。
[こういう記事](http://wiki.nginx.org/IfIsEvil)もあるしなぁ。

    location / {
        if ($http_user_agent = Uptimer) {
            access_log /var/log/nginx/uptimer-access.log;
        }
        proxy_pass http://tfrkd.org;
    }

何か proxy\_pass やら upstream の使い方にも不安が残る。

まあログ、すっきりした。
