class EventEmitter {

  constructor () {
    /**
     * 以 key-value 形式存储事件类型和对应的处理函数，value 为数组，存放多个事件处理函数
     * Object.create(null) 创建的空对象不会有原型，非常纯净，当某些库修改了 Object 的原型后也不会受影响，但是 Object.create({}) 就有原型了
     */
    this.events = Object.create(null)
    this.maxHandlerCount = 10 // 允许注册的单个事件类型的最多事件处理函数数量
  }

  /**
   * 事件监听
   * @param {string} type 事件类型
   * @param {function} handler 事件处理函数
   */
  on (type, handler) {
    if (!this.events[type]) {
      this.events[type] = [] // 一个事件类型可以注册多个处理函数
    }
    this.events[type].push(handler)
  }

  /**
   * once 是监听后只执行一次，本质是定义一个包装函数，通过 on 去监听包装函数。当在包装函数里把传递进来的处理函数执行完后，包装函数移除在 on 上监听的包装函数
   * @param {string} type 事件类型
   * @param {function} handler 事件处理函数
   */
  once (type, handler) {
    var _self = this
    function wrapper () {
      handler.apply(this, arguments)
      _self.off(type, wrapper)
    }

    this.on(type, wrapper)

    return this
  }

  /**
   * 事件触发
   * @param {string} type 事件类型
   * @param  {...any} args 参数
   */
  emit (type, ...args) {
    const event = this.events[type]

    /**
     * 依次执行注册过的事件类型对应的所有处理函数
     */
    if (event) {
      for (var i = 0; i < event.length; i++) {
        event[i](...args)
      }
    }

    return this
  }

  /**
   * 移除事件监听
   * @param {string} type 事件类型
   * @param {function} handler 事件处理函数
   */
  off (type, handler) {
    const handlers = this.events[type]

    if (handlers && handlers.length) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }

  /**
   * 设置某类型事件的处理函数的最大值
   * @param {number} len 
   */
  setHandlerLength (len = 10) {
    this.maxHandlerCount = len
  }
}

const eventEmitter = new EventEmitter()
var i = 1

// 1. test click handler
eventEmitter.on('click', (params) => {
  console.log('i am clicked ===', params)
})

eventEmitter.emit('click', 'access params to click handler')

// 2. test off scrollHandler

function scrollHandler (params) {
  console.log('params ===', params, i++)
}

eventEmitter.on('scroll', scrollHandler)

eventEmitter.emit('scroll', 'i am canceled')
eventEmitter.emit('scroll', 'i am canceled')
eventEmitter.off('scroll', scrollHandler)
eventEmitter.emit('scroll', 'i am canceled')


// 3. test once
i = 1
function touchHandler () {
  console.log('touched', i++)
}

eventEmitter.once('touch', touchHandler)

eventEmitter.emit('touch')
eventEmitter.emit('touch')
eventEmitter.emit('touch')
console.log(eventEmitter)
