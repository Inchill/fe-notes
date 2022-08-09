### this关键字

this 是 JavaScript 的关键字，指函数执行时的上下文，跟函数定义时的上下文无关。随着函数使用场合的不同，this 的值会发生变化。但是有一个总的原则，那就是 this 指代的是调用函数的那个对象。

1. **全局上下文**

在全局上下文中，也就是在任何函数体外部，this 指代全局对象。

```js
    // 在浏览器中，this 指代全局对象 window
    console.log(this === window);  // true
```

2. **函数上下文**

在函数上下文中，也就是在任何函数体内部，this 指代调用函数的那个对象。

- **函数调用中的 this**

```js
    function f1(){
        return this;
    }

    console.log(f1() === window); // true
```

- **对象方法中的 this**

```js
    var o = {
        name: "stone",
        f: function() {
            return this.name;
        }
    };

    console.log(o.f()); // "stone"
```

- **eval() 方法中的 this**

```js
    // 全局上下文
    function f1(){
        return eval("this");
    }
    console.log(f1() === window); // true

    // 函数上下文
    var o = {
        name: "stone",
        f: function() {
            return eval("this.name");
        }
    };
    console.log(o.f()); // "stone"
```

```js
var name = '123'
var obj = {
    name: '456',
    getName () {
        function printName () {
            console.log(this.name)
        }
        printName() // this的值取决于调用上下文，如果一个函数不是作为某个对象的方法被调用，那么this就是global object.否则就是该对象。
    },
    logName () {
        console.log(this.name)
    },
    log: () => {
        console.log(this.name)
    }
}
obj.getName() // 123
obj.logName() // 456
obj.log() // 123
```

- **call() 和 apply() 方法中的 this**

call() 和 apply() 是函数对象的方法，它的作用是改变函数的调用对象，它的第一个参数就表示改变后的调用这个函数的对象。因此，this 指代的就是这两个方法的第一个参数。

```js
    var x = 0;　　
    function f() {　　　　
        console.log(this.x);　　
    }　　
    var o = {};　　
    o.x = 1;
    o.m = f;　　
    o.m.apply(); // 0
```

call() 和 apply() 的参数为空时或者为 null/undefined，默认调用全局对象。

- **bind() 方法中的 this**

ECMAScript 5 引入了 Function.prototype.bind。调用 f.bind(someObject) 会创建一个与 f 具有相同函数体和作用域的函数，但是在这个新函数中，this 将永久地被绑定到了 bind 的第一个参数，无论这个函数是如何被调用的。如下代码所示：

```js
    function f() {
        return this.a;
    }

    var g = f.bind({
        a: "stone"
    });
    console.log(g()); // stone

    var o = {
        a: 28,
        f: f,
        g: g
    };
    console.log(o.f(), o.g()); // 28, stone
```

- **DOM 事件处理函数中的 this**

一般来讲，当函数使用 addEventListener，被用作事件处理函数时，它的 this 指向触发事件的元素。如下代码所示：

```html
    <!DOCTYPE HTML>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>test</title>
    </head>
    <body>
        <button id="btn" type="button">click</button>
        <script>
            var btn = document.getElementById("btn");
            btn.addEventListener("click", function(){
                this.style.backgroundColor = "#A5D9F3";
            }, false);
        </script>
    </body>
    </html>
```


### js如何实现链式调用？

只需在方法调用后返回this即可。

```js
    var user = function(name, age) {
        this.name= name;
        this.age = age;
    }
    user.prototype.getName = function() {
        console.log(this.name);
        return this;
    }
    user.prototype.getAge = function() {
        console.log(this.age);
        return this;
    }
    var u = new user('chuck', 22);
    u.getName().getAge();
```

### 自执行函数

```js
var data = []
for (var i = 0; i < 3; i++) {
    data[i] = (function log (i) { // 被 () 包起来的函数只是声明（可以是匿名函数也可以是有名函数），立即执行时传递的参数是实参，函数声明里的参数是形参，可以随意命名
    return function () {
        console.log(i)
    }
    })(i) // ()(i) 等同于调用 log(i)
}
data[0]()
data[1]()
data[2]()
```