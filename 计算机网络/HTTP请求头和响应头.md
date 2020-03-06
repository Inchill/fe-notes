### HTTP请求头

1. Accept
2. Accept-Encoding
3. Accept-Language
4. Connection

- Connection：keep-alive，当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接。

- Connection：close，代表一个Request完成后，客户端和服务器之间用于传输HTTP数据的TCP连接会关闭， 当客户端再次发送Request，需要重新建立TCP连接。

5. Host(发送请求时，该报头域是必需的)
6. Referer

- Referer:https://www.baidu.com/?tn=62095104_8_oem_dg 当浏览器向web服务器发送请求的时候，一般会带上Referer，告诉服务器我是从哪个页面链接过来的，服务器籍此可以获得一些信息用于处理。

7. User-Agent

- User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36 告诉HTTP服务器， 客户端使用的操作系统和浏览器的名称和版本。

8. Cache-Control
9. Cookie
10. Range(用于断点续传)

- Range:bytes=0-5 指定第一个字节的位置和最后一个字节的位置。用于告诉服务器自己想取对象的哪部分。


### 响应头

1. Cache-Control
2. Content-Type
3. Content-Encoding
4. Date
5. Server

- Server：Tengine/1.4.6  这个是服务器和相对应的版本，只是告诉客户端服务器信息。

6. Transfer-Encoding

- Transfer-Encoding：chunked 这个响应头告诉客户端，服务器发送的资源的方式是分块发送的。一般分块发送的资源都是服务器动态生成的，在发送时还不知道发送资源的大小，所以采用分块发送，每一块都是独立的，独立的块都能标示自己的长度，最后一块是0长度的，当客户端读到这个0长度的块时，就可以确定资源已经传输完了。

7. Expires
8. Etag
9. Last-Modified
10. Connection
11. Refresh

- Refresh: 5; url=http://baidu.com  用于重定向，或者当一个新的资源被创建时。默认会在5秒后刷新重定向。

12. Access-Control-Allow-Origin 
13. Access-Control-Allow-Methods
14. Access-Control-Allow-Credentials
15. Content-Range