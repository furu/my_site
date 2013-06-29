---
title: gitconfigで折り返すには？
---

こんばんは。

    [alias]
        graph = log --graph --date-order --all --pretty=format:'%h %Cred%d %Cgreen%ad %Cblue%cn %Creset%s' --date=short

こういうの折り返したいわけ。「**\\(バックスラッシュ)**」を使う。

    [alias]
        graph = log --graph --date-order --all\
                --pretty=format:'%h %Cred%d %Cgreen%ad %Cblue%cn %Creset%s' --date=short

\--prettyの所は、実際にはlogのところと頭そろってるからな。<br>
こういうのうまく表示させるにはどうしたらいいんすかね。
