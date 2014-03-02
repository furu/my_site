---
title: OS X を Lion から Mavericks にした
---

昨日の土曜日にやっとアップグレードした。

<a href="http://gyazo.com/cfcf1d153aad16ab550c93f7018cdbf2">
  <img src="http://embed.gyazo.com/cfcf1d153aad16ab550c93f7018cdbf2.png" />
</a>

もう2014年の3月で Mavericks が発売されて結構経っているし、もうそろそろ Gentoo Prefix もうまく動作するのではないかと適当な推測の元、実行に移した。

気分的にクリーンインストールした。そうする必要はないのかもしれないけれど。

特に問題もなくアップグレードでき、Mavericks は今のところうまく動作している。

それで肝心の Gentoo Prefix だが、うまくインストールできた。ビルドも問題なくできるし、動作もできている。

<a href="http://gyazo.com/7baa334ab0b3fe605208385079711188">
  <img src="http://embed.gyazo.com/7baa334ab0b3fe605208385079711188.png" />
</a>

少し前、まだ Lion だったときに Gentoo Prefix を入れなおしたことがあったのだけど、そのときの経験を活かした。そのときの作業ログを Togetter にまとめている。

[#gentooprefixinstallbattle 作業ログ](http://togetter.com/li/636607)

ポイントは、startprefix というファイルの修正で、これは Gentoo Prefix の環境に入るために使われるシェルスクリプトになっている。

<script src="https://gist.github.com/furu/9305937.js"></script>

このファイルの43行目の env コマンドの中に環境変数 LANG を指定する。

修正前のスクリプトで Gentoo Prefix 環境に入ると元の LANG が引き継がれず空になってしまい、理由がよくわかっていないのだけれど、そのままビルドをするとビルドに失敗するという現象にあった。

あとはこれを参照したかな。すごい広島の話で関係のない話になるけれど、Issue に書いておくだけだと後から参照しにくい。検索もできなかったような気もするし。

[すごい広島 #36 でやること · Issue #595 · great-h/great-h.github.io](https://github.com/great-h/great-h.github.io/issues/595)

うまく動作しているので、OS X で Gentoo Prefix 使っている人 Mavericks にアップグレードしてみてはいかがでしょうか。
