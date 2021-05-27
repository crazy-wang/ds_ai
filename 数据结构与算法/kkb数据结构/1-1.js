function Stack() {
    var items = [] // 存储数据  // 这里不能用this.items做，因为不安全了，暴露出去了，其他任何一个人只要能拿到这个类，就可以直接操作改变他，这样会使得其他引用混乱。所以要保证他的私有性——安全(外部不能直接操作他，只能用约定好的暴露出去的方法操作他)

    // 从栈顶添加元素，也叫压栈
    this.push = function (item) {
        items.push(item)
    }
    // 弹出栈顶元素
    this.pop = function () {
        return items.pop()
    }
    // 返回栈顶元素
    this.top = function () {
        return items[items.length - 1] // 也就是返回数组最后一个元素
    }
    // 判断栈是否为空
    this.isEmpty = function () {
        // return items.length === 0 ? true : false 可以简写成下面
        return items.length === 0
    }
    // 返回栈的大小
    this.size = function () {
        return items.length
    }
    // 清空栈
    this.clear = function () {
        items = []
    }

}

// 栈应用及联练习题

// 1.合法括号
let str1 = 'sdf(ds(ew(we)rw)rwqq)qwewe'  // v
let str2 = '(sd(qwqw)sd(sd))'  // v
let str3 = '()()sd()(sd()fw))('  // x
// 判断字符串括号是否合法
function isRight(str) {
    let strStack = new Stack()
    // console.log(strStack)
    let strArray = str.split("") // 直接用for循环不用forEach就不需要用split做了。字符串也有长度len和下标索引
    // console.log(strArray)
    strArray.forEach(item => {
        // 遇到左括号入栈
        if (item === '(') {
            strStack.push(item) // 一种闭包。外部访问函数内部的私有变量
        }
        if (item === ')') {
            // 遇到右括号，判断栈是否为空
            if (strStack.isEmpty()) {
                return false
            } else {
                strStack.pop() // 弹出左括号
            }
        }
    })
    return strStack.isEmpty() // 栈为空，说明合法
}

// console.log(isRight(str1))
// console.log(isRight(str2))
// console.log(isRight(str3))

// 2.后缀表达式 计算
let arr = ['4', '13', '5', '/', '+']  // 最终计算结果是6
// 过程如下：
// 遇到数字，压栈；遇到符号，弹栈，弹两个，第一个在右，第二个在左；然后链接符号在中间，计算表达式，将
// 结果压栈；继续走，遇到符号还是这样，然后再做计算(这次有上次的计算结果了)；直到栈中只剩下一个元素即结果
function calcExp(arr) {
    if (arr !== null) {
        let stack = new Stack()
        let len = arr.length
        let optSymbol = ['+', '-', '*', '/']
        for (let i = 0; i < len; i++) {
            if (optSymbol.includes(arr[i])) {
                let right = stack.pop()
                let left = stack.pop()
                let exp = left + arr[i] + right
                console.log(exp)
                let expResult = parseInt(eval(exp)) // 计算并取整
                stack.push(expResult) // 计算结果压栈
            } else {
                stack.push(arr[i]) // 压栈
            }
        }
        return stack.top()
    }
}
// console.log(calcExp(arr), '结果')

// 3.实现一个有min方法的栈，栈里实现一个min方法，返回栈的最小元素，且时间复杂度为o(1)【没时间复杂度这个要求的话，有多种实现，方法每次去自己排序找就行。有这个了就只能下面这样】

function MinStack() {
    var dataStack = new Stack()// 存储数据
    var minStack = new Stack()// 存储最小数据【】里面可能有重复值，很正常，只保证每次记录的最小值
    this.push = function (item) {
        dataStack.push(item)
        // minStack为空或者栈顶元素大于item
        if (minStack.isEmpty() || item < minStack.top()) {
            minStack.push(item)
        } else {
            minStack.push(minStack.top())
        }
    }
    // 弹出栈顶元素
    this.pop = function () {
        dataStack.pop()
        minStack.pop()
    }
    // 返回栈最小值
    this.min = function () {
        return minStack.pop()
    }
}
let minstack = new MinStack()
minstack.push(3)
minstack.push(6)
minstack.push(8)
console.log(minstack.min(), '最小值')
minstack.push(2)
console.log(minstack.min(), '最小值')
minstack.pop() // 上面之所以要多写个栈而没有写变量就是因为考虑到这种操作。变量的话pop直接去掉就没了，多写个栈每次记录都在里面。和真实数据同步。
console.log(minstack.min(), '最小值')

// 4.使用栈，完成中序表达式转后续表达式 ——没做
