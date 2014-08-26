---
title: git-commit-autouser についてのメモ
---

[ryotarai/git-commit-autouser](https://github.com/ryotarai/git-commit-autouser)

これまた git-commit-autouser について、いつ書いたかわからないメモがあったので吐い出しておく。
だいぶ前に使ったような気がするので情報が古い場合がある。


問題
---

会社とプライベートでは、user.name と user.email が異なる。会社でプライベートで使っているリポジトリにコミットすると、会社の user.name と user.email が使われてしまう。リポジトリのローカルの設定に name と email を設定すればよいが、高確率で忘れる。


git-commit-autouser
---

remote origin の URL を見て commiter あるいは author の名前とメールアドレスを切り替える。
commit コマンドのラッパーとして使われる。

### 感想

* origin の URL が設定されていない、つまり、git init してリポジトリがローカルにしかない場合、これを使ってコミットできない。
  "remote `origin` is not configured" と言われて終わる。
* origin が設定されていても、git-commit-autouser の設定がされていない場合、例外が吐かれて死ぬ。
* 設定に url-regexp とあり、そこにマッチングさせる URL を指定する
* 自分の場合、commit コマンドを ci にエイリアスしていて、git-commit-autouser を使う場合でも ci を使いたいが、
  他のエイリアスにした方がよいかもしれない。ca とか。しかしそうすると、会社と家でコミットのコマンドを使う際に
  コンテキストスイッチが発生して、精神衛生がよくないかもしれない
* 補完がきかなくなるので悲しい…


現在は、使っていない。
