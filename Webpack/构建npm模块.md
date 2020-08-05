
## npm模块特点

- 每个模块根目录下都必须有一个描述该模块的 package.json 文件。该文件描述了模块的入口文件是哪个，该模块又依赖哪些模块等。想深入了解可以阅读文章 package.json文件。
- 模块中的文件以 JavaScript 文件为主，但不限于 JavaScript 文件。例如一个 UI 组件模块可能同时需要 JavaScript、CSS、图片文件等。
- 模块中的代码大多采用模块化规范，因为你的这个模块可能依赖其它模块，而且别的模块又可能依赖你的这个模块。因为目前支持比较广泛的是 CommonJS 模块化规范，上传到 Npm 仓库的代码最好遵守该规范。

## 抛出问题

**示例：用 Webpack 构建一个可上传的 Npm 仓库的 React 组件**

*要求：*

1. 源代码采用 ES6 写，但发布到 Npm 仓库的需要是 ES5 的，并且遵守 CommonJS 模块化规范。如果发布到 Npm 上去的 ES5 代码是经过转换的，请同时提供 Source Map 以方便调试。
2. 该 UI 组件依赖的其它资源文件例如 CSS 文件也需要包含在发布的模块里。
3. 尽量减少冗余代码，减少发布出去的组件的代码文件大小。
4. 发布出去的组件的代码中不能含有其依赖的模块的代码，而是让用户可选择性的去安装。例如不能内嵌 React 库的代码，这样做的目的是在其它组件也依赖 React 库时，防止 React 库的代码被重复打包。

看下最终发布到 Npm 仓库的模块的目录结构：

```
node_modules/hello-webpack
├── lib
│   ├── index.css (组件所有依赖的 CSS 都在这个文件中)
│   ├── index.css.map
│   ├── index.js (符合 CommonJS 模块化规范的 ES5 代码)
│   └── index.js.map
├── src (ES6 源码)
│   ├── index.css
│   └── index.js
└── package.json (模块描述文件)
```

写一个最简单的 React 组件，其代码放在 src/index.js 文件中，内容如下：

```javascript
import React, { Component } from 'react';
import './index.css';

// 导出该组件供给其它模块使用
export default class HelloWebpack extends Component {
  render() {
    return <h1 className="hello-component">Hello,Webpack</h1>
  }
}
```

要使用该模块时只需要这样：

```javascript
// 通过 ES6 语法导入
import HelloWebpack from 'hello-webpack';
import 'hello-webpack/lib/index.css';

// 或者通过 ES5 语法导入
var HelloWebpack = require('hello-webpack');
require('hello-webpack/lib/index.css');

// 使用 react-dom 渲染
render(<HelloWebpack/>);
```

## webpack构建npm

### 针对上述第一个要求，可以进行如下配置：

```javascript
module.exports = {
  output: {
    // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
    libraryTarget: 'commonjs2',
  },
  // 输出 Source Map
  devtool: 'source-map',
  rules: [
    // 处理ES6转ES5
    {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-transform-modules-commonjs'
                ]
            }
        },
        exclude: /node_modules/
    }
  ]
}
```

### 针对第二个要求，需要通过 css-loader 和 extract-text-webpack-plugin 实现，进行如下配置：

```javascript
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        // 增加对 CSS 文件的支持
        test: /\.css$/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 输出的 CSS 文件名称
      filename: 'index.css',
    }),
  ],
};
```

此步引入了3个新依赖：

```shell
# 安装 Webpack 构建所需要的新依赖
npm i -D style-loader css-loader extract-text-webpack-plugin
```

### 对于要求3，需要注意的是 Babel 在把 ES6 代码转换成 ES5 代码时会注入一些辅助函数。

例如下面这段 ES6 代码

```javascript
class HelloWebpack extends Component{
}
```
在被转换成能正常运行的 ES5 代码时需要以下2个辅助函数：

- babel-runtime/helpers/createClass 用于实现 class 语法
- babel-runtime/helpers/inherits 用于实现 extends 语法

默认的情况下 Babel 会在每个输出文件中内嵌这些依赖的辅助函数的代码，如果多个源代码文件都依赖这些辅助函数，那么这些辅助函数的代码将会重复的出现很多次，造成代码冗余。 为了不让这些辅助函数的代重复出现，可以在依赖它们的时候通过 require('babel-runtime/helpers/createClass') 的方式去导入，这样就能做到只让它们出现一次。 babel-plugin-transform-runtime 插件就是用来做这个事情的。上述针对要求1的配置已经做了该工作。

### 针对要求四，需要通过externals实现。

Externals 用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们。

```javascript
module.exports = {
  // 通过正则命中所有以 react 或者 babel-runtime 开头的模块
  // 这些模块通过注册在运行环境中的全局变量访问，不用被重复打包进输出的代码里
  externals: /^(react|babel-runtime)/,
};

完成以上4步后最终的 Webpack 完整配置代码如下：

```javascript
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 模块的入口文件
  entry: './src/index.js',
  output: {
    // 输出文件的名称
    filename: 'index.js',
    // 输出文件的存放目录
    path: path.resolve(__dirname, 'lib'),
    // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
    libraryTarget: 'commonjs2',
  },
  // 通过正则命中所有以 react 或者 babel-runtime 开头的模块，
  // 这些模块使用外部的，不能被打包进输出的代码里，防止它们出现多次。
  externals: /^(react|babel-runtime)/,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目录下的文件，
        // node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换。
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // 增加对 CSS 文件的支持
        test: /\.css$/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 输出的 CSS 文件名称
      filename: 'index.css',
    }),
  ],
  // 输出 Source Map
  devtool: 'source-map',
};
```

重新执行构建后，你将会在项目目录下看到一个新目录 lib，里面放着要发布到 Npm 仓库的最终代码。

## 发布到npm

在把构建出的代码发布到 Npm 仓库前，还需要确保你的模块描述文件 package.json 是正确配置的。由于构建出的代码的入口文件是 ./lib/index.js，需要修改 package.json 中的 main 字段如下：

```json
{
  "main": "lib/index.js",
  "jsnext:main": "src/index.js"
}
```

其中 jsnext:main 字段用于指出采用 ES6 编写的模块入口文件所在的位置，这样做的目的是为了方便实现在 4-10 中介绍的 Tree Shaking。修改完毕后在项目目录下执行 npm publish 就能把构建出的代码发布到 Npm 仓库中(确保已经 npm login 过)。

> 如果你想让发布到 Npm 上去的代码保持和源码的目录结构一致，那么用 Webpack 将不在适合。 因为源码是一个个分割的模块化文件，而 Webpack 会把这些模块组合在一起。 虽然 Webpack 输出的文件也 > 可以是采用 CommonJS 模块化语法的，但在有些场景下把所有模块打包成一个文件发布到 Npm 是不适合的。 例如像 Lodash 这样的工具函数库在项目中可能只用到了其中几个工具函数，如果所有工具函数打 > 包在一个文件中，那么所有工具函数都会被打包进去，而保持模块文件的独立能做到只打包进使用到的。 还有就是像 UI 组件库这样由大量独立组件组成的库也和 Lodash 类似。

> 所以 Webpack 适合于构建完整不可分割的 Npm 模块。
