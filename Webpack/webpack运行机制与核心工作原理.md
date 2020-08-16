# webpack运行机制与核心工作原理

## 核心流程

1. webpack cli启动打包流程；
2. 载入webpack核心模块，创建Compiler对象；
3. 使用Compiler对象开始编译整个项目；
4. 从入口文件开始，解析模块依赖，形成依赖关系树；
5. 递归依赖树，将每个模块交给对应的Loader处理；
6. 合并Loader处理完的结果，将打包结果输出到dist目录。

## webpack cli

webpack cli的作用就是将cli参数和webpack配置文件中的配置整合，得到一个完整的配置对象。

这部分操作在 webpack-cli 的入口文件 bin/cli.js 中，这个文件中内容比较多，我们这里只截取部分核心代码，你可以对照截图中的行号找到源代码中对应的位置。

首先，Webpack CLI 会通过 yargs 模块解析 CLI 参数，所谓 CLI 参数指的就是我们在运行 webpack 命令时通过命令行传入的参数，例如 --mode=production，具体位置如下：

<img src="https://s0.lgstatic.com/i/image/M00/00/51/Ciqc1F6pS9iAE-dtAAOjZcVPPzw330.png">

紧接着后面，调用了 bin/utils/convert-argv.js 模块，将得到的命令行参数转换为 Webpack 的配置选项对象，具体操作如下：

<img src="https://s0.lgstatic.com/i/image/M00/00/53/CgqCHl6pTd-ASt6BAADU-S6qhDo690.png">

在 convert-argv.js 工作过程中，首先为传递过来的命令行参数设置了默认值，然后判断了命令行参数中是否指定了一个具体的配置文件路径，如果指定了就加载指定配置文件，反之则需要根据默认配置文件加载规则找到配置文件，具体代码如下：

<img src="https://s0.lgstatic.com/i/image/M00/00/53/Ciqc1F6pTeaAedzEAAS80vohmio167.png">

找到配置文件过后，将配置文件中的配置和 CLI 参数中的配置合并，如果出现重复的情况，会优先使用 CLI 参数，最终得到一个完整的配置选项。

有了配置选项过后，开始载入 Webpack 核心模块，传入配置选项，创建 Compiler 对象，这个 Compiler 对象就是整个 Webpack 工作过程中最核心的对象了，负责完成整个项目的构建工作。

<img src="https://s0.lgstatic.com/i/image/M00/00/53/CgqCHl6pTe6AKEyAAAFWM1c2jo4379.png">

## 创建Compiler对象

随着 Webpack CLI 载入 Webpack 核心模块，整个执行过程就到了 Webpack 模块中，所以这一部分的代码需要回到 Webpack 模块中，我这里分析的是 v4.43.0 版本的 Webpack，可参考这个版本的源代码的固定链接。

同样，这里我们需要找到这个模块的入口文件，也就是 lib/webpack.js 文件。这个文件导出的是一个用于创建 Compiler 的函数，具体如下：

<img src="https://s0.lgstatic.com/i/image/M00/00/53/CgqCHl6pThGAYBSpAAOrHJC19zY284.png">

在这个函数中，首先校验了外部传递过来的 options 参数是否符合要求，紧接着判断了 options 的类型。

根据这个函数中的代码，我们发现 options 不仅仅可以是一个对象，还可以是一个数组。如果我们传入的是一个数组，那么 Webpack 内部创建的就是一个 MultiCompiler，也就是说 Webpack 应该支持同时开启多路打包，配置数组中的每一个成员就是一个独立的配置选项。而如果我们传入的是普通的对象，就会按照我们最熟悉的方式创建一个 Compiler 对象，进行单线打包。

<img src="https://s0.lgstatic.com/i/image/M00/00/53/Ciqc1F6pThqAB_XKAAPEsCITm7Q145.png">

我们顺着主线接着往下看，如下图所示：在创建了 Compiler 对象过后，Webpack 就开始注册我们配置中的每一个插件了，因为再往后 Webpack 工作过程的生命周期就要开始了，所以必须先注册，这样才能确保插件中的每一个钩子都能被命中。

<img src="https://s0.lgstatic.com/i/image/M00/00/53/Ciqc1F6pTiKAHHyCAAJMG1UWDSA408.png">

## 开始构建

完成 Compiler 对象的创建过后，紧接着这里的代码开始判断配置选项中是否启用了监视模式，具体操作如下：

