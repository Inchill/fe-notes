// for(var i = 0; i < 100; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, 100)
// }

// const numbers = ['1', '2', '24'];
// numbers[4] = 4;
// numbers.unshift(5);
// numbers.pop();
// console.log(numbers.length);

// class Animal {
//     constructor(name) {
//         this.props = {
//             name
//         }
//     }
//     canFly() {
//         return this.props.name === 'bird'
//     }
//     fly() {
//         if(this.canFly()) {
//             console.log('i am a bird, i can fly')
//         }else {
//             console.log('i am not a bird');
//         }
//     }
// }
// const bird = new Animal('bird');
// bird.fly();


// function fn(n) {
//     if(n == 2) {
//         return 2;
//     }else {
//         return n*(n-1) + fn(n-1);
//     }
// }
// console.log(fn(3));

// var v = 123;
// function foo(){
//     var v = 456;
//     function inner(){
//         console.log(v)
//     }
//     return inner
// }

// result = foo()
// console.log(result())


// Name='root';
// Age = 18;
// function Foo(name,age){
//     this.Name = name;
//     this.Age = age;
//     this.Func = function(){
//         console.log(this.Name,this.Age);
//         (function(){
//             console.log(this.Name,this.Age);
//         })();
//     }
// }
// obj = new Foo('alex',666);
// obj.Func()



// 求1到n的素数
// function test(n) {
//     for(var i = 2; i < n ; i++) {
//         if(n%i === 0) return false;
//     }
//     return true
// }

// function primeNumber(num) {
//     var arr = [];
//     for(var i = 1; i <= num; i++) {
//         if(test(i)) arr.push(i);
//     }
//     console.log(arr);
// }

// primeNumber(10);



// 快排
// function QuickSort(arr) {
//     if(arr.length <= 1) {
//         return arr;
//     }
//     // 定义基准，以数组中间数为准
//     const pivotIndex = Math.floor(arr.length / 2);
//     // 取出基准元素
//     const pivot = arr.splice(pivotIndex, 1)[0];
//     const left = [], right = [];
//     arr.forEach(item => {
//         if(item < pivot) {
//             left.push(item);
//         }else{
//             right.push(item);
//         }
//     })
//     // 使用递归继续对左右数组快排
//     return QuickSort(left).concat(pivot, QuickSort(right));
// }
// const arr = [98, 42, 25, 54, 15, 3, 25, 72, 41, 10, 121];
// console.log(QuickSort(arr));

// 冒泡排序
// function bubbleSort(arr) {
//     var len = arr.length;
//     for(var i = 0; i < len - 1; i++) {
//         for(var j = i + 1; j < len; j++) {
//             if(arr[i] > arr[j]) {
//                 var tmp = arr[i];
//                 arr[i] = arr[j];
//                 arr[j] = tmp;
//             }
//         }
//     }
//     console.log(arr);
// }
// var arr = [9,8,4,6,2,1,7,3,5];
// bubbleSort(arr);

// 选择排序
// function selectionSort(arr) {
//     var len = arr.length;
//     var minIndex, temp;
//     for(var i = 0; i < len - 1; i++) {
//         minIndex = i;
//         for(var j = i + 1; j < len; j++) {
//             if(arr[j] < arr[minIndex]) {    //寻找最小的数
//                 minIndex = j;      //将最小数的索引保存
//             }
//         }
//         temp = arr[i];
//         arr[i] = arr[minIndex];
//         arr[minIndex] = temp;
//     }
//     console.log(arr);
// }
// var arr = [9,8,4,6,2,1,7,3,5];
// selectionSort(arr);

// 插入排序
// function insertionSort(arr) {
//     var len = arr.length;
//     var preIndex, currentValue;
//     for(var i = 1; i < len; i++) {
//         preIndex = i - 1;
//         currentValue = arr[i];
//         while(preIndex >= 0 && arr[preIndex] > currentValue) {
//             arr[preIndex + 1] = arr[preIndex];
//             preIndex--;
//         }
//         arr[preIndex + 1] = currentValue;
//     }
//     return arr;
// }
// var arr = [9,8,4,6,2,1,7,3,5];
// alert(insertionSort(arr));


