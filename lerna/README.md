# Lerna

Lerna 是一个 monorepo 包管理工具，可以将不同的软件包集中在一起管理，在保持独立性的同时又能保持包之间的关联性。

## 初始化项目

使用之前需要本地安装 lerna，截止我记录前的最新版本是 4.0.0。

```shell
npm i lerna -g
```

使用命令 `lerna init` 初始化项目：

```shell
lerna init
```

这条命令将会做两件事：

1. 如果 lerna 不存在，将会在根目录下 package.json 中的 devDependency 里加入 lerna 依赖。
2. 创建一个 lerna.json 配置文件来存储版本号。

在使用此命令时还可以使用可选项：

1. --independent

```shell
lerna init --independent
```

该标志告诉 Lerna 使用独立版本控制模式，这种模式允许使用者对每个 package 单独改变版本号。每次执行 lerna publish 的时候，针对所有有更新的package，会逐个询问需要升级的版本号，基准版本为它自身的 package.json 里面的版本号。

2. --exact（默认模式）

```shell
lerna init --exact
```

该标志告诉 Lerna 使用固定版本控制模式，这种模式下所有包都会使用 lerna.json 的统一版本号。

生成的项目结构如下：

```
lerna-repo/
  packages/
  package.json
  lerna.json
```

其中 packages 就是后续我们要单独管理的包的集合，每增加一个包，都会在 packages 下新增一个目录。

## 新增 package

在 packages 下新增包是通过 `lerna create` 命令实现的。


