# 本地配置

## 安装

```shell
brew install nginx

# 查看信息（root 目录、配置文件目录）
brew info nginx
```

## 配置开发域名

1. 域名映射

使用 switchhosts 管理本机 hosts，在其中新增一条域名映射记录：

```
127.0.0.1   dev.fe.com
```

2. 配置 nginx

在 `nginx.conf` 里新增配置记录：

```
    server {
        listen       80;
        server_name  dev.fe.com;

        location / {
            root   html;
            index  index.html index.htm;
        }
    }
```

保存后可以检测配置文件是否正确：

```shell
nginx -t
```

然后重启 nginx：

```shell
brew services restart nginx
```

最后在浏览器地址栏输入 `dev.fe.com` 就会出现默认的 `nignx` 欢迎页面。

## 反向代理

启用本地开发服务器后，可以配置 `proxy_pass` 将访问 `dev.fe.com` 代理转发到对应的端口，这样就可以直接通过域名访问。

```
    server {
        listen       80;
        server_name  dev.fe.com;

        location / {
            root   html;
            index  index.html index.htm;
            proxy_pass	http://127.0.0.1:8080/;
        }
    }
```

## 配置 alias

本地项目打包后，可以通过配置 alias 访问，多个项目可以配置多个 location。

```
    server {
        listen       80;
        server_name  dev.fe.com;

        location / {
            root   html;
            index  index.html index.htm;
            proxy_pass	http://127.0.0.1:8080/;
        }

        location /cr-share/ {
            alias /Users/xxx/Documents/projects/cr-share/dist/;
        }

        location /assets/ {
            alias /Users/xxx/Documents/projects/cr-share/dist/assets/;
        }
        
        # 配置本机静态资源目录
        location /static/ {
	        index index.html;
            alias /Users/xxx/Documents/static/;
	        autoindex on;
        }
    }
```

> 注：打包后的项目带有 index.html，访问 `dev.fe.com/cr-share` 就会访问到打包后的项目。如果是 CSR 应用，刷新路由会出现 404。除了配置页面资源路径，还需要注意静态资源路径，否则会出现加载错误。其它静态资源可以使用 http-server 启用反向代理访问。
