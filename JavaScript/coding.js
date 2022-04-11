let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
  {id: 6, name: '部门6', pid: 0}
]

var tree = [
  {
      "id": 1,
      "name": "部门1",
      "pid": 0,
      "children": [
          {
              "id": 2,
              "name": "部门2",
              "pid": 1,
              "children": []
          },
          {
              "id": 3,
              "name": "部门3",
              "pid": 1,
              "children": [
                  {
                      "id": 4,
                      "name": "部门4",
                      "pid": 3,
                      "children": [
                          {
                              "id": 5,
                              "name": "部门5",
                              "pid": 4,
                              "children": []
                          }
                      ]
                  }
              ]
          }
      ]
  },
  {
      "id": 6,
      "name": "部门6",
      "pid": 0,
      "children": []
  }
]

// 扁平数据转 tree
function getTree (arr = []) {
  return arr.map(cur => {
    const children = arr.filter(item => item.pid === cur.id)
    if (children.length) {
      getTree(children)
    }
    cur.children = children
    return cur
  }).filter(item => item.pid === 0)
}

const res = getTree(arr)
console.log(res)

// tree 转扁平数组
function treeToArray (tree = [], ret = []) {
  var res = []
  tree.map(cur => {
    if (cur.children.length) {
      var _res = treeToArray(cur.children, ret)
      res = res.concat(_res)
    }
    const { id, name, pid } = cur
    ret.push({ id, name, pid })
    res.push({ id, name, pid })
    return cur
  })
  return res.sort((a, b) => a.id - b.id)
}

const ret = []
treeToArray(tree, ret)
const _ret = treeToArray(tree)
ret.sort((a, b) => a.id - b.id)
console.log('ret\n', ret)
console.log('_ret\n', _ret)

