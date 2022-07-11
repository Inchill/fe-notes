### js设计模式

react 中实现各种设计模式在线书籍：https://www.patterns.dev/posts/

设计模式的定义：在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案。用一个通俗的说法：设计模式是解决某个特定场景下对某种问题的解决方案。

1. 单例模式

单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。实现的方法为先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。

适用场景：一个单一对象。比如：弹窗，无论点击多少次，弹窗只应该被创建一次。

```js
    // es6写法
    class Singleton {
        constructor(name) {
            this.name = name;
            this.instance = null;
        }

        // 构造一个接口方便调用
        static getInstance(name) {
            if(!this.instance) this.instance = new Singleton(name);
            return this.instance;
        }
    }


    // es5写法
    var singleton = (function() {
        var instance;
        function init() {

        }

        return {
            getInstance() {
                if(!instance) instance = init();
                return instance;
            }
        }
    })();
```


2. 观察者模式(发布/订阅者模式)

```js
    const event = {
        clientList: [],
        listen(key, fn) {
            if(this.clientList[key]) {
                this.clientList[key] = [];
            }
            this.clientList[key].push(fn);
        },
        emit() {
            const key = Array.prototype.shift.call(arguments);
            const fns = this.clientList[key];
            if(!fns || fns.length === 0) return false;
            for(let i = 0, fn; fn = fns[i++]) {
                fn.apply(this, arguments);
            }
        },
        remove(key, fn) {
            const fns = this.clentList[key];
            if(!fns) return false;
            if(!fn) fns && fns.length = 0;
            else {
                for (let l = fns.length - 1; l>=0; l--) {
                    const _fn = fns[l]
                    if ( _fn ===fn) {
                        fns.splice(l, 1)
                    }
                }
            }
        }
    }
    const installEvent = (obj) => {
        for (let i in event) {
            obj[i] = event[i]
        }
    }

    // 然后就能增加发布和订阅功能了：
    const events = {}
    installEvent(events)
    // 订阅信息
    events.listen('newMessage',fn1 = (say) => {
        console.log('say:' + say)
    })
    // 发布信息
    events.trigger('newMessage',"Hello world")
    //移除订阅
    events.remove('newMessage',fn1)
```

为了加深理解，让我们来看一个具体的例子，有三个报纸出版社，报社一、报社二、报社三，有两个订报人，分别是:订阅者1，订阅者2。在这里出版社就是被观察者，订报人就是观察者.
- 被观察者(发布者)
```js
    //观察者模式：对程序中某一个对象的进行实时的观察，当该对象状态发生改变的时候 进行通知
    //被观察者
    var Publish = function (name) {
        this.name = name;
        this.subscribers = []; //数组中存着所有的订阅者(出版社名单)，数组的元素都是函数类型
    }
    //publish的实例对象去发布消息的方法
    Publish.prototype.deliver = function (news) {
        var publish = this;//this就代表报社
        this.subscribers.forEach(function (item) {
            //循环subscribers数组中所有的订报人，为他们发布内容。
            item(news,publish);//每个订阅者都收到了新闻（news），还有来自哪家报刊
        })
        return this;//为了方便，采用链式调用。
    }
```
- 观察者(订阅者)
```js
    //订阅者的方法,每一个订阅者都是一个函数,在函数原型上扩展一个方法
    Function.prototype.subscribe = function (publish) {//出版社形参
        var sub = this;//取得当前订阅者这个人
        //不能同时订一家出版社同一份报纸,没意义
        //publish.subscribers//张三，李四，王五，名字可能重复
        //publish.subscribers数组里面有的人，不能再订阅
        //我们使用ecma5里面的some方法，循环遍历数组的每一个元素，执行一个函数，如果有相同的名字则返回true，不相同则返回false
        var alreadExists = publish.subscribers.some(function (item) {
            return item ===sub;
        })
        //如果出版社名单没有这个人，则加入其中
        if(!alreadExists){
            publish.subscribers.push(sub);
        }
        return this;//为了方便，采用链式调用。
    }

    //具体的一个订阅者去取消订阅报纸的方法
    Function.prototype.unsubscribe = function(publish){
        var sub = this;//取得当前订阅者这个人
        // filter (过滤函数:循环便利数组的每一个元素，执行一个函数如果不匹配，则删除该元素)
        publish.subscribers = publish.subscribers.filter(function(item){
            return item !== sub ;
        });
        return this;//为了方便，采用链式调用。
    };
```

3. 工厂模式

```js
    var Car = (function () {
    var Car = function (model, year, miles) {
            this.model = model;
            this.year = year;
            this.miles = miles;
        };
        return function (model, year, miles) {
            return new Car(model, year, miles);
        };
    })();

    var tom = new Car("Tom", 2009, 20000);
    var dudu = new Car("Dudu", 2010, 5000);
```
