//leetcode 102: 给你一个二叉树，请你返回其按层序遍历得到的节点值。(即逐层地，从左到右访问所有节点)。示例，给定二叉树：[3,9,20,null,null,15,7]。
//
//     3
//    / \
//   9  20
//      / \
//     15   7
// 返回其层次遍历结果：
//
// [
//     [3],
//     [9,20],
//     [15,7]
// ]

var bstTree = {
    node: 3,
    left: {
        node: 9,
        left: null,
        right: null
    },
    right: {
        node: 20,
        left: {
            node: 15,
            left: null,
            right: null
        },
        right: {
            node: 7,
            left: null,
            right: null
        }
    }
}

function bfsWalkResult(bstTree) {
    if (bstTree !== null) {
        let result = [] // 最终结果
        let queue = [] // 队列
        queue.push(bstTree)
        while (queue.length !== 0) {
            let item = [] // 记录每一层
            let len = queue.length // 提前提炼出队列的尺寸，即数组长度，必须提前写，不然放for循环里会因为下面的改变而动态变化
            for (let i = 0; i < len; i++) {
                let currentTree = queue.shift()
                item.push(currentTree.node)
                currentTree.left !== null && queue.push(currentTree.left)
                currentTree.right !== null && queue.push(currentTree.right)
            }
            result.push(item)
        }
        console.log(result, '结果')
    }
}
bfsWalkResult(bstTree)

// 这篇博文写的很好哦
// https://developer.51cto.com/art/202004/614590.htm