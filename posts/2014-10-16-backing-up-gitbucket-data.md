---
title: Backing up GitBucket data
---

どういう環境で動作させているの？
---

以下、かなり適当に列挙している。

* Debian 7.6
* GitBucket 2.2.1
* サーバーは、Tomcat7 (tomcat7 ユーザ権限で動作させている)
* GitBucket のデータは、`/usr/share/tomcat7/.gitbucket` に保存されているが、
  このディレクトリは `/var/lib/gitbucket` へのシンボリックリンクにしているので、
  実際は `/var/lib/gitbucket` にデータが保存されている。
* [furu/gitbucket-cookbook](https://github.com/furu/gitbucket-cookbook) を使ってインストールしている


どうバックアップすればいいの？
---

[takezoe/gitbucket](https://github.com/takezoe/gitbucket) の README.md に

> All GitBucket data is stored in HOME/.gitbucket.
> So if you want to back up GitBucket data, copy this directory to the other disk.

とあるので、今回の場合は `/var/lib/gitbucket` をどこか別のディスクにコピーするだけでバックアップはできるっぽい。

GitBucket 起動中にファイルをコピーするとデータに不整合が生じそうなので、GitBucket を停止させてからやったほうがよさそう。


で？
---

バックアップは1日1回取り、3日分残すことにする。
バックアップスクリプトを作って、それを cron でスケジューリングする。
1日1回なので、`/etc/cron.daily` に作ったスクリプトをつっこんでおけばいいや。
バックアップ先は `/var/backups/gitbucket` にして、ファイル名は `gitbucket-20141016.tar.gz` みたいなかんじで。

バックアップスクリプト

<script src="https://gist.github.com/furu/4b1e6eb3206741590c7e.js"></script>

tar より afio を使った方が良いという記事がヒットする。あんまり良くないんだろうけれど、tar 使います。


リストア
---

意気揚々とリストアしたらエラーが発生した。
例えばログインしようとすると「データベース読み取り専用なんすけど」というエラーが発生する。

```
# おれは root だ

$ service tomcat7 stop

$ cd /var/backups/gitbucket

$ tar xf gitbucket-20141016.tar.gz --directory /tmp

$ rm -rf /var/lib/gitbucket

$ cp -r /tmp/gitbucket /var/lib/gitbucket

$ rm -rf /tmp/gitbucket

$ service tomcat7 start
```

のようなデンジャラスかもしれないオペレーションをしたわけです。


### 原因

cp でファイルを配置した際に適切な所有者とグループが設定されていないのが原因だった。
root で何も考えずに cp するとそのファイルの所有者とグループが root になってしまう。

今回の場合、GitBucket を tomcat7 ユーザ権限の Tomcat で動作させているため、ファイルに書き込むことができなくなってしまっていた。

tar で固めて圧縮した際や展開した際にパーミッションやら所有者の情報はどうなっているんだと思って調べてみると、tar はスーパーユーザで実行するとデフォルトで固める際も展開する際もパーミッションや所有者情報を保持するようだ。


### かいけつゾロリ

* tar で展開先を指定できるのだから、`/var/lib/gitbucket` を消して `/var/lib` にそのまま展開する
* cp に `-p` オプションをつけて、パーミッションやら所有者情報を保持させる


### 参考

* http://sugargoodman.hatenablog.com/entry/2013/03/29/225444


初心者バックアッパーなので、これが限界です。

こういうかんじのバックアップをする際は、tar と find 使えばよいのかということがわかった。
