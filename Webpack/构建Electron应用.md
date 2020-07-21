# 构建Electron应用

## 定义

[Electron](https://electron.atom.io)可以让我们使用开发Web的技术去开发跨平台的桌面应用，由GitHub主导和开源，Atom、VSCode编辑器就是使用Electron开发的。

Electron是Nodejs和Chromium浏览器结合体，用Chromium浏览器显示出的Web页面作为应用的GUI，通过Nodejs和操作系统交互。

**优点：**

- 降低了开发门槛

- 由于Chromium和Nodejs是跨平台的，所以Electron能做到在不同操作系统中运行一份代码

### 运行机制

在运行Electron时，会从启动一个主进程开始。主进程启动是通过Nodejs执行一个JavaScript文件开始的，这个文件是main.js，内容如下：

```js
const { app, BrowserWindow } = require('electron');
let win;
// 打开主窗口
function createWindow () {
    win = new BrowserWindow({ width: 800, height: 600 });
    // 加载应用的index.html
    const indexPageURL = `file://${ __dirname }/dist/index.html`,
    win.loadURL(indexPageURL);
    // 当window被关闭时，这个事件会被触发
    win.on('closed', () => {
        win = null;
    });
}

 // electron会在创建浏览器窗口时调用这个函数
app.on('ready', createWindow);
// 当全部窗口关闭时退出

```