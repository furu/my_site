---
title: Closed issue furu/my_site#4
---

[Issue #4 furu/my_site](https://github.com/furu/my_site/issues/4)

遅い負債返却。ｱｲﾑｿｰﾘｰ､ｻﾑﾜﾝｲﾝﾁﾞｲﾝﾀｰﾈｯﾄ｡

server コンテキストにこれを書いた。

```
rewrite ^/posts/(.*)\.html$ /log/$1 permanent;
```

[これ](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite)を参考にした。
