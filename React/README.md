# React

## 受控组件

受控组件是指那些我们可以对视图 view 和模型 model 建立起映射关系的组件，通过传递 value 和添加监听事件响应程序把一个组件转换为受控组件，比如常见的 input、select 等。它的值不仅可以由用户设置，也可以由程序代码设置。

## 非受控组件

非受控组件是指那些我们无法对视图 view 和模型 model 建立起映射关系的组件，我们无法通过代码控制它们的状态，它们的值只能由用户进行设置，我们只能借助 DOM 的引用获取到 value 值，典型的如 file。

## MVVM

MVVM 是 Model、View 和 ViewModel 的简写，Model 是数据，View 是视图，ViewModel 是 Model 和 View 建立绑定关系的桥梁。Vue 和 React 是典型的 MVVM 框架，它提供了一套代码开发范式，也就是各自的语法和 API，我们编写代码其实就是在 ViewModel 中填充逻辑，View 和 Model 的绑定会由框架自动完成，我们只是遵循框架提供的范式填充具体的逻辑代码。