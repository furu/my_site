---
title: 上下左右中央に配置する CSS に関する記録
---

4つ発見した。書きなぐりです。信頼性は低い。

display: table-cell なやつ
---

* http://qiita.com/kaiinui/items/ba9b58b53556c1f79cf8
* http://qiita.com/reneice/items/f4dbe556c0652041e434
* http://qiita.com/gonshi_com/items/4f70578e666109208185
* http://qiita.com/Shadow/items/6ce990937b3124812d50
* http://qiita.com/matsui_q/items/9de76659429593ed7a88#css-%E4%B8%8A%E4%B8%8B%E4%B8%AD%E5%A4%AE%E6%8F%83%E3%81%88
* http://qiita.com/devdyaya/items/2c16617d685e2ccc7d70
* http://qiita.com/devdyaya/items/2c16617d685e2ccc7d70

```
<div class="outer">
  <div class="inner">Hi, world.</div>
</div>

.outer {
  display: table;
}

.inner {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```


transform なやつ
---

* http://qiita.com/yukinaka/items/1da62535553b62cc50aa
* http://qiita.com/tanshio/items/f12148309ffa7487fb20

```
<div class="outer">
  <div class="inner">Hi, world.</div>
</div>

.outer {
  position: relative;
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
```


flexbox なやつ
---

* http://qiita.com/tanshio/items/f12148309ffa7487fb20

```
<div class="outer">
  <div class="inner">Hi, world.</div>
</div>

.outer {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
}

.inner {
}
```


top: 0; bottom: 0; left: 0; right: 0; なやつ
---

* http://qiita.com/sawadays0118/items/b44c2082560242b74f74

```
<div class="outer">
  <div class="inner">Hi, world.</div>
</div>

.outer {
  width: XXXpx;
  height: XXXpx;
  position: relative;
}

.inner {
  width: XXXpx;
  height: XXXpx;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
```

<p data-height="562" data-theme-id="13514" data-slug-hash="dPrjZV" data-default-tab="result" data-user="furu" class='codepen'>See the Pen <a href='http://codepen.io/furu/pen/dPrjZV/'>dPrjZV</a> by furu (<a href='http://codepen.io/furu'>@furu</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
