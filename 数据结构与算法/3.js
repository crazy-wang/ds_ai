// 二叉树查找——二叉树的查找
// 查找通常分为三种情况 查找最小值 查找最大值 查找定值; 找之前都是先找到根节点【很关键】

// 1. 查找定值
function findSomeOne(data) {
    var current = this.root
    while (current !== null) {
        if (current.node === data) {
            return current
        } else if (current.node < data) {
            current = current.right
        } else {
            current = current.left
        }
    }
    return null
}

// 2. 查找最小值
function findMin() {
    var current = this.root
    while (!(current.left === null)) {
        current = current.left
    }
    return current.node
}

// 3. 查找最大值
function findMax() {
    var current = this.root
    while (!(current.right === null)) {
        current = current.right
    }
    return current.node
}