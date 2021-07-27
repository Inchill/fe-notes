# ETag

ETag 的比较只对同一个 URL 有意义 —— 不同 URL 上资源的 ETag 值可能相同也可能不同。

## ETag 语法

```shell
ETag: W/"<etag_value>"
ETag: "<etag_value>"
```

- W/(可选)：'W/'（大小写敏感） 表示使用弱验证器。弱验证器很容易生成，但不利于比较。强验证器是比较的理想选择，但很难有效地生成。相同资源的两个弱 Etag 值可能语义等同，但不是每个字节都相同。
- "<etag_value>"：实体标签唯一地表示所请求的资源。它们是位于双引号之间的 ASCII 字符串（如 “2c-1799c10ab70” ）。没有明确指定生成 ETag 值的方法。通常是使用内容的散列、最后修改时间戳的哈希值或简单地使用版本号。比如，MDN 使用 wiki 内容的十六进制数字的哈希值。

## 参考链接

[【HTTP】971- HTTP 中的 ETag 是如何生成的？](https://mp.weixin.qq.com/s/kjkv7A0Lme-knH0B4GRdWA)

[MDN ETag](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag)
