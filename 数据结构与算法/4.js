// 二叉树查找——二叉树的循环遍历
// 循环遍历分为 (先)前序遍历 中序遍历 后序遍历; 找之前都是先找到根节点【很关键】

// (先)前序： 根左右。
// 中序： 左中右。
// 后序：左右中。

function BST() {
    this.root = null
    this.insert = insert
    this.frontOrder = frontOrder
    this.centerOrder = centerOrder
    this.endOrder = endOrder
}

function Node(node, left, right) {
    this.node = node
    this.left = left
    this.right = right
}

function addNode(node, left, right) {
    return new Node(node, left, right)
}

function insert(insertNode) {
    var n = addNode(insertNode, null, null)
    if (this.root === null) {
        this.root = n
    } else {
        walkBST(n, this)
    }
}

function walkBST(n, instance) {
    var current = instance.root
    var parent // 保留当前根节点，以防后面替换造成影响
    while (true) {
        parent = current
        if (n.node < current.node) {
            // 不能注释掉的这种写法，因为这样写current没有变化了。始终就是当前值。
            // if (current.left === null) {
            //     parent.left = insertNode
            //     break
            // }
            current = current.left // 【关键语句，很重要】
            if (current === null) {
                parent.left = n
                break
            }
        } else {
            current = current.right
            if (current === null) {
                parent.right = n
                break
            }
        }
    }
}


// 先构造一个树
var bstTree = new BST()

bstTree.insert(13)
bstTree.insert(28)
bstTree.insert(9)
bstTree.insert(78)
bstTree.insert(33)
bstTree.insert(15)
bstTree.insert(54)

console.log('------------------')
console.log(bstTree)

// 1. 前序遍历
function frontOrder(bstTree) {
    if (!(bstTree === null)) {
        console.log(bstTree.node)
        frontOrder(bstTree.left)
        frontOrder(bstTree.right)
    }
}

// bstTree.frontOrder(bstTree.root)

// 2. 中序遍历
function centerOrder(bstTree) {
    if (!(bstTree === null)) {
        centerOrder(bstTree.left)
        console.log(bstTree.node)
        centerOrder(bstTree.right)

    }
}

// bstTree.centerOrder(bstTree.root)

// 3. 后序遍历
function endOrder(bstTree) {
    if (!(bstTree === null)) {
        endOrder(bstTree.left)
        endOrder(bstTree.right)
        console.log(bstTree.node)
    }
}

// bstTree.endOrder(bstTree.root)

// 【递归的表达性很好，也很容易理解，不过如果层级过深，很容易导致栈溢出。所以我们重点看下非递归实现】

// 前序遍历-非递归方法-深度优先遍历（利用栈）
function dfs(bstTree) {
    let rootTree = bstTree.root
    if (!(rootTree === null)) {
        let stack = []
        stack.push(rootTree)
        while (stack.length !== 0) {
            let currentTree = stack.pop()

            console.log(currentTree.node) // 遍历节点，我们这里就是让他展示出来，可以直接展示的，就这样处理了

            if (currentTree.right !== null) {
                stack.push(currentTree.right)
            }
            if (currentTree.left !== null) {
                stack.push(currentTree.left)
            }
        }
    }

}

// dfs(bstTree)
 
// 前序遍历-非递归方法-广度优先遍历（利用队列）
function bfs(bstTree) {
    let rootTree = bstTree
    if ((rootTree !== null)) {
        let queue = []
        queue.push(rootTree)
        while (queue.length !== 0) {
            let currentNode = queue.shift()
            console.log(currentNode.node)
            if (currentNode.left !== null) {
                queue.push(currentNode.left)
            }
            // if (currentNode.right !== null) {
            //     queue.push(currentNode.right)
            // } 可以简写成下面的句子
            currentNode.right !== null && queue.push(currentNode.right)
        }
    }
}

bfs(bstTree.root)
// 这个bfs2也是广度遍历的一种，用到了指针概念
function bfs2(nodes) {
    var result = []
    var queue = []
    var pointer = 0
    queue.push(nodes)
    console.log(queue, '+++++++++')
    while (pointer < queue.length) {
        var item = queue[pointer++]
        console.log(item.node)
        result.push(item.node)
        item.left && queue.push(item.left)
        item.right && queue.push(item.right)
    }
    // console.log(result)
    return result
}
// bfs2(bstTree.root)
