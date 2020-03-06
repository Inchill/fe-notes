### 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

定义：CSS 规范规定，每个元素都有 display 属性，确定该元素的类型，每个元素都有默认的 display 值，如 div 的 display 默认值为“block”，则为“块级”元素；span 默认 display 属性值为“inline”，是“行内”元素。

- 行内元素：a、b、span、img、input、select、strong
- 块级元素：div、h1~h6、p、ul、ol、li、dl、dt、dd
- 空元素：常见有br、hr、img、input、link、meta

### 页面导入样式时，使用 link 和@import 有什么区别？

- link属于XHTML标签，而@import属于css，只能加载css
- 页面被加载时，link会同时被加载，而@import会等到页面被加载完才加载
- @import是css2.1提供的，因此只能被IE5以后的浏览器识别；link无兼容性问题
- link能通过js控制DOM来改变样式，而@import不能

### HTML5的变化

1. **新增语义化标签**

header、nav、main、footer、article、section

2. **新增API**

- 离线：applicationCache
- 音视频：audio、video
- 图形：canvas
- 实时通信：websocket
- 本地存储：localStorage、sessionStorage、indexDB
- 设备能力：地图定位、手机摇一摇

### em与i的区别

- em是语义化标签，表强调
- i是样式标签，表斜体italic

### 哪些元素可以自闭合

input、img、br、hr、meta、link

### HTML和DOM的关系

HTML是一个字符串，DOM由HTML解析而来。JavaScript可以维护DOM。

### 为什么弃用table标签？

因为table里的东西全部下载完后才会显示出来。

### 网页基本信息

一个网页，首先得有个标题，就跟人有名字一样。除此之外，还可以根据实际需要补充一些基本信息。
- 文档标题（浏览器标签中显示的文本）：<title>深入了解 head 元素</title>
- 编码格式：<meta charset="utf-8"> 如果你的页面出现乱码，那一般就是编码格式不对
- 视窗设置：<meta name="viewport" content="width=device-width, initial-scale=1.0">
- 搜索引擎优化相关内容： <meta name="description" content=“帮助你深层次了解HTML文档结构”>
- IE浏览器版本渲染设置：<meta http-equiv="X-UA-Compatible" content="ie=edge">

#### 300毫秒点击延迟问题
在移动端开发中，某些机型上使用click事件会延迟300ms才执行，这样影响了用户体验。 解决方法： 引入[fastclick.js](https://www.jianshu.com/p/05b142d84780)。