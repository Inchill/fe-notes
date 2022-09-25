## promise 规范



## 实现 promise.all

```js
function promiseAll (iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable)
    const len = promises
    var ret = []
    var count = 0
    for (var i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(res => {
        ret.push(res)
        count++
        if (count === len) resolve(ret)
      }).catch(e => reject(e))
    }
  })
}
```

## 实现 promise.race

```js
function promiseRace (iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable)
    const len = promises
    for (var i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(res => {
        resolve(res)
      }).catch(e => reject(e))
    }
  })
}
```

## 实现并发控制

```js
function asyncPool (limit = 2, arr = [], iteratorFn) {
  const tasks = []
  const executings = []
  for (const execute of arr) {
    const p = Promise.resolve().then(() => iteratorFn(execute, arr))
    tasks.push(p)

    if (limit <= arr.length) {
      const e = p.then(e => executings.splice(executings.indexOf(e), 1))
      executings.push(e) // 保存正在执行的异步任务
      if (executings.length >= limit) {
        await Promise.race(executings) // 等待较快的任务执行完成
      }
    }
  }

  return Promise.all(tasks)
}
```
