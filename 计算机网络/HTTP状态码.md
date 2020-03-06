### 1xx信息

100：continue，表明到目前为止都很正常，客户端可继续发送请求或者忽略这个响应。

### 2xx成功

1. 200：OK
2. 204：No Content，请求已经成功处理，但是返回的响应报文不包含实体的主体部分。一般在只需要从客户端往服务器发送信息，而不需要返回数据时使用。
3. 206：Partial Content，表示客户端进行了范围请求，响应报文包含由 Content-Range 指定范围的实体内容。

### 3xx重定向

1. 301：Moved Permanently，永久重定向。
2. 302：Found，临时性重定向。
3. 303：See other，和 302 有着相同的功能，但是 303 明确要求客户端应该采用 GET 方法获取资源。
4. 304：Not Modified，如果请求报文首部包含一些条件，例如：If-Match，If-Modified-Since，If-None-Match，If-Range，If-Unmodified-Since，如果不满足条件，则服务器会返回 304 状态码。

### 4xx客户端错误

1. 400：Bad Request，请求报文中存在语法错误。
2. 401：Unauthorized，该状态码表示发送的请求需要有认证信息（BASIC 认证、DIGEST 认证）。如果之前已进行过一次请求，则表示用户认证失败。
3. 403：Forbidden，请求被拒绝。
4. 404：Not Found

### 5xx服务端错误

1. 500：Internal Server Error，服务器正在执行请求时发生错误；
2. 502：Bad Gateway，作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。
3. 503：Service Unavailable，服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。