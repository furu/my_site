---
title: CakePHP 1.3.2 なプロジェクトを PHP のビルトインウェブサーバで動かす方法
---

CakePHP 1.3.4 でビルトインウェブサーバで動作できるようにするコードが入ったので、それをコピペする。

[modified for PHP 5.4 and Builtin web server · cakephp/cakephp@9cbc301](https://github.com/cakephp/cakephp/commit/9cbc301)

`app/webroot/index.php` の `if (!include(CORE_PATH . 'cake' . DS . 'bootstrap.php')) {` の上に、以下のコードを入れる。

```php
if (php_sapi_name() == 'cli-server') {
    $_SERVER['PHP_SELF'] = '/'.basename(__FILE__);
}
```

あとはコマンドラインから

```
$ php -S localhost:3000 -t app/webroot
```

で成し遂げられる。

ビルトインウェブサーバが使えるのは、PHP 5.4 からです。
