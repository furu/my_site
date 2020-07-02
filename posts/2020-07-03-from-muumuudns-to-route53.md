---
title: ネームサーバーを Route 53 に変えてみた
---

Route 53 使ったことがなかったので使ってみることにした。微々たる金がかかってしまうことになるが。

tfrkd.org はムームードメインで取得したドメインで、これまではムームードメインが提供するムームーDNSを使っていた。

数日前からこのサイトを Netlify で配信するようにしてみており、ムームーDNSではいつからか ALIAS レコードが使えるようになっていて tfrkd.org の ALIAS レコードに tfrkd-org.netlify.app を設定していたが、Route 53 ではできなかったので A レコードに Netlify のロードバランサーの IP アドレスを設定した。（どの IP アドレスを指定すればいいのかよくわからんかったので、dig tfrkd-org.netlify.app で返ってきた IP アドレスを指定してみているだけなので大丈夫なのかよくわからん。カスタムドメインを設定する前は、これを指定してくれというのが Netlify の管理画面で見られるけど、一度設定してしまうと見られなくなる。

Route 53 では zone apex の ALIAS レコードには他所のリソースを指定できないのかもしれない調べてない。

```
-> dig tfrkd.org ns

; <<>> DiG 9.10.6 <<>> tfrkd.org ns
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 31282
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 3

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;tfrkd.org.                     IN      NS

;; ANSWER SECTION:
tfrkd.org.              172800  IN      NS      ns-157.awsdns-19.com.
tfrkd.org.              172800  IN      NS      ns-1049.awsdns-03.org.
tfrkd.org.              172800  IN      NS      ns-659.awsdns-18.net.
tfrkd.org.              172800  IN      NS      ns-1820.awsdns-35.co.uk.

;; ADDITIONAL SECTION:
ns-1049.awsdns-03.org.  126838  IN      A       205.251.196.25
ns-1049.awsdns-03.org.  129015  IN      AAAA    2600:9000:5304:1900::1

;; Query time: 47 msec
;; SERVER: 192.168.7.1#53(192.168.7.1)
;; WHEN: Fri Jul 03 02:39:52 JST 2020
;; MSG SIZE  rcvd: 219
```
