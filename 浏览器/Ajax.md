### Ajax的几个readyState是什么？

0 - (未初始化)还没有调用send()方法 uninitialized
1 - (载入)已调用send()方法，正在发送请求   loading
2 - (载入完成)send()方法执行完成，  loaded
3 - (交互)正在解析响应内容   interactive
4 - (完成)响应内容解析完成，可以在客户端调用了  done