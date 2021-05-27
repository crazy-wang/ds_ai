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