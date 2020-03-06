### 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

```js
    function Find(target, array) {
        var arr = [].concat.call([], array);
        for(var i = 0; i < arr.length; i++) {
            if(target === arr[i]) return true;
        }
        return false;
    }
```

### 请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

**new RegExp(pattern, attributes);**

- 参数 pattern 是一个字符串，指定了正则表达式的模式或其他正则表达式。
- 参数 attributes 是一个可选的字符串，包含属性 "g"、"i" 和 "m"，分别用于指定全局匹配、区分大小写的匹配和多行匹配。ECMAScript 标准化之前，不支持 m 属性。如果 pattern 是正则表达式，而不是字符串，则必须省略该参数。

```js
    function replaceSpace(str) {
        str = str.replace(new RegExp(' ', 'gm'), '%20');
        return str;
    }
```

### 输入一个链表，按链表从尾到头的顺序返回一个ArrayList。(与输出反转后的表头差不多)

思路：顺序遍历把节点存入数组中，再反转。

```js
    function ListNode(x) {
        this.val = x;
        this.next = null;
    }
    function printListFromTailToHead(head) {
        var arr = [];
        while(head) {
            arr.push(head);
            head = head.next;
        }
        arr.reverse();
        return arr;
    }
```

### 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

```js
    function TreeNode(x) {
        this.val = x;
        this.left = null;
        this.right = null;
    }

    function reConstructBinaryTree(pre, vin) {
        var res = null;
        if(pre.length > 1) {
            // 由先序得到根节点
            var root = pre[0];
            // 再根据根节点，划分左右子树
            var vinRootIndex = vin.indexOf(root);
            var vinLeft = vin.slice(0, vinRootIndex);
            var vinRight = vin.slice(vinRootIndex + 1, vin.length);

            // 弹出根节点
            pre.shift();
            //从先序里划分上述左右子树的先序序列
            var preLeft = pre.slice(0, vinLeft.length);
            var preRight = pre.slice(vinLeft.length, pre.length);

            res = {
                val: root,
                left: reConstructBinaryTree(preLeft,vinLeft),
                right: reConstructBinaryTree(preRight,vinRight)
            }
        }else if(pre.length === 1) {
            res = {
                val: pre[0],
                left: null,
                right: null
            }
        }
        return res;
    }
```

### 用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

```js
    var stack1 = [],
        stack2 = [];
    function push(node) {
        stack1.push(node);
    }
    function pop() {
        if(!stack2.length) {    // 保证stack2为空
            while(stack1.length) {
                stack2.push(stack1.pop());
            }
        }
        return stack2.pop();
    }
```

### 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

```js
    function minNumberInRotateArray(rotateArray) {
        if(rotateArray.length) {
            var min = rotateArray[0];
            for(var i = 1; i < rotateArray.length; i++) {
                if(rotateArray[i] < rotateArray[i - 1]) min = rotateArray[i];
            }
            return min;
        }
        return 0;
    }
```

### 大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。 n<=39

```js
    function Fibonacci(n) {
        var arr = [];
        arr[0] = 0;
        arr[1] = 1;
        for(var i = 2; i <= n; i++) arr[i] = arr[i - 1] + arr[i - 2];
        return arr[n];
    }
```

### 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

```js
    function jumpFloor(number) {
        // write code here
        var arr = [];
        arr[1] = 1;
        arr[2] = 2;
        for(var i = 3; i <= number; i++) {
            arr[i] = arr[i - 1] + arr[i - 2];
        }
        return arr[number];
    }
```

### 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

```js
    function jumpFloor(number) {
        var a = 1;
        for(var i = 1; i < number; i++) a *= 2;   // a = a * 2;
        return a;
    }
```

### 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？ 比如n=3时，2*3的矩形块有3种覆盖方法： 

```js
    function rectCover(number)
    {
        // write code here
        var arr = [];
        arr[0] = 0;
        arr[1] = 1;
        arr[2] = 2;
        for(var i = 3; i <= number; i++) arr[i] = arr[i - 1] + arr[i - 2];
        return arr[number];
    }
```