// 输出乱序数组
// function disorder(arr) {
//     var newArr = [];
//     var len = arr.length;
//     for(var i = 0; i < len; i++) {
//         // 随即下标
//         var idx = Math.floor(Math.random() * arr.length);
//         newArr.push(arr[idx]);
//         arr.splice(idx, 1);
//     }
//     var res = [...newArr, ...arr];
//     console.log(res);
// }
// var arr = [1,2,3,4,5,6,7,8,9];
// disorder(arr);



// 查找排好序的指定的第一个字符
// function findIndex(arr, key) {
//     var idx = arr.indexOf(key);
//     console.log(idx);
// }
// var arr = [1,6,5,3,2,12,33,44,55,66,223];
// findIndex(arr, 33);
// function findIndex(arr, key) {
//     var low = 0, high = arr.length - 1;
//     while(low <= high) {
//         var mid = Math.floor((low + high) / 2);
//         if(arr[mid] == key) {
//             return mid;
//         }else if(key < arr[mid]){
//             high = mid - 1;
//         }else {
//             low = mid + 1;
//         }
//     }
// }
// var arr = [1,6,5,3,2,12,33,44,55,66,223];
// var idx = findIndex(arr, 33);
// console.log(idx, arr[idx]);



// 实现一个函数调用一次自增一次
// var getI = (function increment() {
//     let i = 0;
//     return function() {
//         return i++;
//     }
// })()
// console.log(getI());
// console.log(getI());
// console.log(getI());



// 先中后序遍历二叉树
// function TreeCode() {
//     let BiTree = function(ele) {
//         this.data = ele;
//         this.lchild = null;
//         this.rchild = null;
//     }
//     this.createTree = function() {
//         let biTree = new BiTree('A');
//         biTree.lchild = new BiTree('B');
//         biTree.rchild = new BiTree('C');
//         biTree.lchild.lchild = new BiTree('D');
//         biTree.lchild.rchild = new BiTree('E');
//         biTree.rchild.lchild = new BiTree('F');
//         biTree.rchild.rchild = new BiTree('G');
//         return biTree;
//     }
// }

//前序遍历
// function ProOrderTraverse(biTree) {
//     if (biTree == null) return;
//     console.log(biTree.data);
//     ProOrderTraverse(biTree.lChild);
//     ProOrderTraverse(biTree.rChild);
// }
// //中序遍历
// function InOrderTraverse(biTree) {
//     if (biTree == null) return;
//     InOrderTraverse(biTree.lChild);
//     console.log(biTree.data);
//     InOrderTraverse(biTree.rChild);
// }
// //后续遍历
// function PostOrderTraverse(biTree) {
//     if (biTree == null) return;
//     PostOrderTraverse(biTree.lChild);
//     PostOrderTraverse(biTree.rChild);
//     console.log(biTree.data);
// }
// let myTree = new TreeCode();
// console.log(myTree.createTree());
// console.log('前序遍历')
// ProOrderTraverse(myTree.createTree());
// console.log('中序遍历')
// InOrderTraverse(myTree.createTree());
// console.log('后续遍历')
// PostOrderTraverse(myTree.createTree());

// // 深度优先（栈）
// function DFS(biTree) {
//     let stack = [];
//     stack.push(biTree);
//     while(stack.length != 0) {
//         let node = stack.pop();
//         console.log(node.data);
//         if (node.rChild) {
//             stack.push(node.rChild);
//         }
//         if (node.lChild) {
//             stack.push(node.lChild);
//         }
//     }
// }
// //广度优先非递归(队列)
// function BFS(biTree) {
//     let queue = [];
//     queue.push(biTree);
//     while (queue.length != 0) {
//         let node = queue.shift();
//         console.log(node.data);
//         if (node.lChild) {
//             queue.push(node.lChild);
//         }
//         if (node.rChild) {
//             queue.push(node.rChild);
//         }
//     }

// }



// JSONP
// function JSONP(url) {
//     var script = document.createElement('script');
//     script.src = url;
//     script.type = 'text/javascript';
//     document.getElementsByTagName('head')[0].appendChild(script);
//     function getData(data) {
//         console.log(data);
//     }
// }
// function btnClick() {
//     JSONP('http://localhost:63342/Ajax/data.php?callback=getData');
// }


