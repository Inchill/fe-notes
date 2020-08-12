DevServer 是一个方便开发的小型 HTTP 服务器， DevServer 其实是基于 webpack-dev-middleware 和 Expressjs 实现的， 而 webpack-dev-middleware 其实是 Expressjs 的一个中间件。

```js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

// 从 webpack.config.js 文件中读取 Webpack 配置 
const config = require('./webpack.config.js');
// 实例化一个 Expressjs app
const app = express();

// 用读取到的 Webpack 配置实例化一个 Compiler
const compiler = webpack(config);
// 给 app 注册 webpackMiddleware 中间件
app.use(webpackDevMiddleware(compiler));
// 启动 HTTP 服务器，服务器监听在 3000 端口 
app.listen(3000);
```

webpackMiddleware 函数的返回结果是一个 Expressjs 的中间件，该中间件有以下功能：

- 接收来自 Webpack Compiler 实例输出的文件，但不会把文件输出到硬盘，而是保存在内存中；

- 往 Expressjs app 上注册路由，拦截 HTTP 收到的请求，根据请求路径响应对应的文件内容；

## webpack dev middleware支持的配置项

```js
app.use(webpackDevMiddleware(compiler, {
  // 必须项
  publicPath: '/assets/',

  // 不输出 info 类型的日志到控制台，只输出 warn 和 error 类型的日志
  noInfo: false,

  // 不输出任何类型的日志到控制台
  quiet: false,

  // 切换到懒惰模式，这意味着不监听文件变化，只会在请求到时再去编译对应的文件，
  // 这适合页面非常多的项目。
  lazy: true,

  // watchOptions
  // 只在非懒惰模式下才有效
  watchOptions: {
      aggregateTimeout: 300,
      poll: true
  },

  // 默认的 URL 路径, 默认是 'index.html'.
  index: 'index.html',

  // 自定义 HTTP 头
  headers: {'X-Custom-Header': 'yes'},

  // 给特定文件后缀的文件添加 HTTP mimeTypes ，作为文件类型映射表
  mimeTypes: {'text/html': ['phtml']},

  // 统计信息输出样式
  stats: {
      colors: true
  },

  // 自定义输出日志的展示方法
  reporter: null,

  // 开启或关闭服务端渲染
  serverSideRender: false
}))
```

## 模块热替换

webpack-dev-middleware 并没有实现模块热替换功能，而是 DevServer 自己实现了该功能。

为了在使用 webpack-dev-middleware 时也能使用模块热替换功能去提升开发效率，需要额外的再接入 webpack-hot-middleware。

修改`webpack.config.js`文件，加入`HotModuleReplacementPlugin`插件:

```js
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = {
  plugins: [
    // 为了支持模块热替换，生成 .hot-update.json 文件
    new HotModuleReplacementPlugin()
  ]
}
```

再在http服务器使用该中间件：

```js
const webpackHotMiddleware = require('webpack-hot-middleware');

app.use(webpackHotMiddle(compiler));
```