### 输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。(不停与运算，直到结果为0)

```js
    function NumberOf1(n) {
        var count = 0;
        while(n) {
            count++;
            n = n & (n - 1);   
        }
        return count;
    }
```

### 给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。保证base和exponent不同时为0 

```js
    function Power(base, exponent) {
        var result = base;
        if((base !== 0.0) && (exponent !== 0)) {
            if(exponent > 0) {
                for(var i = 2; i <= exponent; i++) {
                    result *= base;
                }
            }else {    // 如果是负数次方，需要调用parseFloat，取结果的倒数
                exponent = -exponent;
                for(var i = 2; i <= exponent; i++) {
                    result = parseFloat(result * base);
                }
                result = parseFloat(1 / result);
            }
        }else if(exponent === 0) {
            result = parseFloat(1);
        }else if(base === 0.0) {
            result = parseFloat(0);
        }
        return result;
    }
```

### 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。

```js
    function reOrderArray(array) {
        var odd = [],    // 奇数
            even = [];
        for(var i = 0; i < array.length; i++) {
            if(array[i] % 2 === 0) even.push(array[i]);
            else odd.push(array[i]);
        }
        var arr = odd.concat(even);
        return arr;
    }
```

### 输入一个链表，输出该链表中倒数第k个结点。

思路：将节点存到数组
```js
    /*function ListNode(x){
        this.val = x;
        this.next = null;
    }*/
    function FindKthToTail(head, k) {
        var arr = [];
        while(head) {
            arr.push(head);
            head = head.next;
        }
        return arr[arr.length - k];
    }
```

### 输入一个链表，反转链表后，输出新链表的表头。

```js
    function ListNode(x){
        this.val = x;
        this.next = null;
    }
    function ReverseList(pHead) {
        if(!pHead) return;
        var pre = null,
            next = null;
        while(pHead) {
            next = pHead.next;  // 让next始终引用指向当前节点的下一个节点
            pHead.next = pre;  //pre始终指向当前head的前一个节点，这样可以反转节点了。
            pre = pHead;
            pHead = next;
        }
        return pre;
    }
```

### 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

```js
    function ListNode(x) {
        this.val = x;
        this.next = null;
    }
    function Merge(pHead1, pHead2) {
        if(!pHead1) return pHead2;
        if(!pHead2) return pHead1;
        var h;  // 构造新链表
        if(pHead1.val < pHead2.val) {
            h = pHead1;
            h.next = Merge(pHead1.next, pHead2);
        }else {
            h = pHead2;
            h.next = Merge(pHead1, pHead2.next);
        }
        return h;
    }
```

### 输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

```js
    /* function TreeNode(x) {
        this.val = x;
        this.left = null;
        this.right = null;
    } */
    function HasSubree(pRoot1, pRoot2) {
        if(pRoot1 === null || pRoot2 === null) return false
        return isSubtree(pRoot1, pRoot2)   // 当前节点的值相同，先把这个节点作为根
            || HasSubtree(pRoot1.left, pRoot2)  // 若前面的情况不满足，则进行左子树的查找
            || HasSubtree(pRoot1.right, pRoot2);  // 若前面的情况不满足，则进行右子树的查找
    }
    // 进来一定是当前 pRoot1的值 和 pRoot2的值相等
    function isSubtree(root1, root2) {
        if(!root2) return true;
        if(!root1) return false;
        if(root1.val === root2.val) {
            return isSubtree(root1.left, root2.left) && isSubtree(root1.right, root2.right);
        }else {
            return false;
        }
    }
```

### 操作给定的二叉树，将其变换为源二叉树的镜像。(与求二叉树深度一样)

```js
    /* function TreeNode(x) {
        this.val = x;
        this.left = null;
        this.right = null;
    } */
    function Mirror(root) {
        if(!root) return null;
        var templeft = Mirror(root.left),
            tempright = Mirror(root.right);
        root.left = tempright;
        root.right = templeft;
        return root;
    }
```

