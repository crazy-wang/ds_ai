// 栈
// 定义一个Stack类
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