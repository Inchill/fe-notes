# Yarn

## yarn 解决的问题：

- **确定性**：通过 yarn.lock 等机制，保证了确定性。即不管安装顺序如何，相同的依赖关系在任何机器和环境下，都可以以相同的方式被安装。（在 npm v5 之前，没有 package-lock.json 机制，只有默认并不会使用的npm-shrinkwrap.json。）

- **采用模块扁平安装模式**：将依赖包的不同版本，按照一定策略，归结为单个版本，以避免创建多个副本造成冗余（npm 目前也有相同的优化）。

- **网络性能更好**：Yarn 采用了请求排队的理念，类似并发连接池，能够更好地利用网络资源；同时引入了更好的安装失败时的重试机制。

- **采用缓存机制，实现了离线模式（npm 目前也有类似实现）。**

相比 npm，Yarn 另外一个显著区别是 yarn.lock 中子依赖的版本号不是固定版本。这就说明单独一个 yarn.lock 确定不了 node_modules 目录结构，还需要和 package.json 文件进行配合。

<!-- 查看 yarn 缓存 -->
```shell
yarn cache dir
```

值得一提的是，Yarn 默认使用 prefer-online 模式，即优先使用网络数据。如果网络数据请求失败，再去请求缓存数据。

## yarn 安装机制

检测（checking）→ 解析包（Resolving Packages） → 获取包（Fetching Packages）→ 链接包（Linking Packages）→ 构建包（Building Packages）