# es6 map 原理

Map利用链表，hash的思想来实现。

首先，Map可以实现删除，而且删除的数据可以是中间的值。而链表的优势就是在中间的任意位置添加，删除元素都非常快，不需要移动其他元素，直接改变指针的指向就可以。

而在存储数据很多的情况下，会导致链条过长，导致查找效率慢，所以我们可以创建一个桶（存储对象的容器），根据hash（把散列的值通过算法变成固定的某值）来平均分配数据，防止链条过长。

模拟 Map 的代码如下：


```js
function _Map () {
  this.init()
}

_Map.prototype.init = function () {
  this.size = 6
  this.arr = new Array(this.size)
  for (var i = 0; i < this.size; i++) {
    this.arr[i] = new Object()
    this.arr[i].next = null
  }
}

_Map.prototype.set = function (key, value) {
  var index = this.hash(key)
  var tempObj = this.arr[index]
  while (tempObj.next) {
    if (tempObj.next.key === key) {
      tempObj.next.value = value
      return
    } else {
      tempObj = tempObj.next
    }
  }

  tempObj.next = {
    key: key,
    value: value,
    next: null
  }
}

_Map.prototype.get = function (key) {
  var index = this.hash(key)
  var tempObj = this.arr[index]

  while (tempObj) {
    if (tempObj.key === key) {
      return tempObj.value
    } else {
      tempObj = tempObj.next
    }
  }

  return undefined
}

_Map.prototype.delete = function (key) {
  var index = this.hash(key)
  var tempObj = this.arr[index]

  while (tempObj) {
    if (tempObj.next.key === key) {
      tempObj.next = tempObj.next.next
      return true
    } else {
      tempObj = tempObj.next
    }
  }
}

_Map.prototype.has = function (key) {
  var index = this.hash(key)
  var tempObj = this.arr[index]

  while (tempObj) {
    if (tempObj.key === key) {
      return true
    } else {
      tempObj = tempObj.next
    }
  }

  return false
}

_Map.prototype.clear = function () {
  this.init()
}

_Map.prototype.hash = function (key) {
  var index = 0
  if (typeof key === 'string') {
    for (var i = 0; i < 3; i++) {
        index = index + isNaN(key.charCodeAt(i)) ? 0 : key.charCodeAt(i);
    }
  } else if (typeof key === 'object') {
    index = 0
  } else if (typeof key === 'number') {
    index = isNaN(key) ? 7 : key
  } else {
    index = 1
  }

  return index % this.size
}
```