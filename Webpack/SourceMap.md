## 了解devtool

webpack中是通过devtool来设置源码追踪的，而devtool有很多选项，如下：

| devtool | 作用 |
| ---- | ---- |
| 空 | 不生成sourceMap |
| eval | 每个 module 会封装到 eval 里包裹起来执行，并且会在每个 eval 语句的末尾追加注释 //# sourceURL=webpack:///./main.js |
| source-map | 会额外生成一个单独 Source Map 文件，并且会在 JavaScript 文件末尾追加 //# sourceMappingURL=bundle.js.map |
| hidden-source-map | 和 source-map 类似，但不会在 JavaScript 文件末尾追加 //# sourceMappingURL=bundle.js.map |
| inline-source-map | 和 source-map 类似，但不会额外生成一个单独 Source Map 文件，而是把 Source Map 转换成 base64 编码内嵌到 JavaScript 中 |
| eval-source-map | 和 eval 类似，但会把每个模块的 Source Map 转换成 base64 编码内嵌到 eval 语句的末尾，例如 //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW... |
| cheap-source-map | 和 source-map 类似，但生成的 Source Map 文件中没有列信息，因此生成速度更快 |
| cheap-module-source-map | 和 cheap-source-map 类似，但会包含 Loader 生成的 Source Map |
