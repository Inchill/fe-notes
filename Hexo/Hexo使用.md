# 使用hexo快速搭建博客

## 前言

最近校招入职了滴滴，看到各位同事都有自己的博客。以前我自己从零到一写过博客项目，但是不甚满意，因为纯粹是为了模仿掘金。于是乎我打算找找有什么能快速搭建博客的工具，最后选中了hexo。

## 安装hexo-cli遇到的问题

我按照官网引导，全局安装了hexo-cli，但是初始化项目却提示这样的错误：hexo既不是内部命令也不是外部命令。起初我很纳闷，以前我全局安装vue、webpack一点问题都没有，如今却遇到这个问题。经过一番摸索，发现我的PATH路径不应该是`D:\nodejs\npm`。我先找到`hexo.cmd`文件所在目录，然后重新配置路径：`D:\nodejs\npm\node_modules`，再执行`hexo -v`，能够显示版本，大功告成。



**总结：D:\nodejs\npm\node_modules下是全局安装的包的cmd文件，D:\bodejs\npm\node_modules\node_modules里面才是这些包的完整项目结构。**

## 用markdown写出项目目录结构

使用treer工具。treer是一个目录树生成工具。

安装：

```powershell
npm i -g treer
```

查看版本：

```shell
treer --version
```

使用配方：

```js
treer   // 查看目录树
treer -d <指定路径>   // 查看指定路径目录树
treer -e <导出路径>   // 导出当前目录的目录树到特定路径下文件
treer -i "/^regex$"    // 忽略目录或文件
```

> treer -e D:\WebProjects\blog\treer.txt -i "/node_modules/"

**注意：将目录复制到markdown时记得用```包裹起来，不然最终显示的目录是混乱的。**

## 使用hexo搭建博客

### 一、开仓建库

仓库名称叫`inchill.github.io`

### 二、博客初始化

```shell
hexo init chuck-blog
cd chuck-blog
npm i
```

进入_config.yml文件。

```yml
url: http://yoursite.com 把这个改成你的github地址（例如：http://inchill.github.io）

deploy:
  type: git
  repo: git@github.com:inchill/inchill.github.io.git
  branch: master

```

### 三、博客发布

```shell
npm install hexo-deployer-git --save
hexo generate
hexo deploy
```

发布成功后，可在你的 GitHub 上看到博客的编译文件。博客地址： inchill.github.io

### 四、绑定域名

1. 添加CNAME在项目source目录下，注意CNAME没有后缀。在其中写入域名：`chuckliu.site`
2. 添加域名解析规则

新增域名解析规则，记录类型为CNAME，记录值为inchill.github.io。**注意：www和@都要分别创建。**

3. 这样配置其实还不能访问，会提示404，所以需要在GitHub上对项目配置，将项目绑定到域名上。**注意每次部署后都需要绑定域名**

打开GitHub项目，点击settings，拉到最下端，在Custom domain域名处写入www.chuckliu.site，然后保存即可正常访问。

### 五、新增博文

```shell
hexo new "文章标题"
```

新建的 markdown 文件会在 source/_posts 中，文章写在这个 markdown 文件中。文章标题、文章编辑时间、标签、分类等信息均可以手动修改。

> 博客里面的标签、分类会根据你的命名自动生成和更新。

```shell
hexo server
```

在发布前先本地预览。

### 六、主题修改

GitHub上有很多hexo theme，可以找自己喜欢的然后git clone，再在_config.yml 中的 theme: landscape处修改。

### 七、显示部分文章，及阅读更多按钮

在文章你想显示部分的地方加上:

```markdown
<!-- more -->

```

显示文章时也显示目录，在头部加上`toc: true`。如果文章有多个tag，在头部加上`tags: [webpack, vue, koa2, typescript]`
