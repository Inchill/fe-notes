## 编译 JSX

JSX 会被 Babel 编译为 React.createElement()，React.createElement() 将返回一个叫 ReactElement 的 JS 对象。

> 在 2013 年推出 JSX 语法之前，在 React class 的 render 函数里创建 React 元素正是通过 React.createElement() 来创建的。React 元素和 DOM 元素是不一样的，React 元素分为两种：ReactComponentElement 和 ReactDOMElement 类型。ReactDOMElement 是 DOM 元素的虚拟表示，ReactComponentElement 引用了对应着 React 组件的一个函数或类。

React 升级到 JSX 语法的优势如下：

1. 类似于 HTML 且语法简单。这样不仅提高开发效率还易于阅读。
2. 声明式和封装。UI 部分使用声明式写法，和逻辑方法容易区分开来，同时他们被组合在一起形成了一个功能组。

## createElement

首先来看一下 createElement 函数的签名：

```js
export function createElement(type, config, children)
```

- type：标识节点类型，比如 div、span 等，也可以是 React 元素。
- config：一个对象，组件所有的属性都会以 key-value 的形式存在。
- children：一个对象，记录的是组件标签之间嵌套的内容。

## render

render 处理 ReactElement 虚拟 DOM 到真实 DOM 的转换工作，函数签名如下：

```js
ReactDOM.render(
  // ReactElement 元素
  element,
  // 容器 DOM
  container,
  [callback]
)
```