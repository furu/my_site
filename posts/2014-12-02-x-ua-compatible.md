---
title: X-UA-Compatible
---


`<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">`


常に最新版 IE のレンダリングにし、chrome frame (IEのプラグイン) が使用できるのであれば使用する。
バリデーターにかけると invalid になる。
head 要素の一番上か charset の下に置くのが望ましく、外部ソースを読む要素の下に置くと機能しないらしい。

http://www.validatethis.co.uk/news/fix-bad-value-x-ua-compatible-once-and-for-all/