<img src="https://s0.lgstatic.com/i/image/M00/00/53/Ciqc1F6pTl6AIg5uAAJLEZQnnTE844.png">

如果是监视模式就调用 Compiler 对象的 watch 方法，以监视模式启动构建，但这不是我们主要关心的主线。
如果不是监视模式就调用 Compiler 对象的 run 方法，开始构建整个应用。
这个 run 方法定义在 Compiler 类型中，具体文件在 webpack 模块下的 lib/Compiler.js 中，代码位置如下：

<img src="https://s0.lgstatic.com/i/image/M00/00/53/Ciqc1F6pTmmAT8OjAALe_UlnYVs734.png">

这个方法内部就是先触发了beforeRun 和 run 两个钩子，然后最关键的是调用了当前对象的 compile 方法，真正开始编译整个项目，具体代码位置如下：

<img src="https://s0.lgstatic.com/i/image/M00/00/53/Ciqc1F6pTnCAIOwcAAO9SzOiSUg967.png">

compile 方法内部主要就是创建了一个 Compilation 对象，这个对象我们在 04 课时中有提到，Compilation 字面意思是“合集”，实际上，你就可以理解为一次构建过程中的上下文对象，里面包含了这次构建中全部的资源和信息。

<img src="https://s0.lgstatic.com/i/image/M00/00/53/Ciqc1F6pTniAHnnDAAHoLTnzs9A306.png">

创建完 Compilation 对象过后，紧接着触发了一个叫作 make 的钩子，进入整个构建过程最核心的 make 阶段。

## make阶段

make 阶段主体的目标就是：根据 entry 配置找到入口模块，开始依次递归出所有依赖，形成依赖关系树，然后将递归到的每个模块交给不同的 Loader 处理。

<img src="https://s0.lgstatic.com/i/image/M00/00/54/Ciqc1F6pTzWABOtoAAEXDnF67ow274.png">

由于这个阶段的调用过程并不像之前一样，直接调用某个对象的某个方法，而是采用事件触发机制，让外部监听这个 make 事件的地方开始执行，所以从这里往后的代码可能找起来会费点劲儿。

这里我简单提示一下：想要知道这个事件触发后，哪些地方会开始执行，前提是得知道哪里注册了这个叫作 make 的事件。

Webpack 的插件系统是基于官方自己的 Tapable 库实现的，我们想要知道在哪里注册了某个事件，必须要知道如何注册的事件。Tapable 的注册方式具体如下：

<img src="https://s0.lgstatic.com/i/image/M00/00/54/CgqCHl6pT0SAQu2BAAD1mVx6IOM261.png">

所以，我们只需要通过开发工具搜索源代码中的 make.tap，就应该能够找到事件注册的位置，具体操作如下：

<img src="https://s0.lgstatic.com/i/image/M00/00/54/Ciqc1F6pT06AdneyAARyPGKqWLw664.png">

这里搜索到了六个插件中都注册了 make 事件，这些插件实际上是前面创建 Compiler 对象的时候创建的，刚刚因为没有影响，所以我们就忽略了：

<img src="https://s0.lgstatic.com/i/image/M00/00/54/Ciqc1F6pT1aAfcDBAANqf-qyrV8871.png">

因为我们默认使用的就是单一入口打包的方式，所以这里最终会执行其中的 SingleEntryPlugin。

<img src="https://s0.lgstatic.com/i/image/M00/00/54/Ciqc1F6pT12AfmmEAAF7uDrm_DY692.png">

这个插件中调用了 Compilation 对象的 addEntry 方法，开始解析我们源代码中的入口文件，以此开始“顺藤摸瓜”式的寻找。

对于 make 阶段后续的流程，这里我们概括一下：

SingleEntryPlugin 中调用了 Compilation 对象的 addEntry 方法，开始解析入口；
addEntry 方法中又调用了 _addModuleChain 方法，将入口模块添加到模块依赖列表中；
紧接着通过 Compilation 对象的 buildModule 方法进行模块构建；
buildModule 方法中执行具体的 Loader，处理特殊资源加载；
build 完成过后，通过 acorn 库生成模块代码的 AST 语法树；
根据语法树分析这个模块是否还有依赖的模块，如果有则继续循环 build 每个依赖；
所有依赖解析完成，build 阶段结束；
最后合并生成需要输出的 bundle.js 写入 dist 目录。
