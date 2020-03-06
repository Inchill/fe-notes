### new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：

- 1. 创建一个空的简单JavaScript对象（即{}）；
- 2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
- 3. 将步骤1新创建的对象作为this的上下文 ；
- 4. 如果该函数没有返回对象，则返回this。

```javascript
    // 伪代码解释new 的过程
    // 1.创建一个空对象
    var o = {};
    // 2.o的原型对象指向构造函数F的原型对象
    o.__proto__ = F.prototype;
    // 3.将this绑定到o
    F.call(o);
    // 4.返回新对象
    return o;
```

**new模拟实现**

```javascript
    // Fn是构造函数
    function _new(Fn, ...args) {
        if(typeof Fn !== 'function') {   // 检测构造函数是否是函数
            throw new TypeError('constructor is not a function');
        }
        
        // 1.创建一个空的JavaScript对象
        const obj = {};
        // 2.将obj.__proto__指向Fn.prototype
        Object.setPrototypeOf(obj, Fn.prototype)
        // 3.将this绑定到obj
        const result = Fn.apply(obj, ...args);
        // 4.返回新对象(如果Fn函数没有返回对象，则返回this)
        return result instanceof Object ? result : obj;
    }
```