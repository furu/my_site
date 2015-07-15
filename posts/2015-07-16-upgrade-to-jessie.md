---
title: jessie へ上げた
---

このサイトのサーバの OS は Debian GNU/Linux で、wheezy だったので数日前に jessie に上げた。そんなにいろいろなことをしているわけではないので、アップグレード作業は大変ではなかった。[このページ](https://www.debian.org/releases/jessie/amd64/release-notes/index.ja.html)とか、「debian jessie upgrade」でぐぐって出てきた他の人のアップグレードの記録なんかを参考にした。

数ヶ月前は、構成管理が何じゃー、infrastructure as code がどうとか、itamae がーとか Serverspec でテストがどうとか言っていたのだけれど、最近あまりにもそれらに触れていない。このサーバも特には、そういったツールで管理しているわけではなかったのだけれど、今回の jessie へのアップグレードの際に Serverspec でテストくらいは書いてみておくかーと思い書いた。

* https://github.com/furu/tfrkd.org-infra