// 顺时针数组
// var test = function (matrix) {
//     var x, y, border = [x = y = 0, matrix.length - 1], result = [];
//     while (x <= border[1] || y <= border[1]) {
//         result.push(matrix[y][x]);
//         if (y == border[0] && x < border[1]) x++;
//         else if (x == border[1] && y < border[1]) y++;
//         else if (y == border[1] && x > border[0]) x--;
//         else if (x == border[0] && y > border[0]) y--;
//         if (x == border[0] && y == border[0]) {
//             y = x = ++border[0];
//             border[1]--;
//         }
//     }
//     return result;
// }
// // test
// var arr = test([[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]);
// console.log(arr);


// 替换每一个空格
// function replaceSpace(str)
// {
//     // write code here
//     str = str.replace(new RegExp(' ', 'gm'), '%20');
//     return str;
// }
// console.log(replaceSpace('hello  world'));


// 链表从尾到头输出
// function ListNode(x){
//     this.val = x;
//     this.next = null;
// }
// function printListFromTailToHead(head)
// {
//     // write code here
//     var arr = [];
//     while(head!=null) {
//         arr.push(head.val);
//         head = head.next;
//     }
//     arr = arr.reverse();
//     return arr;
// }
// var head = new ListNode(1);
// head.next = new ListNode(2);
// head.next.next = new ListNode(3);
// head.next.next.next = new ListNode(4);
// console.log(printListFromTailToHead(head));



// 深拷贝（忽略undefined、symbol、函数，不能解决循环引用）
// function deepClone(obj) {
//     var newObj = JSON.parse(JSON.stringify(obj));
//     return newObj;
// }
// let a = [1,2,3];
// let b = deepClone(a);
// b[5] = 6;
// console.log(a, b);


// 手写bind
// Function.prototype.bind = function(context) {
//     var self = this;  //this => Function
//     var context = [].shift.call(arguments);  //arguments 的第一个为需要绑定的this上下文
//     var args = [].slice.call(arguments);  // arguments除了第一个，成为一个数组
//     return function() {
//         return self.apply(context, [].concat(args, [].slice.call(arguments)));
//     }
// }


// 判断是否是数组或对象
// console.log([].constructor === Array);
// console.log([] instanceof Array);
// console.log({}.constructor === Object);
// console.log({} instanceof Object);
// function a() {};
// console.log(typeof a);


// 全局添加前缀
// function log() {
//     var s = arguments[0];
//     s = 'app' + String(s);
//     for(var i = 1; i < arguments.length; i++) {
//         s += arguments[i];
//     }
//     console.log(s);
// }
// log('hello world', 'hi', 'hello world2');


// 原生Ajax
// var xhr = new XMLHttpRequest();
// xhr.open('get', 'https://easy-mock.com/mock/5d57c1c8e62dfd678c7ba783/ReactMock/getTodoList', true);
// xhr.send(null);
// xhr.onreadystatechange = function() {
//     if(xhr.readyState == 4) {
//         if(xhr.status == 200) {
//             var data = xhr.responseText;
//             console.log(data);
//         }
//     }
// }

// var xhr = null;
// try{
//     xhr = new XMLHttpRequest();
// }catch(e) {
//     xhr = new ActiveXObject('Microsoft.XMLHTTP');
// }
// xhr.open('post', url, true);
// // send data
// xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
// xhr.send(data);
// xhr.onreadystatechange = function() {
//     if(xhr.readyState == 4 && xhr.status == 200) {
//         document.write(xhr.responseText);
//     }
// }



// 两个栈模拟一个队列
// var inStack = [],
//     outStack = [];
// function push(node) {
//     inStack.push(node);
// }
// function pop() {
//     if (!outStack.length) {
//         while (inStack.length) {
//             outStack.push(inStack.pop());
//         }
//     }
//     return outStack.pop();
// }
// push(1);
// push(2);
// console.log(pop());
// console.log(pop());


