---
title: --[no-]rdoc と --[no-]ri は deprecation だって
---

    gem --version
    2.0.2

rdoc や ri などのドキュメント (他にもあるんかな) を生成したくないときに指定する
オプションの話。

\--document [TYPES] や -N, \--no-document を使いましょう。

つまり、

    gem --document <package> # ドキュメントを生成する。デフォルトっぽい。
    gem --document ri <package> # ri を生成する。
    gem --document rdoc <package> # rdoc を生成する。
    gem --document ri,rdoc <package> # ri, rdoc を生成する。
    gem --no-document <package> # ドキュメントを生成しない。
    gem -N <package> # ドキュメントを生成しない。

[TYPES] には、rdoc や ri や rdoc,ri みたいに指定できるんかな。複数指定したいと
きは、カンマ区切り？未検証なのでごみ記事に成り下がる。

(いつからかは知ら)ないです。