### 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）

```js
    function isPopOrder(pushV, popV) {
        let stack = [],
            j = 0;
        for(let i = 0; i < pushV.length; i++) {
            stack.push(pushV[i]);  // 模拟进栈
            // 模拟出栈
            while(stack.length && stack[stack.length - 1] === popV[j]) {  // 栈顶元素等于出栈序列第一个元素
                stack.pop();
                j++;
            }
        }
        return stack.length === 0;
    }
```

### 从上往下打印出二叉树的每个节点，同层节点从左至右打印。

其实是二叉树的广度优先搜索(BFS)，利用队列
```js
    function PrintFromTopToBottom(root) {
        if(root === null) return [];
        let queue = [],
            res = [];
        queue.push(root);
        while(queue.length) {
            let node = queue.shift();
            res.push(node.val);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        return res;
    }
```

### 输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）

```js
    /*function RandomListNode(x){
        this.label = x;
        this.next = null;
        this.random = null;
    }*/
    function Clone(pHead) {
        if(!pHead) return null;
        // new一个头节点
        var head = new RandomListNode(pHead.label);
        head.random = pHead.random;
        head.next = Clone(pHead.next);
        return head;
    }
```

### 输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。

```js
    function Permutation(str) {
        var res = [];
        if(str.length === 1) res.push(str);
        else {
            let obj = [];
            for(let i = 0; i < str.length; i++) {
                let c = str[i];
                if(!obj[c]) {
                    let newStr = str.slice(0, i) + str.slice(i + 1);
                    let l = Permutation(newStr);
                    for(let j = 0; j < l.length; j++) {
                        res.push(c + l[j]);
                    }
                    obj[c] = true;
                }
            }
        }
        return res;
    }
```

### 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。

```js
    function MoreThanHalfNum_Solution(numbers) {
        if(numbers.length === 0) return 0;
        var obj = {},
            len = Math.floor(numbers / 2);
        numbers.forEach(item => {
            if(obj.hasOwnProperty(item)) {
                obj[item]++;
            }else {
                obj[item] = 1;
            }
        })

        // 获取所有键
        var keys = Object.keys(obj);
        for(var i = 0; i < keys.length; i++) {
            if(obj[keys[i]] > len) return Number(keys[i]);
        }
        return 0;
    }
```

### 输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4,。

```js
    function GetLeastNumbers_Solution(input, k)
    {
        // write code here
        //从小到大排序，然后截取前k个数即可
        if(k > input.length) return [];
        var arr = input.sort((a, b) => {
            return a - b;
        })
        return arr.slice(0, k);
    }
```

### 求出1~13的整数中1出现的次数,并算出100~1300的整数中1出现的次数？为此他特别数了一下1~13中包含1的数字有1、10、11、12、13因此共出现6次,但是对于后面问题他就没辙了。ACMer希望你们帮帮他,并把问题更加普遍化,可以很快的求出任意非负整数区间中1出现的次数（从1 到 n 中1出现的次数）。

```js
    function NumberOf1Between1AndN_Solution(n) {
        if(n < 1) return 0;
        let sum = 0;
        for(var i = 1; i <= n; i++) {
            let j = i;     // 先看当前数字包含多少1
            while(j) {
                let mod = j % 10;
                j = Math.floor(j / 10);
                if(mod === 1) sum++;
            }
        }
        return sum;
    }
```

### 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。

```js
function PrintMinNumber(numbers)
{
    // write code here
    if(numbers.length === 0) return '';
    numbers.sort((a, b) => {
        var a = a.toString(),
            b = b.toString();
        return (a + b) - (b + a);  // 升序排列
    });
    return numbers.join('');
}
```

### 在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）.

```js
    function FirstNotRepeatingChar(str) {
        for(var i = 0; i < str.length; i++) {
            if(str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
                return i;
            }
        }
        return -1;
    }
```

### 输入两个链表，找出它们的第一个公共结点。（注意因为传入数据是链表，所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的）