// 十进制转二进制并统计1的个数
// function NumberOf1(n)
// {
//     // write code here
//     //转为二进制
//     var a = [];    //用于存放二进制
//     var remainder;
//     if(n >= 0) {
//         while(n != 0) {
//             remainder = n % 2;
//             n = Math.floor(n / 2);
//             a.push(remainder);
//         }
//         var count = 0;
//         for(var i = 0; i < a.length; i++) {
//             if(a[i] == 1) count++;
//         }
//         a = a.reverse();
//         console.log(a);
//         return count;
//     }else {
//         n = -n;
//         while(n != 0) {
//             remainder = n % 2;
//             n = Math.floor(n / 2);
//             a.push(remainder);
//         }
//         var count = 1;
//         for(var i = 0; i < a.length; i++) {
//             if(a[i] == 0) a[i] = 1;
//             else if(a[i] == 1) a[i] = 0;
//         }
//         for(var i = 0; i < a.length; i++) {
//             if(a[i] == 1) count++;
//         }
//         a = a.reverse();
//         console.log(a);
//         return count;
//     }
// }
// console.log(NumberOf1(42));


// function a() {
//     console.log(this.a + this.b);
// }
// // bind只能用一次，因为返回了一个函数，第二次第三次调用相当于包裹了apply/call
// a.bind({a:10, b:20}).bind({a:1, b:2}).bind({a:2, b:4})();

// function stringTrim(str) {
//     str = str.replace(/[0-9]/ig,"");
//     return str;
// }
// console.log(stringTrim('he12ll333o'));


// let和const会造成暂时性死区
// console.log(foo);
// console.log(bar);
// var foo = 1;
// let bar = 2;
// // const bar = 2;


// function myReverse(str) {
// var a = [];
// var j = str.length - 1;
// for(var i = 0; i < str.length; i++) {
//     a[j] = str[i];
//     j--;
// }
// var s = '';
//     for(var i = 0; i < a.length; i++) {
//         s = s.concat(a[i]);     
//     }
//     return s;
// }
// console.log(myReverse('hello'));



// v-model双向绑定
// let car = {}
// let val = 3000
// Object.defineProperty(car, 'price', {
//     get(){
//         console.log('price属性被读取了')
//         return val
//     },
//     set(newVal){
//         console.log('price属性被修改了')
//         val = newVal
//     }
// })


// 千分位划分
// function addComma(num) {
//     var arr = [];
//     for(var i = num.length - 1, j = 1; i >= 0; i--, j++) {
//         arr.unshift(num[i]);
//         if(j % 3 == 0 && i != 0) arr.unshift(',');
//     }
//     return arr.join('');
// }
// console.log(addComma('123456789'));



// var a = [1,2,3,4,5,6,7,8,9,6];
// console.log(a.lastIndexOf(6));   //9
// console.log(a.lastIndexOf(6, 8));   //5


// function createFunctions() {
//     var result = new Array();
//     for(var i = 0; i < 10; i++) {
//         result[i] = function() {
//             return i;
//         }
//     }
//     return result;
// }

// var res = createFunctions();
// console.log(res[0]());             //10


// function createFunctions() {
//     var result = new Array();
//     for(var i = 0; i < 10; i++) {
//         result[i] = function(num) {
//             return function() {
//                 return num;
//             }
//         }(i);
//     }
//     return result;
// }
// var res = createFunctions();
// console.log(res[0]());               //0


// function findMax(str) {
//     var json = str.split('').reduce((m, n) => (m[n]++ || (m[n] = 1), m), {});

//     //存储出现次数最多的值和次数
//     var number = '';
//     var num = 0;
//     //遍历json  使用打擂算法统计需要的值
//     for(var j in json){
//         //如果当前项大于下一项
//         if (json[j]>num) {
//             //就让当前值更改为出现最多次数的值
//             num = json[j];
//             number = j;
//         }
//     }
//     console.log(number + ' ' + num);
// }
// findMax('successdddd');


// v-model双向绑定原理
// var obj = {
//     val: 3000
// }
// Object.defineProperty(obj, 'price', {
//     get() {
//         console.log('price属性被读取');
//         return obj.val;
//     },
//     set(newVal) {
//         obj.val = newVal;
//         console.log('price属性被修改');
//     }
// })


// var a = [3,5];
// var f = (b, ...a) => {
//     return a + b;
// }
// console.log(f(2));


// function foo(num) {
//     this.count++;
//     console.log(num);
// }
// foo.count = 0;
// for(var i = 0; i < 10; i++) {
//     if(i > 5) foo(i);
// }
// console.log(foo.count);


