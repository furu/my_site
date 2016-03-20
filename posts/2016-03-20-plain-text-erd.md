---
title: プレーンテキストでER図を書く
---

RDBのテーブル間の関係を把握するのにER図は便利です。ER図を書くためのツールはいろいろあると思いますが、プレーンテキストにさっと何か書いてそれをざっとER図生成プログラムに入力しどーんとそれなりの見た目でER図が生成されると便利です。

プレーンテキストでいろいろ図を書けるツールとして[PlantUML](http://plantuml.com/)があります。オープンセミナー2016@広島で知りました。しかし、PlantUMLではどうやらER図はサポートされていないみたいです。(他の図で代替するということはできるかもしれませんが。)

いろいろ探してみたところ[erd](https://github.com/BurntSushi/erd)というものを見つけたので、それを使ってみたいと思います。以下説明は雑です。


インストール
---

erdはHaskellとGraphvizを使ってつくられているので、stackとGraphvizをあらかじめインストールしておきます。

そして

```
$ stack install erd
```

としたところ

```
While constructing the BuildPlan the following exceptions were encountered:

--  Failure when adding dependencies:
      base: needed (==4.7.*), 4.8.2.0 found (latest applicable is 4.7.0.2)
    needed for package erd-0.1.3.0
```

と言われインストールできませんでした。stackのことはよくわからないので次の方法を試します。

```
$ git clone https://github.com/BurntSushi/erd.git
$ cd erd
$ stack init
$ stack build
$ stack exec erd -- --help
Usage: erd [flags]
  -i FILE  --input=FILE   When set, input will be read from the given file.
                          Otherwise, stdin will be used.
  -o FILE  --output=FILE  When set, output will be written to the given file.
                          Otherwise, stdout will be used.
                          If given and if --fmt is omitted, then the format will be
                          guessed from the file extension.
  -h       --help         Show this usage message.
  -f FMT   --fmt=FMT      Force the output format to one of:
                          bmp, dot, eps, gif, jpg, pdf, plain, png, ps, ps2, svg, tiff
```

というわけでerdを使えるようにはなったみたいです。


erdを使ってみる
---

それではerdを使ってみましょう。「達人に学ぶDB設計 徹底指南書」という本の第4章 ER図 ～複数テーブルの関係を表現する～ で説明のために取り上げられている「社員」テーブル、「会社」テーブル、「部署」テーブルのテーブル間の関係をerdで書いてみます。

```
# Entities
[社員]
*+会社コード
*社員ID
社員名
年齢
+部署コード

[会社]
*会社コード
会社名

[部署]
*部署コード
部署名

# Relationships
社員 *--1 会社
社員 +--1 部署
```

簡単に説明するとエンティティを書くには、エンティティの名前を角括弧中に書き、その下に属性を1行1つ羅列していきます。属性の先頭に`*`をつけると主キーとして表し、`+`をつけると外部キーを表すようです。エンティティ間の関連は、2つのエンティティの名前の間に`<カーディナリティを表す記号>--<カーディナリティを表す記号>`を記述します。

カーディナリティを表す記号としては以下のものが使えるようです。

```
Cardinality    Syntax
0 or 1         ?
exactly 1      1
0 or more      *
1 or more      +
```

これをcompany.erという名前でファイルに保存し、erdの入力に渡しPNGでER図を生成します。

```
$ stack exec erd -- -i company.er -o company.png
```

すると以下の画像が生成されました。マルチバイト文字でも大丈夫なようです。

![https://gyazo.com/7c975a47cd10fce2dce1678df57c3c29](https://i.gyazo.com/7c975a47cd10fce2dce1678df57c3c29.png)

READMEには、主キーの部分は下線が引かれて、外部キーの部分は斜体になると書いてあるんですがなりませんでした。[issue](https://github.com/BurntSushi/erd/issues/15)には上げられているんですがまだ対応はされていないようです。ここはちょっと残念ですね。

ここではPNG画像として出力しましたが、他にもbmp, dot, eps, gif, jpg, pdf, plain, ps, ps2, svg, tiffで出力できるっぽいです。

他にもタイトルをつけたり、背景色、文字色、フォントサイズなど見た目を変えることもできるようですね。

簡単に使ってみましたが、インストールが少しめんどくさいことと主キーに下線が引かれない、外部キーが斜体にならないことを除けばわりと良さそうだと思いました。
