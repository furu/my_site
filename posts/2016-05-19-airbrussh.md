---
title: Capistrano のログが見やすくなるログフォーマッタ Airbrussh
---

[WikiHub](https://wikihub.io/) で利用されている Gemfile が公開されていたので眺めていた。数日前だけど。そこで初めて知ったのが [Airbrussh](https://github.com/mattbrictson/airbrussh) という gem で、これは Capistrano のログ出力をいいかんじにしてくれるログフォーマッタ。どんなかんじになるのかというと以下の画像のようなかんじになる。Airbrussh のリポジトリの README に GIF が貼ってあるのでそっちを見るのがわかりやすい。

[![https://gyazo.com/addfa6d27288967704a7af40f9ab1792](https://i.gyazo.com/addfa6d27288967704a7af40f9ab1792.png)](https://gyazo.com/addfa6d27288967704a7af40f9ab1792)

Airbrussh の README を読むと、Capistrano 3.5.0 でこの gem がバンドルされてデフォルトのフォーマッタになったと書いてあった。以前のフォーマットに戻すには、`deploy.rb` に `set :format, :pretty` を書けばよい。Airbrussh のフォーマットにすると詳細なログが省かれるんだけれど、詳細なログは `log/capistrano.log` に保存されるので詳細なログが見たい場合はそれを見ればよい。

Capistrano のログ、何となくかっこわるさを感じていたので、Airbrussh により何となくかっこよさが出てきたので `cap production deploy` 欲が湧いてきそう。`cap production deploy` 欲って意味不明だし、ログはかっこよさとかそういうためのものではない。

公開されている Gemfile を読むのはわりと楽しくて、Airbrussh 以外にも全然知らなかった gem が多くあったし楽しい。なるほど楽しいのか。WikiHub の他にも [Idobata](https://gist.github.com/kakutani/43b9f42197ab002fcdf8#file-gemfile) や [pplog](http://ppworks.hatenablog.jp/entry/2015/01/06/073003) の Gemfile も公開されていて興味深い。
