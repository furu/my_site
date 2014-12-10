---
title: "Bundler.require"
---

2013年12月13日のメモ。

`Bundler.require` は、Gemfile で管理している gem を自動的にロードする。
引数に、group を渡してやるとその group の gem が自動的にロードされる。
引数がなかったり、:default を渡すと group メソッドのブロックに囲まれていない gem がロードされる。

例えば、以下のような Gemfile があるとする。

```
# Gemfile

gem 'sinatra'

group :development do
  gem 'pry'
end

group :test do
  gem 'rspec'
end
```

このときに、

* Bundler.require すると sinatra だけロードされる
* Bundler.require(:development) とすると pry だけロードされる
* Bundler.require(:default, :test) とすると sinatra と rspec がロードされる


Bundler.require の実装は、

``` 
def require(*groups)
  setup(*groups).require(*groups)
end
```

となっていて、

最初に Bundler.setup が呼ばれて、その返り値に対して require が呼ばれている。
この require は、Bundler::Runtime#require で、Kernel.require してる。


結局、Bundler で、

`require 'bundler/setup'` あるいは `require 'bundler'; Bundler.setup`は、
Gemfile で管理している gem をロードパスに追加するということをしている。

`require 'bundler'; Bundler.require`は、
Bundler.setup して、Gemfile で管理している gem を require している。
