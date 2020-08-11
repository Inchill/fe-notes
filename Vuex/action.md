Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。

- Action 可以包含任意异步操作。

## 分发action

action通过store.dispatch触发，在其中可以执行异步操作，异步操作成功后可以提交commit变更状态。

## 结合promise

action函数里返回一个promise，然后在调用store.dispatch时可以跟then调用异步执行结果。

## 使用ES7的async/await

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```
