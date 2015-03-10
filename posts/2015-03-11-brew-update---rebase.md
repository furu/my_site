---
title: '~/.gitconfig に merge.ff = false を設定していて brew update でいちいち merge commit ができてしまうのに飽きてしまったときにとりあえずやるやつ'
---

```
$ brew --version
0.9.5
```

.gitconfig に merge.ff = false を設定していると merge する際に fast-forward でも merge commit を作るようになる。

Homebrew を更新するときには brew update というコマンドを実行するのだけれど、こいつは内部的に git pull を実行する。git pull は、git fetch して git merge するようなかんじなので、上述したように merge.ff = false を .gitconfig に設定していると brew update の度に merge commit を作ってしまいエディタが立ち上がってしばらくすると飽きる。

brew update の際に merge commit を作らないようにするには、Homebrew の Git リポジトリの .git/config に何か設定を書けばよいのだろうと思って git help config をしたのだけれど、どれを設定するのが適切なのかよくわからない。そのためとりあえずの対応策を次に書く。

brew update --rebase を実行すればよい。そうすれば git pull --rebase を内部的には実行してくれるようになる。git pull --rebase は、git fetch して git rebase するようなかんじになる。これは man brew の update のところに記述が書いてあるし、どう実装されているのかは[ここら辺](https://github.com/Homebrew/homebrew/blob/b19824b3d8f0c89b0b47153242f362fcfec5ad90/Library/Homebrew/cmd/update.rb#L144)を見ればわかる。

しかし brew udpate でやっていきたいと思うし、.git/config に何か設定して打開したい。
