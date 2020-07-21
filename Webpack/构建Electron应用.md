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
app.on('window-all-closed', () => {
    // 在macos上，除非用户用cmd + q确定退出，否则绝大部分应用会保持激活状态
    if (process.platform !== 'darwin') app.quit();
})
```

每个窗口都是一个单独的网页进程，窗口之间需要借助主进程传递信息。

## webpack配置electron

### 配置背景

要求在应用启动后显示一个主窗口，主窗口里有一个按钮，点击按钮会重新显示一个窗口，并且通过使用react开发网页。

### 主窗口网页代码

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { remote } from 'electron';
import path from 'path';
import './index.css';

// 创建主窗口组件
class App extends Component {
    // 按钮点击事件
    handleBtnClick () {
        const modalPath = path.join('file://', remote.app.getAppPath(), 'dist/login.html');
        // 新窗口大小
        let win = new remote.BrowserWindow({ width: 400, height: 320 });
        win.on('close', () => {
            // 窗口被关闭时清空资源
            win = null;
        });
        // 加载网页
        win.loadURL(modalPath);
        // 显示窗口
        win.show();
    }
    render () {
        return (
            <div>
                <h1>page index</h1>
                <button onClick={ this.handleBtnClick }>open page login</button>
            </div>
        )
    }
}

// 渲染主窗口组件
render(<App />, window.document.getElementById('app'));
```

### webpack.config.js配置

加上一句：`target: 'electron-renderer'`

### 安装依赖

```shell
npm i electron --save
```

安装成功后在项目根目录下执行`electron ./`