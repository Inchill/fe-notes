我们在实际开发中更多地是通过命令行方式启动webpack，但是webpack除了这种方式外，还提供了可在node环境中调用的库。通过webpack暴露的API，可以在node程序中调用webpack执行构建。

## 基本使用

平时我们通过以下方式导入webpack：

```js
const webpack = require('webpack');
```

或者：

```js
import webpack from 'webpack';
```

导出的webpack其实是一个函数。使用如下：

```js
webpack({
  // webpack配置，和webpack.config.js文件一致
}, (err, stats) => {
  if (err || stats.hasErrors) {
    // 构建过程出错
  }
})
```

如果我们将webpack配置写在webpack.config.js文件中，则可以这样使用：

```js
const config = require('./webpack.config.js');
webpack(config, callback);
```

## 监听模式

上述使用方法只能执行一次构建，无法以监听模式启动webpack，为了以监听模式启动webpack，则需要获取compiler实例：

```js
// 如果没有第2个参数callback，就会返回一个Compiler实例
const compiler = webpack(config);

// 调用compiler.watch并以监听模式启动，返回的watching用于关闭监听
const watching = compiler.watch({
  // watchOptions
  aggregateTimeout: 300
}, (err, stats) => {
  // 每次因文件变化而重新执行构建后
})；

// 调用watching.close关闭监听
watching.close(() => {
  // ...
})
```
