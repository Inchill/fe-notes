# 复杂基础类型

## 元组

本质上来说，ts 中的数组和元组转译为 js 后都是数组，这里我们重点看下 ts 里提供的元组类型。

元组最重要的特性就是限制数组元素的个数（包括顺序）和类型，所以它特别适合用来返回多个值的场景。举一个官网的例子：

```ts
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```

定义了一个包含字符串和数字类型的元组，初始化的时候必须按照固定的个数和类型来定义，而且顺序必须保持一致，否则就会报错。

在访问元组变量的时候，只有特定元素类型具有的方法才能被使用，比如使用字符串类型的 `substr` 方法：

```ts
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

当访问或者是使用元组的越界元素时，此时元组的类型会被替换为联合类型。比如上述定义的字符串和数字元组，在越界访问的时候，该元组的表现行为就是联合类型：

```ts
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型
```

**根据第三方库的良好实践来看，当返回值的类型个数超过 2 个时，会更倾向于使用对象来替代元组。**

## any

某些值来自于动态内容，因此若想使用对应类型的属性和方法，就必须使用 `any` 关键字进行声明。需要注意的是，`any` 类型会在对象的调用链中进行传导。

## unknown

unknown 是 TypeScript 3.0 中添加的一个类型，它主要用来描述类型并不确定的变量。

比如在多个 if else 条件分支场景下，它可以用来接收不同条件下类型各异的返回值的临时变量，如下代码所示：

```ts
let result: unknown;

if (x) {
  result = x();
} else if (y) {
  result = y();
} ...
```

在 3.0 以前的版本中，只有使用 any 才能满足这种动态类型场景。官方之所以增加 `unknown` 类型，是因为为了确保类型更安全，也就是说 ts 会对 unknown 进行类型检查，而对 `any` 则不会。

## void、undefined、null

void 用于表示函数没有返回值。

单纯声明 undefined、null 没有太大的意义，undefined 主要用于接口类型上，表示一个可缺省、未定义的属性。

这里分享一个稍微有点费解的设计：我们可以把 undefined 值或类型是 undefined 的变量赋值给 void 类型变量，反过来，类型是 void 但值是 undefined 的变量不能赋值给 undefined 类型。

```ts
const userInfo: {
  id?: number;
} = {};

let undeclared: undefined = undefined;
let unusable: void = undefined;
unusable = undeclared; // ok
undeclared = unusable; // ts(2322)
```

null 的价值更多体现在接口定制上，特别适合于前后单接口交互的场景里。

## never

never 表示永远不会发生值的类型。never 是所有类型的子类型，它可以给所有类型赋值。

```ts
let Unreachable: never = 1; // ts(2322)
Unreachable = 'string'; // ts(2322)
Unreachable = true; // ts(2322)
let num: number = Unreachable; // ok
let str: string = Unreachable; // ok
let bool: boolean = Unreachable; // ok
```

但是反过来，除了 never 自身以外，其他类型（包括 any 在内的类型）都不能为 never 类型赋值。

## 类型断言

TypeScript 类型检测无法做到绝对智能，毕竟程序不能像人一样思考。有时会碰到我们比 TypeScript 更清楚实际类型的情况，比如下面的例子：

```ts
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2); // 提示 ts(2322)
```

其中，greaterThan2 一定是一个数字（确切地讲是 3），因为 arrayNumber 中明显有大于 2 的成员，但静态类型对运行时的逻辑无能为力。find 函数块内的运行时代码，ts 无法智能推导，因此需要开发者在函数块里做好类型断言。

在 TypeScript 看来，greaterThan2 的类型既可能是数字，也可能是 undefined，所以上面的示例中提示了一个 ts(2322) 错误，此时我们不能把类型 undefined 分配给类型 number。这时候可以使用 as 关键字声明为 number 类型。

其实，运行时逻辑会在很多场景下出现，比如获取 DOM 元素。