// 数组去重
// function duplicate(arr) {
//     var t = [];
//     t[0] = arr[0];
//     for(var i = 0; i < arr.length; i++) {
//         for(var j = 0; j < t.length; j++) {
//             if(t[j] == arr[i]) {
//                 break;
//             }

//             if(j == t.length - 1) {
//                 t.push(arr[i]);
//             }
//         }
//     }
//     return t;
// }
// console.log(duplicate([8,11,22,4,8,7,90,4,66,22,11]));


// const a = typeof null;           //object
// console.log(a);


// var a = 1;
// var b = 2;
// (function() {
//     console.log(a, b);
//     var a = 3;
//     var b = 4;
//     console.log(a, b);
// })()        //两个独立作用域，undefined undefined 3 4

// var i = 10;
// while(i > 5) {
//     let timer = setInterval((function() {
//         // i--;    会崩溃
//         console.log(i);
//         if(i <= 5) {
//             clearInterval(timer);
//         }
//     })(i), 1000);
//     i--;
// }


// 数组扁平化(箭头函数不加大括号默认return)
// var fn = arr =>
//     [].concat(...arr.map(v =>
//         Array.isArray(v) ? fn(v):v 
// ));
// function flatten(arr) {
//     var len = arr.length,
//         newArr = [];
//     for(var i = 0; i < len; i++) {
//         if(arr[i] instanceof Array) {
//             newArr = newArr.concat(flatten(arr[i]));
//         }else {
//             newArr.push(arr[i]);
//         }
//     }
//     return newArr;
// }
// var a = flatten([[2],[3],[[4],2],1]);
// console.log(a);


/**
 * 实现两个大数相加，JavaScript 里面 number 类型统一为 64 位，其中值为 53 位，剩下的指数为 11 位，所以最大为 2^53
 * @param {string} a 数字字符串
 * @param {string} b 数字字符串
 */
function addBigNum (a = '0', b = '0') {
  // transform to string.
  a = a.toString()
  b = b.toString()

  // get the max length
  var maxLen = Math.max(a.length, b.length)

  // 对高位补零
  a = a.padStart(maxLen, 0)
  b = b.padStart(maxLen, 0)

  var remainder = 0, // 进位
    sum = ''
  // 从低位开始对位相加
  for (var i = maxLen - 1; i >= 0; i--) {
    var tmp = parseInt(a[i]) + parseInt(b[i]) + remainder // 1+1=2 6+6=12
    remainder = Math.floor(tmp / 10) // 1 or 0
    sum = tmp % 10 + sum
  }
  if (remainder) {
    sum = '1' + sum
  }

  return sum
}

console.log(addBigNum('1'.repeat(3), '5'.repeat(5))) // 55555 + 111 = 55666
console.log(addBigNum(55, 55))

/**
 * 实现 Math.pow()，使用 ** 幂运算符
 * @param {number} x 
 * @param {number} n 
 */
function pow (x, n) {
  return x ** n
}


// 给定一个升序整型数组 [0,1,2,4,5,7,13,15,16,17],找出其中连续出现的数字区间，
// 输出为:
// ["0->2","4->5","7","13","15->17”]
function findSequenceRange (arr = []) {
  if (arr.length === 0) return
  var ret = [],
    i =  0
  ret[i] = [arr[0]]
  var a = arr.reduce((preVal, curVal) => {
    curVal === preVal + 1 ? ret[i].push(curVal) : ret[++i] = [curVal]
    return curVal
  })
  return ret
}

function findSeqRange (arr = []) {
  if (arr.length === 0) return

  var tmp = [], ret = [], i = 0
  arr.map((num, index) => {
    if (index !== 0) {
      if (arr[index - 1] + 1 === num) { // 连续
        tmp.push(num)
      } else { // 不连续
        ret[i]  = tmp
        tmp = [arr[index]]
        i++
      }
    } else {
      tmp.push(num)
      ret[i] = [arr[0]]
    }
  })
  ret[i] = tmp
  return ret
}

console.log(findSequenceRange([0,1,2,4,5,7,13,15,16,17]))
console.log(findSeqRange([0,1,2,4,5,7,13,15,16,17]))