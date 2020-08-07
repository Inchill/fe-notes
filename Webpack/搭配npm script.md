## npm script

Npm Script 是一个任务执行者。 Npm 是在安装 Node.js 时附带的包管理器，Npm Script 则是 Npm 内置的一个功能，允许在 package.json 文件里面使用 scripts 字段定义任务.

Npm Script 底层实现原理是通过调用 Shell 去运行脚本命令.

Npm Script 还有一个重要的功能是能运行安装到项目目录里的 node_modules 里的可执行模块.

## webpack为什么需要npm script?

因为webpack本身不提供任何任务管理相关的功能，它只是一个模块打包工具。比如在实际开发场景中，我们希望有开发模式、预发模式和生产模式，这时候需要开发者定义三个不同的script脚本命令。
