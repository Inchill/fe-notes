### flex

使用 flex 布局首先要设置父容器 display: flex，然后再设置 justify-content: center 实现水平居中，最后设置 align-items: center 实现垂直居中。

```css
    #dad {
        display: flex;
        justify-content: center;
        align-items: center
    }
```

flex 的核心的概念就是 容器 和 轴。容器包括外层的 父容器 和内层的 子容器，轴包括 主轴 和 交叉轴，可以说 flex 布局的全部特性都构建在这两个概念上。flex 布局涉及到 12 个 CSS 属性（不含 display: flex），其中父容器、子容器各 6 个。不过常用的属性只有 4 个，父容器、子容器各 2 个，我们就先从常用的说起吧。

1. **容器**

容器具有这样的特点：父容器可以统一设置子容器的排列方式，子容器也可以单独设置自身的排列方式，如果两者同时设置，以子容器的设置为准。