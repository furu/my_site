---
title: auto_gem なんとかかんとかではまったらこれ見ろ
---

前々回もはまったので、自分のためにメモ。Twitter 貼り付け。

<blockquote class="twitter-tweet" lang="ja"><p>gentoo prefix (portage) を使っていると heroku toolbelt のような ruby をバンドルしているものを使う際、auto_gem がロードできないー助けてくれーと言われはまる。</p>&mdash; furu (@pecosantoyobe) <a href="https://twitter.com/pecosantoyobe/statuses/451031167865585666">2014, 4月 1</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="ja"><p>auto_gem は、中で require &#39;rubygems&#39; をしているだけのもので、portage を使っていると RUBYOPT 環境変数に -rauto_gem が設定される。</p>&mdash; furu (@pecosantoyobe) <a href="https://twitter.com/pecosantoyobe/statuses/451031546225360896">2014, 4月 1</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="ja"><p>require &#39;rubygems&#39; が必要なのは、ruby 1.9 以前までだったはずだったので、auto_gem と RUBYOPT に -rauto_gem を設定するのはもうやめてくれー</p>&mdash; furu (@pecosantoyobe) <a href="https://twitter.com/pecosantoyobe/statuses/451031904272142336">2014, 4月 1</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

これで大丈夫だろ。ヘーキ、ヘーキ。
