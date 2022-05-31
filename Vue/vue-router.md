# vue-router

## SPA

在用 vue 开发单页应用时，为了实现类似多页应用那样的效果，我们就会用到 vue-router。在了解 vue-router 之前，有必要先对 SPA 做一个了解，这样有助于理解 vue-router 是怎么工作的。

SPA 的特点概括起来有亮点：

1. 只有一个 html 文件，所有内容都在这个页面中呈现
2. 只会加载一次 html 文件，当用户与应用交互时，是通过动态更新页面内容的方式来实现类似多页应用的效果的

SPA 的优点：

1. 有良好的交互体验，不会重新加载网页，只会局部更新
2. 前后端分离开发，前端负责呈现和交互，后端负责数据
3. 减轻服务器压力，只需要专注于处理数据
4. 共用一套后段程序代码

SPA 的缺点：

1. SEO 难度高，只有一个网页无法针对不同的内容编写不同的 SEO 信息
2. 初次加载耗时多，如果不做优化处理那么在加载页面时会把所有的 js 和 css 资源下载下来

## 实现原理

路由器对象的实现步骤可以分为以下三步：

1. 监听地址栏变化
2. 查找当前路径对应的页面组件
3. 将找到的页面组件替换到 router-view 位置

在实现单页面前端路由时，提供了两种方式：hash 模式和 history 模式。在 vue2 中通过 mode 参数指定，在 vue3 中使用 history 参数来指定。

### hash

vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。 hash（#）是 URL 的锚点，代表的是网页中的一个位置，单单改变 # 后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说 # 是用来指导浏览器动作的，对服务器端完全无用，HTTP 请求中也不会包括 # ，同时每一次改变 # 后的部分，都会在浏览器的访问历史中增加一个记录，使用 "后退" 按钮，就可以回到上一个位置，所以说 hash 模式通过锚点值的改变，根据不同的值，渲染指定 DOM 位置的不同数据。# 符号本身以及它后面的字符称之为 hash，可通过 window.location.hash 属性读取。


可以通过 window 对象来监听 hash 的变化：

```js
window.addEventListener("hashchange", funcEvent, false)
```

在 vue3 里需要引入 createWebHashHistory 函数，并通过 history 参数指定 createWebHashHistory 函数执行结果。

### history

核心就是利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。

这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。

history 模式特点：

1. 路由跳转不需要重新加载页面
2. 路由更美观
3. 兼容性没有 hash 模式好

它的兼容性不好主要是因为刷新后 404 问题，在生产环境和开发环境下需要做一些处理。

**生产环境**

假如从 www.test.com 跳转到 www.test.com/home 之后再刷新页面，这个时候浏览器会发出请求 www.test.com/home 到服务器，如果服务器没有对这个路由做处理会直接报 404 错误。

解决办法是在 nginx 做代理转发，如果没有这条路径直接重定向到首页。

```js
location / {
  try_files $uri $uri/ /index.html;
}
```

**开发环境**

开发环境可以使用 historyApiFallback，如果是使用 vue-cli 搭建的项目，其内部已经使用 historyApiFallback 在 webpack 里帮我们做过处理了。