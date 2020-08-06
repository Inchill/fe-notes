## tsconfig.json文件

TypeScript使用tsconfig.json文件管理工程配置，例如你想包含哪些文件和进行哪些检查。 让我们先创建一个简单的工程配置文件：

```json
{
    "compilerOptions": {
        "outDir": "./built",
        "allowJs": true,
        "target": "es5"
    },
    "include": [
        "./src/**/*"
    ]
}
```

这里我们为TypeScript设置了一些东西:

1. 读取所有可识别的src目录下的文件（通过include）。

2. 接受JavaScript做为输入（通过allowJs）。

3. 生成的所有文件放在built目录下（通过outDir）。

4. 将JavaScript代码降级到低版本比如ECMAScript 5（通过target）。

现在，如果你在工程根目录下运行tsc，就可以在built目录下看到生成的文件。 built下的文件应该与src下的文件相同。 现在你的工程里的TypeScript已经可以工作了。

## 早期收益

- noImplicitReturns 会防止你忘记在函数末尾返回值。

- noFallthroughCasesInSwitch 会防止在switch代码块里的两个case之间忘记添加break语句。

TypeScript还能发现那些执行不到的代码和标签，你可以通过设置allowUnreachableCode和allowUnusedLabels选项来禁用。
