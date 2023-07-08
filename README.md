node.js 3rd party libraries

socket.io:
websocket によるメッセージング.
クライアント側でも使う.

express
Web アプリケーション・フレームワーク

sticky-session
複数プロセス起動によるスケールアウト & セッション管理.
socket.io をスケールアウトさせる場合に使う

body-parser
受信 HTTP message の body 部解析.
POST form や json を解析できる.
express と組み合わせて使用する.

@socket.io/redis-adapter
redis pub/sub によるメッセージング
socket.io をスケールアウトさせる場合に使う
