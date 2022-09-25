### apply，call，bind的区别

**相同点**

- 都可以改变this指向，第一个参数为this要绑定的对象

**区别**

- apply第二个参数接收的是数组，而call接收单个单个的参数

- bind会返回一个新函数，需要我们手动调用

```js
    var a ={
        name : "Cherry",
        fn : function (a,b) {
            console.log( a + b)
        }
    }

    var b = a.fn;
    b.bind(a,1,2);     // 无输出
    b.bind(a,1,2)();           // 3
```

### 手写apply

```js
    Function.prototype.myApply = function(ctx, args) {
        ctx = ctx || window;    // 不传参数就是给window
        args = args ? args : [];
        //给context新增一个独一无二的属性以免覆盖原有属性
        const key = Symbol();
        ctx[key] = this;
        //通过隐式绑定的方式调用函数
        const res = ctx[key](...args);
        //删除添加的属性
        delete ctx[key];
        //返回函数调用的返回值
        return res;
    }
```

### 手写bind

```js
    Function.prototype.myBind = function(ctx, ...args) {
        var self = this;
        args = args ? args : [];
        return function(...newArgs) {
            return self.apply(ctx, [...args, ...newArgs]);
        }
    }

    Function.prototype.myBind = function(ctx) {
        let self = this;
        let context = [].shift.call(arguments);   // 弹出第一个参数(将this绑定到上面)
        let args = [].slice.call(arguments);  // 截取剩下的参数成为一个数组(因为下面用到apply，第二个参数必须是数组)
        return function() {
            return self.apply(context, [].concat(args, [].slice.call(arguments)));    // 注意第二个参数不是args，是因为当前函数的参数也得加上，因此调用concat方法，此时的arguments为闭包的参数
        }
    }
```

### 手写call

```js
    // ...是es6扩展运算符，可拼接可复制数组
    Function.prototype.myCall = function(ctx, ...args) {
        ctx = ctx || window;    // 不传参数就是给window
        args = args ? args : [];
        //给context新增一个独一无二的属性以免覆盖原有属性
        const key = Symbol();
        ctx[key] = this;
        //通过隐式绑定的方式调用函数
        const res = ctx[key](...args);
        //删除添加的属性
        delete ctx[key];
        //返回函数调用的返回值
        return res;
    }
```