```js
    /*function ListNode(x){
        this.val = x;
        this.next = null;
    }*/
    function FindFirstCommonNode(pHead1, pHead2) {
        var p1 = pHead1,
            p2 = pHead2;
        while(p1 !== p2) {
            p1 = p1 === null ? p2 : p1.next;
            p2 = p2 === null ? p1 : p2.next;
        }
        return p1;
    }
```

### 输入一棵二叉树，求该树的深度。从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。

```js
/* function TreeNode(x) {
        this.val = x;
        this.left = null;
        this.right = null;
    } */
    function TreeDepth(pRoot) {
        if(!pRoot) return 0;
        let left= TreeDepth(pRoot.left),
            right = TreeDepth(pRoot.right);
        if(left < right) return ++right;
        else return ++left;
    }
```

### 一个整型数组里除了两个数字之外，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。

```js
function FindNumsAppearOnce(array)
{
    // write code here
    // return list, 比如[a,b]，其中ab是出现一次的两个数字
    var str = String(array);
    var list = [], index = 0;
    for(var i = 0; i < str.length; i++) {
        if(str.indexOf(str[i]) == str.lastIndexOf(str[i])) {
            list[index] = parseInt(str[i]);
            index++;
        }
    }
    return list;
}
```

### 牛客最近来了一个新员工Fish，每天早晨总是会拿着一本英文杂志，写些句子在本子上。同事Cat对Fish写的内容颇感兴趣，有一天他向Fish借来翻看，但却读不懂它的意思。例如，“student. a am I”。后来才意识到，这家伙原来把句子单词的顺序翻转了，正确的句子应该是“I am a student.”。Cat对一一的翻转这些单词顺序可不在行，你能帮助他么？

```js
    function ReverseSentence(str)
    {
        // write code here
        // 因为是拆分单词而不是字母，因此以空格为划分界限
        return str.split(' ').reverse().join(' ');
    }
```

### 求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

```js
    function Sum_Solution(n) {
        var result;
        if(n === 1) result = 1;
        else {
            result = n + Sum_Solution(n - 1);
        }
        return result;
    }
```

### 写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。

```js
    function Add(num1, num2) {
        let temp = num1;
        while(num2) {
            temp = num1 ^ num2;
            num2 = (num1 & num2) << 1;
            num1 = temp;
        }
        return num1;
    }
```

### 给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

```js
    /*function ListNode(x){
        this.val = x;
        this.next = null;
    }*/
    function EntryNodeOfLoop(pHead) {
        // 将节点存到对象里，如果对象存储的节点再次出现，证明有环
        var obj = {},
            node = pHead;
        while(node) {
            if(obj[node.val] === node.next) return node;
            else {
                obj[node.val] = node.next;
                node = node.next;
            }
        }
        return null;
    }
```

### 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function deleteDuplication(pHead) {
    // 0或者1个节点
    if(pHead === null || pHead.next === null) return pHead;
    if(pHead.val === pHead.next.val) {  // 出现重复节点
        var pNode = pHead.next;
        while(pNode !== null && pNode.val === pHead.val) {
            pNode = pNode.next;    //头节点指向第3个节点
        }
        return deleteDuplication(pNode);
    }else {  // 没有重复的话继续递归遍历
        pHead.next = deleteDuplication(pHead.next);
        return pHead;
    }
}
```

### 请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。

```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function isSymmetrical(pRoot)
{
    // write code here
    return compare(pRoot, pRoot);
}


function compare(a, b) {
    if(a === null && b === null) return true;
    if(a === null || b === null) return false;
    if(a.val !== b.val) return false;
    return compare(a.left, b.right) && compare(a.right, b.left);
}
```

### 从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。

```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Print(pRoot)
{
    // write code here
    // 应返回二维数组
    if(!pRoot) return [];
    let queue = [],
        res = [];
    queue.push(pRoot);
    while(queue.length) {
        let vec = [],
            len = queue.length;
        for(var i = 0; i < len; i++) {
            let node = queue.shift();
            vec.push(node.val);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        res.push(vec);
    }
    return res;
}
```