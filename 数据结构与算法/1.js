// 二分查找

// 基本二分查找有 非递归版本 和 递归版本
// 非递归版本
function binarySearch(target, arr) {
    var start = 0
    var end = arr.length - 1
    while (start <= end) {
        var mid = parseInt(start + (end - start) / 2)
        if (target === arr[mid]) {
            return mid
        } else if (target > arr[mid]) {
            start = mid + 1
        } else {
            end = mid - 1
        }
    }
    return -1 // 没有匹配到的时候返回-1
}
// 递归版本
function binarySearch2(target, arr, start, end) {
    var start = start || 0
    // var end = end || arr.length - 1 // 这样写不像下面那样写会有bug.当传入end为0的时候，判断第一个条件会略过而直接赋值后面的值。因为0为false
    // 或者直接用es6参数默认赋值功能。把赋值直接放到参数那就不会有这个bug。可参考3
    var end
    if (end === 0) {
        end = 0
    } else {
        end = end || arr.length - 1
    }
    // console.log(end)
    var mid = parseInt(start + (end - start) / 2)
    console.log(mid)
    if (start <= end) {
        if (target === arr[mid]) {
            return mid
        } else if (target > arr[mid]) {
            return binarySearch2(target, arr, mid + 1, end) // 递归调用这里得加return，不加的话相当于这里直接写了个数字，比如 7.无任何意义
        } else {
            return binarySearch2(target, arr, start, mid - 1)
        }
    } else {
        return -1
    }
}
// 递归版本-用es6默认参数解决bug
function binarySearch3(target, arr, start = 0, end = arr.length - 1) {
    // var start = start // 有无此声明都可以
    // var end = end
    // console.log(end)
    var mid = parseInt(start + (end - start) / 2)
    console.log(mid)
    if (start <= end) {
        if (target === arr[mid]) {
            return mid
        } else if (target > arr[mid]) {
            return binarySearch2(target, arr, mid + 1, end) // 递归调用这里得加return，不加的话相当于这里直接写了个数字，比如 7.无任何意义
        } else {
            return binarySearch2(target, arr, start, mid - 1)
        }
    } else {
        return -1
    }
}

// 由上的方法我们可以总结出二分查找的几个特点:
// 1 每次我们都将表的大小减半，也就是除以二 ;
// 2 最坏情况下我们要一直“除以2”直到表只剩下一个元素;
// 3 二分查找花费的时间关键点就是比较了多少次，而比较的次数在最坏情况下就是表的大小n不断除以2直至n为1的次数。这样以来我们很快就能得出二分查找的时间复杂度：O(log2N)

let arr = [1,2,3,4,5,6,7,8]
let value = 1
// console.log(binarySearch(value, arr))
console.log(binarySearch3(value, arr), '结果')