## version

此属性遵循版本的语义版本控制记法（semver），这意味着版本始终以 3 个数字表示：x.x.x。

第一个数字是主版本号，第二个数字是次版本号，第三个数字是补丁版本号。

这些数字中的含义是：仅修复缺陷的版本是补丁版本，引入向后兼容的更改（例如新增功能）的版本是次版本，具有重大更改或者重构的是主版本。

### semver

全称是 semantic versioning specification，[官网中文版链接](https://semver.org/lang/zh-CN/)。

## private

如果设置为 true，则可以防止应用程序/软件包被意外发布到 npm 上。

## engines

设置此软件包/应用程序要运行的 Node.js 或其他命令的版本。

## browserslist

用于告知要支持哪些浏览器（及其版本）。 Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器。
