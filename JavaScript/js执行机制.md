### 参见images中的js执行机制导图

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。

- 当指定的事情完成时，Event Table会将这个函数移入Event Queue。

- 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。

- 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

### Promise与process.nextTick(callback)

除了广义的同步任务和异步任务，我们对任务有更精细的定义：

- macro-task(宏任务)：包括整体代码script，setTimeout，setInterval，setImmediate， NodeJS的I/O
- micro-task(微任务)：Promise，process.nextTick

不同类型的任务会进入对应的Event Queue，比如setTimeout和setInterval会进入相同的Event Queue。

事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。

### setTimeOut和promise区别?

- 前者属于宏任务，后者属于微任务
- setTimeout返回的函数是一个新的task, macro task queue,所以Promise会先于新task执行
- Promise本身是同步的立即执行函数， 当在 executor 中执行 resolve 或者 reject 的时候, 此时是异步操作， 会先执行 then/catch 等，当主栈完成后，才会去调用 resolve/reject 中存放的方法执行，打印 p 的时候，是打印的返回结果，一个 Promise 实例。