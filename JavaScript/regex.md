[传送门](https://github.com/cdoco/learn-regex-zh)

> Safari 不支持反向断言，因此使用在线正则网站时不要使用 Safari。

正则表达式也被称为规则表达式，涉及的规则包含以下几大类：

1. 断言

2. 字符类

3. 组和范围

4. 量词

5. Unicode 属性转义

## 断言

这里重点讲一下断言。断言按照类型可以分为边界断言和其它的断言：

1. 边界断言

我们常用的边界断言无非是匹配开头 `^` 和匹配结尾 `$`，除了这两个以外，还有 `\b` 和 `\B`，前者匹配一个单词的边界，后者匹配一个非单词的边界。

2. 其它断言

|规则|含义|
|--|--|
|x(?=y)|向前断言: x 被 y 跟随时匹配 x。|
|x(?!y)|向前否定断言: x 没有被 y 紧随时匹配 x。|
|(?<=y)x|向后断言: x 跟随 y 的情况下匹配 x。|
|(?<!y)x|向后否定断言: x 不跟随 y 时匹配 x。|

## 组和范围

重点讲一下**具名捕获组**，其形式是：`(?<Name>x)`，匹配"x"并将其存储在返回的匹配项的 groups 属性中，该属性位于 <Name> 指定的名称下。尖括号(< 和 >) 用于组名。

例如，使用正则 /-(?<customName>\w)/ 匹配 “web-doc” 中的 “d”：

'web-doc'.match(/-(?<customName>\w)/).groups   //{customName: "d"}    
