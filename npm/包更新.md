`npm update` 只会对次版本和补丁版本进行更新，它永远不会更新主版本。

通过运行 `npm outdated`，可以查看本地版本和最新版本，以此来确定是否要更新主版本。

若要将所有软件包更新到新的主版本，则全局地安装 npm-check-updates 软件包：

```shell
npm install -g npm-check-updates
```

然后运行：

```shell
ncu -u
```

最后运行：

```shell
npm update
```
