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

console.log(isRight(str1))
console.log(isRight(str2))
console.log(isRight(str3))

