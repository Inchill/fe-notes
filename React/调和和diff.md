## 调和

将虚拟 DOM 映射到真实 DOM 的过程。

## Diff

找虚拟 DOM 不同的过程。

Diff 算法的三个关键点：

1. Diff 的性能突破关键点在于分层对比；
2. 类型一致的节点才有继续 Diff 的必要性；
3. key 属性的设置，可以帮我们尽可能重用同一层级的节点（否则就是会导致机械式地删除、重建节点）。

