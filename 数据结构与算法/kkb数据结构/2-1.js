function Queue() {
    var items = [] // 存储数据
    // 向队列尾部添加一个元素
    this.enqueue = function (item) {
        items.push(item)
    }
    // 移除队列头部的元素
    this.dequeue = function () {
        return items.shift()
    }
    // 返回队列头部的元素
    this.head = function () {
        return items[0]
    }
    // 返回队列尾部的元素
    this.tail = function () {
        return items[items.length - 1]
    }
    // 返回队列大小
    this.size = function () {
        return items.length
    }

    this.clear = function () {
        items = []
    }
    // 是否为空队列
    this.isEmpty = function () {
        return items.length === 0
    }
}

// 队列应用及练习题

// 1.约瑟夫环
// 有一个数组a[100]存放0-99；要求每隔两个数删掉一个数，到末尾时循环至开头继续进行，求最后一个被删掉的数
// 0,1,2,3,4,5,6,7,8,9,10  被删除的顺序就是2，5，8 (11)。相当于每3个删除末位那个。 index计数位置。 index%3 == 0 则这个元素就是要删除的，不等于0说明不是
// 用队列实现很简单，把100个数放进队列，一直while循环遍历，满足条件就删除，不满足取出放到后面当作下一轮的，。。。直到队列剩下最后一个元素，终止循环得到结果。

function delRing(arrList) {
    let queue = new Queue()
    let index = 1 // 计数
    let len = arrList.length
    for (let i = 0; i < len; i++) {
        queue.enqueue(arrList[i])
    }
    while (queue.size() > 1) {
        if (index % 3 === 0) {
            queue.dequeue()
        } else {
            queue.enqueue(queue.dequeue())
        }
        index++
        console.log(index)
    }
    return queue.head()
}

// 上面我写的，可以优化成下面的标准答案
// function delRing(arrList) {
//     let queue = new Queue()
//     let index = 0
//     let len = arrList.length
// 把数组元素都放入队列中
//     for (let i = 0; i < len; i++) {
//         queue.enqueue(arrList[i])
//     }
//     while (queue.size() > 1) {
// 弹出一个元素，判断是否需要删除
//         let item = queue.dequeue()
//         index += 1
//         console.log(index)
// 每隔两个删除掉一个，不删除的元素就放回到队列尾部
//         if (index % 3 !== 0) {
//             queue.enqueue(item)
//         }
//     }
//     return queue.head()
// }
// 数组版
function delRing2(arrList) {
    let index = 1
    while (arrList.length > 1) {
        let item = arrList.shift()
        if (index % 3 != 0) {
            arrList.push(item)
        }
        index++
        console.log(index)
    }
    return arrList[0]
}

let arrList = []
for (let i = 0; i < 100; i++) {
    arrList.push(i)
}
// console.log(delRing(arrList), '结果') // 90
// console.log(delRing2(arrList), '结果') // 90

// 2.斐波那契数列
// 使用队列计算斐波那契数列的第n项。斐波那契数列前两项是1 1，此后每一项都是前两项之和。即f(n) = f(n - 1) + f(n - 2)
// 1,1,2,3,5,8,13,21,34,55...  前两项已定，所以从n=3开始算，想知道第3项只要知道1，2项就可以；想知4项，知道2，3项就行...

function f(n) { // n > 2
    if (n > 2) {
        let queue = new Queue()
        queue.enqueue(1)
        queue.enqueue(1)
        let index = 0
        while (index < n - 2) {
            let item = queue.dequeue()
            let next = queue.head() + item
            queue.enqueue(next)
            index++
        }
        return queue.tail()
    }
}

// console.log(f(3))
// console.log(f(5))
// console.log(f(10))

// 3.两个队列实现一个栈
// 队列是先进先出，栈是先进后出，两种不同的逻辑，要想实现(主要是实现他里面的一些方法)，需要用两个队列同时来做——互相倒腾(始终保持一个存数据，一个为空做倒腾容器)
function QueueStack() {
    let queue1 = new Queue() // 队列1 初始存数据 让他做有数据的
    let queue2 = new Queue() // 队列2 中间件倒腾数据 让他做空的

    this.push = function (item) {
        queue1.enqueue(item)
    }
    // pop处理的时候稍微麻烦一点，需要做个互换倒腾。先倒过去，再倒过来。确保queue1始终是保存数据的。queue2是空容器
    // pop方法要弹出栈顶元素，这个栈顶元素其实就是queue的队尾元素。但是队尾元素在队列中是不允许直接删除的(违规操作).
    // 所以可以把queue1的元素(除了队尾元素)的移除放入到queue2中，最后移除queue1的元素并返回，然后再交换下身份换回来。
    this.pop = function () {
        while (queue1.size() > 1) {
            queue2.enqueue(queue1.dequeue())
        }
        let result = queue1.dequeue()
        let len = queue2.size()
        for (let i = 0; i < len; i++) {
            queue1.enqueue(queue2.dequeue())
        }
        return result
    }
    this.top = function () {
        return queue1.tail()
    }
}

let qs = new QueueStack()
// qs.push(1)
// console.log(qs.top())
// qs.push(3)
// qs.push(2)
// console.log(qs.top())
// console.log(qs.pop())
// console.log(qs.top())

// 4. 打印杨辉三角
// 使用队列打印出杨辉三角的前n行， n>=1

// 5.使用两个栈实现一个队列，并实现enqueue,dequeue,head三个方法
function Stack() {
    var items = []
    this.push = function (item) {
        items.push(item)
    }
    this.pop = function () {
        return items.pop()
    }
    this.top = function () {
        return items[items.length - 1]
    }
    this.isEmpty = function () {
        return items.length === 0
    }
    this.size = function () {
        return items.length
    }
    this.clear = function () {
        items = []
    }
    this.show = function () {
        return items
    }
}

// 同样的逻辑，两个栈互相倒腾，和队列类似吧。
function StackQueue() {
    let stack1 = new Stack() // 让1存储数据
    let stack2 = new Stack() // 让2做杯子

    this.enqueue = function (item) {
        stack1.push(item)
    }
    this.dequeue = function () {
        while (stack1.size() > 1) {
            stack2.push(stack1.pop()) // 数据从1进到2
        }
        let result = stack1.pop()
        let len = stack2.size()
        for (let i = 0; i < len; i++) {
            stack1.push(stack2.pop()) // 数据从2进到1
        }
        return result
    }
    this.head = function () {
        while (stack1.size() > 1) {
            stack2.push(stack1.pop()) // 数据从1进到2
        }
        let result = stack1.top()
        let len = stack2.size()
        for (let i = 0; i < len; i++) {
            stack1.push(stack2.pop()) // 数据从2进到1
        }

        return result
    }
}

let sq = new StackQueue()
sq.enqueue(1)
console.log(sq.head())
sq.enqueue(3)
sq.enqueue(2)
console.log(sq.head())
console.log(sq.dequeue())
console.log(sq.head())


// 6.迷宫问题

