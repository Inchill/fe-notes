### BOM(管理窗口与窗口之间的通讯)

BOM 是 browser object model 的缩写， 简称浏览器对象模型。 主要处理浏览器窗口和框架，描述了与浏览器进行交互的方和接口， 可以对浏览器窗口进行访问和操作， 譬如可以弹出新的窗口， 回退历史记录， 获取 url……

### BOM和DOM的关系

1. javacsript 是通过访问 BOM 对象来访问、 控制、 修改浏览器
2. BOM 的 window 包含了 document， 因此通过 window 对象的 document 属性就可以访问、
   检索、 修改文档内容与结构。
3. document 对象又是 DOM 模型的根节点。

因此， BOM 包含了 DOM， 浏览器提供出来给予访问的是 BOM 对象， 从 BOM 对象再访
问到 DOM 对象， 从而 js 可以操作浏览器以及浏览器读取到的文档

### BOM 对象包含哪些内容？

- Window JavaScript 层级中的顶层对象， 表示浏览器窗口。
- Navigator 包含客户端浏览器的信息。
- History 包含了浏览器窗口访问过的 URL。
- Location 包含了当前 URL 的信息。
- Screen 包含客户端显示屏的信息。
- document 