# Speech-to-Talkback using built-in WebSpeechAPI

[こちらで稼働中です(Heroku Free Dynoのため起動に時間がかかることがあります)](https://speech-agent.herokuapp.com/)

## 想定するユーザ
- Windows10を使用していて、
- VRChatユーザで、かつマイクを持っているが、
- **肉声を電子の海に発信したくない**
- **でもボイスロイドを持っていないために専用音声認識ソフトウェアが使えない人や、喋り方の癖（抑揚）が消せないボイスチェンジャーでは困る人**、合成音声を発するメカ系アバターのロールプレイをしたい人

Softalkはこうした条件を満たすので便利だけれども、**喋ろうとするたび画面を切り替えて文字を入力なんてしてられない**、もっとリアルタイムに近い状態で話したいというところから出発しました。
 

## これは何をやっているのか

「**WebブラウザでWeb Speech APIを使ってマイクの声を認識・テキスト化して、声の入力が終わったらWeb Speech APIでそのテキストを読み上げることを繰り返す**」というWebアプリです。

このWeb Speech APIによる読み上げはブラウザからの音声出力なので、Windowsの設定→システム→サウンド→アプリの音量とデバイスの基本設定から**ブラウザの音声出力先をNetDuetto（仮想ライン入出力）にして、VRChat側でもMicrophoneの設定をNetDuettoにすればブラウザで読み上げられた音声がVRChatで流れる！**（ついでにブラウザ上で流れている任意の音もVRChatで流せる/流れてしまう）という仕組みです。

### 実現までの間に試みて頓挫した他の手法について

- Python3とGoogle Cloud Speech APIでマイクの音声を認識させて認識結果をSoftalkに喋らせる

録音した音声データの音声認識はどんなに短くても1リクエストとカウントされてしまうのでうかつに話せません。ストリーミング音声認識は1分という制限があります。

そこで喋り始めてからストリーミングリクエストを投げることを試みましたがPython2による先人のコードをPython3に移植するところで頓挫（そして喋るごとに増えていく文章をSoftalkに対していつ投げればよいのかも問題となりました、一定時間ごとに差分をとるとか？）

- SPTKをWindowsにインストールしてPythonから叩いて肉声からロボ声を作る

nmakeしたけどbinの中身がボロボロ抜けてしまった　リアルタイムで音声ストリームを受けてピッチをパルス音源に置き換えロボ声にする最有力候補だったのですが…

Linux環境ならSPTKのインストールは容易な一方、VRChatの動作や仮想ライン出力などあまりにタスクが増えてしまう、Ubuntu on WSLはWindows側との音声ファイルのやり取りが面倒、Cygwinもあまりスムーズではなさそう

- PyWorldとJupyter Notebook（IPython）で肉声をロボ声に変換する

特徴量検出をかけるとめちゃくちゃ掠れ声になってしまい聞き取るどころの話ではなくなりました
（私の発声に問題があるのか録音方法に問題があるのか）
本家WORLDをコンパイルして試すのはまた気が向いたら試してみます…

## 実現できたこと、できなかったこと

 * 画面を切り替えることなく常にマイクでの音声入力を待ち受けてくれて、しかも**無料かつ高精度**に認識してくれるものが実現できた 
 * 一度Webアプリをdeployしたら、音声出力先とマイクさえ準備すればどのWin10機でも利用が容易
 * 喋り終わらないと読み上げ始めないので、数秒のタイムラグは依然として残る。タイムラグを短くし、また誤認識を減らすためにも、言葉を切りつつ話す必要がある

## 参考サイト
* [自分用 Git For Windowsのインストール手順](https://qiita.com/toshi-click/items/dcf3dd48fdc74c91b409)
* [nulltask/heroku-static-provider](https://github.com/nulltask/heroku-static-provider)
* [【入門サンプル】Web Speech API を使ってブラウザと音声でやり取りする](http://okakacacao.wpblog.jp/technology/web-speech-api)
* [[HTML5] Web Speech APIに入門](https://www.yoheim.net/blog.php?q=20140701)

とりわけ[【入門サンプル】Web Speech API を使ってブラウザと音声でやり取りする](http://okakacacao.wpblog.jp/technology/web-speech-api) が参考になりました。
