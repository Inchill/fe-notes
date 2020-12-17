# JavaScript Style

## 1. ES 模块

### 1.1 导入

Import 语句不能换行，因此是 80 列限制的例外。

#### 1.1.1 导入路径

ES 模块文件必须使用 import 语句导入其他 ES 模块文件. 不要用 require 导入 ES 模块.

##### 1.1.1.1 .js文件扩展名在导入路径中不是可选的，必须始终包含在其中。

##### 1.1.1.2 不要多次导入同一文件。

##### 1.1.1.3 命名导入

###### 1.1.1.3.1 导入模块命名

模块导入名称（import*as name）是从导入的文件名派生出来的小驼峰命名。

```js
import * as fileOne from '../file-one.js';
import * as fileTwo from '../file_two.js';
import * as fileThree from '../filethree.js';
```

```js
import * as libString from './lib/string.js';
import * as math from './math/math.js';
import * as vectorMath from './vector/math.js';
```

###### 1.1.1.3.2 默认模块导入

```js
import MyClass from '../my-class.js';
import myFunction from '../my_function.js';
import SOME_CONSTANT from '../someconstant.js';
```

###### 1.1.1.3.3 命名模块导入

通常，通过命名（import{name}）导入的模块应该保持相同的名称.避免混淆导入（import{SomeThing as SomeOtherThing}）。推荐通过使用模块导入（import*）或重命名导出来修复名称冲突。

```js
import * as bigAnimals from './biganimals.js';
import * as domesticatedAnimals from './domesticatedanimals.js';

new bigAnimals.Cat();
new domesticatedAnimals.Cat();
```

如果需要重命名命名模块，则在别名中使用导入模块的文件名或者路径名。

```js
import {Cat as BigCat} from './biganimals.js';
import {Cat as DomesticatedCat} from './domesticatedanimals.js';

new BigCat();
new DomesticatedCat();
```

### 1.2 导出

#### 1.2.1 命名导出 vs 默认导出

在所有代码中使用命名导出。您可以将 export 关键字应用于声明，或使用 export{name}；语法。

<font color="red">
```js
// Do not use default exports:
export default class Foo { ... } // BAD!
```
</font>

```js
// Use named exports:
export class Foo { ... }
```

```js
// Alternate style named exports:
class Foo { ... }

export {Foo};
```

#### 1.2.2 导出静态容器类和对象

不要为了命名空间而导出带有静态方法或属性的容器类或对象。

<font color="red">
```js
// container.js
// 错误: Container 是一个含有静态方法的类
export class Container {
  /** @return {number} */
  static bar() {
    return 1;
  }
}

/** @const {number} */
Container.FOO = 1;
```
</font>

相反，导出单个常量和函数：

```js
/** @return {number} */
export function bar() {
  return 1;
}

export const /** number */ FOO = 1;
```

#### 1.2.3 导出易变性

导出的变量不能在模块初始化之外发生变化。

如果需要变更,还有其他方式,包括导出对具有可变字段对象的常量引用或导出可变数据的访问函数。

### 1.3 ES 模块中的循环依赖

不要在ES模块之间创建循环，即使ECMAScript规范允许这样做。

### 1.4 与闭包互操作

#### 1.4.1 参考谷歌

要引用闭包 goog 命名空间，导入 goog.js.

```js
import * as goog from '../closure/goog/goog.js';

const name = goog.require('a.name');

export const CONSTANT = name.compute();
```

goog.js 仅从全局 goog 导出可用于 ES 模块的属性子集。

#### 1.4.2 goog.require 在 ESM 中的使用

