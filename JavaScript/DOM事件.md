## target 和 currentTarget 区别？

Event 接口的只读属性 currentTarget 表示的，标识是当事件沿着 DOM 触发时事件的当前目标。它总是指向事件绑定的元素，而 Event.target 则是事件触发的元素。由于可以事件委托，事件绑定的元素可以直接是目标元素，也可以是目标元素的父元素，所以 currentTarget 的指向就不同。

> [MDN currentTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/currentTarget)