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

## 使用source-map会有什么问题

- source-map 模式下会输出质量最高最详细的 Source Map，这会造成构建速度缓慢，特别是在开发过程需要频繁修改的时候会增加等待时间；

- source-map 模式下会把 Source Map 暴露出去，如果构建发布到线上的代码的 Source Map 暴露出去就等于源码被泄露；

为了解决以上两个问题，可以这样做：

- 在开发环境下把 devtool 设置成 cheap-module-eval-source-map，因为生成这种 Source Map 的速度最快，能加速构建。由于在开发环境下不会做代码压缩，Source Map 中即使没有列信息也不会影响断点调试；

- 在生产环境下把 devtool 设置成 hidden-source-map，意思是生成最详细的 Source Map，但不会把 Source Map 暴露出去。由于在生产环境下会做代码压缩，一个 JavaScript 文件只有一行，所以需要列信息。
