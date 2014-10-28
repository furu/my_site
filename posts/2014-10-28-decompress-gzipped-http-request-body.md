---
title: "Content-Encoding: gzip な HTTPリクエストの Decompression"
---

Nginx + Phusion Passenger + Rails という構成のうぇっぶあぷりけーしょんで、gzip で圧縮された HTTPリクエストを扱いたいんです！

繰繰り出された実現方法
---

* Apache の [mod_deflate](http://httpd.apache.org/docs/2.2/en/mod/mod_deflate.html) を使う
* Rack ミドルウェアを書く
  - [https://gist.github.com/relistan/2109707](https://gist.github.com/relistan/2109707)
  - [https://github.com/andrhamm/degzipper](https://github.com/andrhamm/degzipper)
  - [https://github.com/tdtds/rack-request_decompressor](https://github.com/tdtds/rack-request_decompressor)

Nginx には [ngx\_http\_gunzip\_module](http://nginx.org/en/docs/http/ngx_http_gunzip_module.html) というモジュールがあって、gunzip という名前からこれでできるんじゃないかと思っていたがどうやら違うっぽい。

[nginx で gzip_static と gunzip を使ってストレージを節約する](http://d.hatena.ne.jp/sfujiwara/20140129/1390980837)

ngx\_http\_gunzip\_module は上記のURL先のような用途で使うもののようだ。サーバ側には圧縮したファイルを置いておいてそれを配信するようにしたいが、Accept-Encoding: gzip ではないクライアントがコンテンツを受け取れなくなるので、そういうクライアントに対しては伸長してあげるかんじだと思う。

Nginx は自分でモジュールを書くしかないんすかね。

そういうわけで Nginx を置き替えられるんだったら Apache を使えば楽っぽいし、そうでないなら Rack ミドルウェアを書いて Rails に組み込めばいい。


Rack Middleware
---

Rack ミドルウェアを作りたい！雑に説明すると、

* コンストラクタの第一引数に内側のRackアプリケーションまたはRackミドルウェアを取る
* call メソッドに反応する
  - HTTPリクエストの情報が入ったハッシュオブジェクトを引数に取る
  - ステータスコード、HTTPレスポンスヘッダー、HTTPレスポンスボディーを返す

ようなオブジェクトを作ればいい。

Rails にどうやって組み込めばいいのかについては RailsGuides の [Rails on Rack - 3.2 Configuring Middleware Stack](http://guides.rubyonrails.org/rails_on_rack.html#configuring-middleware-stack) に書いてある。

Rails ではミドルウェアを設定するのに便利な `config.middleware` というインターフェースが用意されていて、これは `config/application.rb` や `config/environments/(production|development|test).rb` ファイルの中で使える。Rails 自体にあまり詳しくないので、どういうコンテキスト中で使えるのかということが説明できない。具体例で説明すると、

`config/application.rb` だと以下のようなかんじ。

<pre><code>
module Foo
  class Application < Rails::Application
    config.middleware.use Rack::Heartbeat
  end
end
</code></pre>

`config/environments/production.rb` だと以下のようなかんじ。

<pre><code>
Rails.application.configure do
  config.middleware.insert_before ActionDispatch::ParamsParser, Rack::Heartbeat
end
</code></pre>

ミドルウェアを追加するには、

* config.middleware.use(new_middleware, args)
* config.middleware.insert_before(existing_middleware, new_middleware, args)
* config.middleware.insert_after(existing_middleware, new_middleware, args)

を使える。使い方はシグネチャから何となくわかるでしょう。


RequestDecompressor
---

上記で挙げた URL を参考にしたというかほぼそのまま。

<pre><code>
class RequestDecompressor
  def initialize(app)
    @app = app
  end

  def method_handled?(env)
    !!(env['REQUEST_METHOD'] =~ /(POST|PUT)/)
  end

  def encoding_handled?(env)
    ['gzip', 'deflate'].include? env['HTTP_CONTENT_ENCODING']
  end

  def call(env)
    if method_handled?(env) && encoding_handled?(env)
      extracted = decode(env['rack.input'], env['HTTP_CONTENT_ENCODING'])

      env.delete('HTTP_CONTENT_ENCODING')
      env['CONTENT_LENGTH'] = extracted.bytesize
      env['rack.input'] = StringIO.new(extracted)
    end

    @app.call(env)
  end

  def decode(input, content_encoding)
    case content_encoding
    when 'gzip' then Zlib::GzipReader.new(input).read
    when 'deflate' then Zlib::Inflate.inflate(input.read)
    end
  end
end
</code></pre>

疲れたので説明を放棄し、これを `lib/request_decompressor.rb` に置いて `config/application.rb` に

<pre><code>
require File.expand_path('../../lib/request_decompressor', __FILE__)

module Foo
  class Application < Rails::Application
    config.middleware.insert_before ActionDispatch::ParamsParser, RequestDecompressor
  end
end
</code></pre>

を書く。`ActionDispatch::ParamsParser` の前に RequestDecompressor を追加したのは、パラメータを解析する前にボディ部を伸長しないと ActionDispatch::ParamsParser がうまく処理できないからでしょう。ちなみに Rails アプリケーションのミドルウェアスタックを確認したい場合、`rake middleware` で確認できるよ。

Rails、自作ミドルウェアのファイルをどこに配置すればいいのかわからなかったので lib に置いた。Rails is Omakase したかった。

RequestDecompressor、gzip と deflate に対応しているように見えるけれど、gzip と deflate の関係性がよくわかっていない。さらっと調べたかんじ、deflate はアルゴリズムで gzip はその実装のようなかんじだったけれど、確かではないのでこれについてはまた。
