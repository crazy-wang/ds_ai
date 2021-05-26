// 二叉树查找——二叉树的插入
// 分析看二叉树的结构，他这样的构成就和二分查找的过程一样。一半一半，分明大小。 BST : 就是二叉排序数的意思

// 二叉树(BST)
function BST() {
    this.root = null
    this.insert = insert
}

// 1.先创建一个node节点类,用于后面创建一个个节点。
function Node(node, left, right) {
    this.node = node
    this.left = left
    this.right = right
}

// 2.添加新节点，把数据传入node类
function addNode(node, left, right) {
    return new Node(node, left, right)
}
// var insertNode
// var n = addNode(insertNode, null, null)

// 3.检查当前BST树是否有根节点：无-》表明是一棵新树，则设置该节点为该树的根节点，插入过程结束； 有-》表明不是新树，新添加节点不是根节点，则对BST进行遍历，找合适位置。【该过程设计到算法了: 遍历BST】
function insert(insertNode) {
    var n = addNode(insertNode, null, null)
    if (this.root === null) {
        this.root = n
    } else {
        var current = this.root
        var parent // 保留当前根节点，以防后面替换造成影响
        while (true) {
            parent = current
            if (insertNode < current.node) {
                // 不能注释掉的这种写法，因为这样写current没有变化了。始终就是当前值。
                // if (current.left === null) {
                //     parent.left = node
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
}

// BST遍历算法
/*
1. 设值当前节点为根节点
2. 如果待插入节点保存的数据小于当前节点，则新节点为原节点的左节点，反之，执行第4步
3. 如果当前节点的左节点为null，就将新节点放到这个位置，退出循环；反之，继续执行下一次循环
4. 设置新节点为原节点的右节点
5. 如果当前节点的右节点为null，就将新节点放到这个位置，退出循环；反之，继续执行下一次循环
 */
