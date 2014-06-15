---
title: hub コマンドの zsh 補完
---

昨日は一日中寝てたのでうける。

[hub](https://github.com/github/hub) コマンドの zsh 補完できるようになった。

約1年前に[この記事](http://tfrkd.org/log/2013-06-10-great-h-3)で hub コマンドのことを書いていた。この記事によると zsh の補完がうまくいっていなく、また今度調べればいいかーと書いた。それから約1年経っており、信用ならないという感想を抱いた。

補完が使えないということは補完に慣れた者にとって、やはり耐えがたいことであり、たぶんしばらくの間は hub コマンドを使っていたのだろうけれど、次第に使わなくなっていった。

しかし、最近また hub コマンド使用の機運が高まった。補完はもちろん使えない。

<blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/pecosantoyobe">@pecosantoyobe</a> hub.zsh_completionが使えない感じでしょうか?fpathの通ったところに_hubという名前でそのファイルを保存すればOKです。fpathについてはこことかが参考になります <a href="http://t.co/rLXhZScz7Y">http://t.co/rLXhZScz7Y</a>?補完ファイル</p>&mdash; mollifier (忍者) (@mollifier) <a href="https://twitter.com/mollifier/statuses/476698926897037312">2014, 6月 11</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

便利情報だ。mollifier さん、ありがとうございます。

fpath の設定を compinit を呼ぶ前に設定しなければならないというところにはまってしまったが、これで hub コマンドで zsh 補完ができるようになった。やったぜ。

fpath や compinit や zsh の補完について理解していないので、どこかのタイミングで学びたいものだ。応用効かないし。

今学べよという声が聞こえてきそうだ。

そういえば、`noop` オプションが便利だ。rsync の dry-run オプションみたいなもので、このオプションをつけておくと、実行するコマンドが何をするのか教えてくれる。安心感を得られる。Pull Request 先を間違えたくないしね。
