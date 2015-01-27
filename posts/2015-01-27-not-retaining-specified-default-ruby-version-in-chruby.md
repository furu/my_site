---
title: "chruby で .ruby-version のあるディレクトリから外れるとシステムの Ruby になる問題"
---

chruby 0.3.9 の話。

tl;dr: `echo 2.2.0 > ~/.ruby-version` みたいな workaround でだいたい回避できる。

chruby は、使用する Ruby や RubyGems の環境の切り替えを管理するツール。似たようなものに RVM や rbenv がある。どちらかというと、これらの方が有名でユーザも多いはず。

RVM や rbenv では、`.ruby-version` というファイルを検知して、そのファイルに書かれている Ruby のバージョンに自動で切り替えてくれる機能がある。chruby にも同じ機能があって、その機能を使っている際にこの記事のタイトルのような問題に遭遇した。.ruby-version については、https://gist.github.com/fnichol/1912050 に書かれている。

問題について説明する。

例えば、デフォルトで使用したい Ruby のバージョンを 2.2.0 にしたとする。これは、.zshrc などに `chruby 2.2.0` と記述することで指定することができる。そしてある dog-project というディレクトリにカレントディレクトリを変更したとしよう。このプロジェクトでは、Ruby 2.1.5 を使用することになっていて 2.1.5 と書かれた .ruby-version がプロジェクトのトップディレクトリに置かれている。そうすると chruby の機能によって今までは Ruby 2.2.0 の環境を使用することになっていたが、Ruby 2.1.5 の環境を使用するように切り替えられる。このプロジェクトのディレクトリ以下のどこでも .ruby-version で指定された Ruby 2.1.5 を使用できる。これは期待した動作だ。しかし、このプロジェクトのディレクトリ以外、例えば親ディレクトリにカレントディレクトリを変更すると期待していない挙動を chruby は示す。期待したことは、使用する Ruby の環境がデフォルトとして指定していた Ruby 2.2.0 になることだ。しかし、その予想に反して使用する Ruby がシステムのものになってしまう。

この問題についてはだいぶ前に chruby の GitHub の issue に挙がっている。

https://github.com/postmodern/chruby/issues/184

この issue に、chruby 0.4.0 にはデフォルトとして指定した Ruby を保持するような動作になる予定と書かれていて、じゃあ、それまではどうしたらいいのかということに対しては、ホームディレクトリにデフォルトで使用する Ruby のバージョンを記述した .ruby-version を配置するという workaround が書かれている。

注意しなければならないのは、この workaround はホームディレクトリ以下にいる場合でのみ有効で、ホームディレクトリより上の階層では意味がなくなるという点だ。

```
$ pwd
/Users/furu

$ echo 2.2.0 > .ruby-version

$ mkdir dog-project; cd dog-project
$ echo 2.1.5 > .ruby-version
$ ruby -v
ruby 2.1.5p273 (2014-11-13 revision 48405) [x86_64-darwin14.0]

$ cd ..
$ ruby -v
ruby 2.2.0p0 (2014-12-25 revision 49005) [x86_64-darwin14]

# OK! :)

$ cd /tmp
$ ruby -v
ruby 2.0.0p481 (2014-05-08 revision 45883) [universal.x86_64-darwin14]

# Bad... :(
```

これは chruby が .ruby-version の探索をカレントディレクトリから上の階層に向かって再帰的にしていって見つかったものを使用するという実装になっているから。そのためどのディレクトリにおいても適用させようとするとルートディレクトリに .ruby-version を置いておくのがよいのかもしれない。
