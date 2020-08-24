# TreeShaking

Tree Shaking 可以用来剔除 JavaScript 中用不上的死代码。它依赖静态的 ES6 模块化语法，例如通过 import 和 export 导入导出。 Tree Shaking 最先在 Rollup 中出现，Webpack 在 2.0 版本中将其引入。

需要注意的是要让 Tree Shaking 正常工作的前提是交给 Webpack 的 JavaScript 代码必须是采用 ES6 模块化语法的， 因为 ES6 模块化语法是静态的（导入导出语句中的路径必须是静态的字符串，而且不能放入其它代码块中），这让 Webpack 可以简单的分析出哪些 export 的被 import 过了。 

> 目前的 Tree Shaking 还有些的局限性，经实验发现：
>
> 1. 不会对entry入口文件做 Tree Shaking。
>
> 2. 不会对异步分割出去的代码做 Tree Shaking。

## 配置

首先，为了把采用 ES6 模块化的代码交给 Webpack，需要配置 Babel 让其保留 ES6 模块化语句，修改 .babelrc 文件为如下：

```json
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ]
}
```

其中 "modules": false 的含义是关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法。

Webpack 只是指出了哪些函数用上了哪些没用上，要剔除用不上的代码还得经过 UglifyJS 去处理一遍。



