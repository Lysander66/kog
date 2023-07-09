---
sidebar_position: 2
---

每个结点最多有两个子树的树结构。通常子树被称作“左子树”（left subtree）和“右子树”（right subtree）。二叉树常被用于实现二叉查找树和二叉堆。

## 基本

父节点、子结点、兄弟结点  
根节点：没有父节点的结点  
叶子结点：没有子结点的结点

> 高度：节点到叶子结点的最长路径（边数）  
> 深度：根节点到这个节点的边数  
> 层数：节点深度 + 1  
> 树的高度：根节点的高度。

二叉树（Binary Tree）是每个结点最多有两个子树的树结构

### 满二叉树

> 一棵深度为 k，且有 2^k-1 个节点的二叉树，称为满二叉树。

叶子节点全都在最底层，除了叶子节点之外，每个节点都有左右两个子节点。

### 完全二叉树

> 除最后一层外，若其余层都是满的，并且最后一层或者是满的，或者是在右边缺少连续若干节点，则此二叉树为完全二叉树。深度为 k 的完全二叉树，至少有 2^(k-1)个叶子节点，至多有 2^k-1 个节点。  
> 具有 n 个节点的完全二叉树的深度为 floor(log2n)+1。

叶子节点都在最底下两层，最后一层的叶子节点都靠左排列，并且除了最后一层，其他层的节点个数都要达到最大。

### 对称二叉树

[101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/)

```go
func isSymmetric(root *TreeNode) bool {
	if root == nil {
		return true
	}
	return dfs(root.Left, root.Right)
}

// 递归终止条件 两个节点都为空 两个节点中有一个为空 两个节点的值不相等
func dfs(left, right *TreeNode) bool {
	if left == nil && right == nil {
		return true
	}
	if left == nil || right == nil {
		return false
	}
	if left.Val != right.Val {
		return false
	}
	return dfs(left.Left, right.Right) && dfs(left.Right, right.Left)
}
```

### 翻转二叉树

[226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree)

递归

```go
func invertTree(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}
	left := invertTree(root.Left)
	right := invertTree(root.Right)
	root.Left = right
	root.Right = left
	return root
}
```

BFS

```go
func invertTree(root *TreeNode) *TreeNode {
	if root == nil {
		return root
	}
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		length := len(queue)
		for i := 0; i < length; i++ {
			node := queue[i]
			node.Left, node.Right = node.Right, node.Left
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		queue = queue[length:]
	}
	return root
}
```

### 合并二叉树

[617. 合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees)

```go
func mergeTrees(t1 *TreeNode, t2 *TreeNode) *TreeNode {
	if t1 == nil {
		return t2
	}
	if t2 == nil {
		return t1
	}
	t1.Val += t2.Val
	t1.Left = mergeTrees(t1.Left, t2.Left)
	t1.Right = mergeTrees(t1.Right, t2.Right)
	return t1
}
```

## 遍历

- preorder 前序遍历 root-left-right
- inorder 中序遍历 left-root-right
- postorder 后序遍历 left-right-root

### 中序遍历

[94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal)

```go
func inorderTraversal(root *TreeNode) (res []int) {
	p := root
	var stack []*TreeNode
	for len(stack) > 0 || p != nil {
		if p != nil {
			stack = append(stack, p)
			p = p.Left
		} else {
			p = stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			res = append(res, p.Val)
			p = p.Right
		}
	}
	return
}
```

### 前序遍历

[144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal)

```go
func preorderTraversal(root *TreeNode) (res []int) {
	if root == nil {
		return
	}
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		res = append(res, node.Val)
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
	}
	return
}
```

### 后序遍历

[145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal)

```go
func postorderTraversal(root *TreeNode) (res []int) {
	if root == nil {
		return
	}
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		res = append(res, node.Val)
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
	}
	// reverse
	length := len(res)
	for i := 0; i < length/2; i++ {
		res[i], res[length-1-i] = res[length-1-i], res[i]
	}
	return
}
```

递归

```go
func inorderTraversal(root *TreeNode) (res []int) {
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		dfs(node.Left)
		res = append(res, node.Val)
		dfs(node.Right)
	}
	dfs(root)
	return
}

func preorderTraversal(root *TreeNode) (vals []int) {
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		vals = append(vals, node.Val)
		dfs(node.Left)
		dfs(node.Right)
	}
	dfs(root)
	return
}

func postorderTraversal(root *TreeNode) (res []int) {
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		dfs(node.Left)
		dfs(node.Right)
		res = append(res, node.Val)
	}
	dfs(root)
	return
}
```

### 层序遍历

[102. 二叉树的层次遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal)

```go
func levelOrder(root *TreeNode) [][]int {
	res := make([][]int, 0)
	if root == nil {
		return res
	}
	queue := []*TreeNode{root}
	level := 0
	for len(queue) > 0 {
		length := len(queue)
		res = append(res, []int{})
		for i := 0; i < length; i++ {
			node := queue[i]
			res[level] = append(res[level], node.Val)
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		queue = queue[length:]
		level++
	}
	return res
}
```

### 之字形层序遍历

[103. 二叉树的锯齿形层序遍历](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/)

### 自底向上的层序遍历

[107. 二叉树的层次遍历 II](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii)

```go
func levelOrderBottom(root *TreeNode) [][]int {
	res := make([][]int, 0)
	if root == nil {
		return res
	}
	queue := []*TreeNode{root}
	level := 0
	for len(queue) > 0 {
		length := len(queue)
		res = append(res, []int{})
		for i := 0; i < length; i++ {
			node := queue[i]
			res[level] = append(res[level], node.Val)
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		queue = queue[length:]
		level++
	}
	// 反转数组
	L, R := 0, len(res)-1
	for L < R {
		res[L], res[R] = res[R], res[L]
		L++
		R--
	}
	return res
}
```

### 从前序与中序遍历序列构造二叉树

[105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

> 题目说，假设树中没有重复的元素

```go
func buildTree(preorder []int, inorder []int) *TreeNode {
	// 用于快速定位根节点
	indexMap := make(map[int]int, len(inorder))
	for i, v := range inorder {
		indexMap[v] = i
	}
	var dfs func(int, int, int) *TreeNode
	dfs = func(preStart, preEnd, inStart int) *TreeNode {
		if preStart > preEnd {
			return nil
		}
		// 前序遍历的第一个节点就是根节点
		root := &TreeNode{Val: preorder[preStart]}
		// 在中序遍历中定位根节点
		rootIdx := indexMap[preorder[preStart]]
		// 左子树中的节点数目
		leftSize := rootIdx - inStart
		root.Left = dfs(preStart+1, preStart+leftSize, inStart)
		root.Right = dfs(preStart+leftSize+1, preEnd, rootIdx+1)
		return root
	}
	return dfs(0, len(preorder)-1, 0)
}
```

### 二叉树的最大深度

[104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree)

```go
func maxDepth(root *TreeNode) int {
	if root == nil {
		return 0
	}
	return max(maxDepth(root.Left), maxDepth(root.Right)) + 1
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}
```

### 二叉树的最小深度

[111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree)

> dfs

```go
func minDepth(root *TreeNode) int {
	if root == nil {
		return 0
	}
	if root.Left == nil && root.Right == nil {
		return 1
	}
	minD := math.MaxInt32
	if root.Left != nil {
		minD = min(minDepth(root.Left), minD)
	}
	if root.Right != nil {
		minD = min(minDepth(root.Right), minD)
	}
	return minD + 1
}

func min(x, y int) int {
	if x < y {
		return x
	}
	return y
}
```

> bfs
> 当我们找到一个叶子节点时，直接返回这个叶子节点的深度。广度优先搜索的性质保证了最先搜索到的叶子节点的深度一定最小。

```go
func minDepth(root *TreeNode) int {
	if root == nil {
		return 0
	}
	queue := []*TreeNode{root}
	level := 1
	for len(queue) > 0 {
		length := len(queue)
		for i := 0; i < length; i++ {
			if queue[i].Left == nil && queue[i].Right == nil {
				return level
			}
			if queue[i].Left != nil {
				queue = append(queue, queue[i].Left)
			}
			if queue[i].Right != nil {
				queue = append(queue, queue[i].Right)
			}
		}
		queue = queue[length:]
		level++
	}
	return level
}
```

### 二叉树的堂兄弟节点

[993. 二叉树的堂兄弟节点](https://leetcode.cn/problems/cousins-in-binary-tree)

```java
public boolean isCousins(TreeNode root, int x, int y) {
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    TreeNode node;
    while (!queue.isEmpty()) {
        int flag1 = 0;//该层等于x或y的结点个数
        int size = queue.size();
        while (size-- > 0) {
            int flag2 = 0;//该结点的子结点等于x或y的个数
            node = queue.poll();
            if (node.left != null) {
                //按题设，该二叉树结点val具有唯一值。找到一个等于x或y的结点则判断，没找到才add至队列
                if (x == node.left.val || y == node.left.val) {
                    flag1++;
                    flag2++;
                } else {
                    queue.add(node.left);
                }
            }
            if (node.right != null) {
                if (x == node.right.val || y == node.right.val) {
                    flag1++;
                    flag2++;
                } else {
                    queue.add(node.right);
                }
            }
            if (flag2 == 2) return false;
        }
        if (flag1 == 2) return true;
    }
    return false;
}
```

### N 叉树的最大深度

[559. N 叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-n-ary-tree)

```go
func maxDepth(root *Node) int {
	if root == nil {
		return 0
	}
	max := 0
	for _, child := range root.Children {
		max = int(math.Max(float64(max), float64(maxDepth(child))))
	}
	return max + 1
}
```

### N 叉树的前序遍历

[589. N 叉树的前序遍历](https://leetcode.cn/problems/n-ary-tree-preorder-traversal)

```go
func preorder(root *Node) (res []int) {
	if root == nil {
		return
	}
	s := []*Node{root}
	for len(s) > 0 {
		node := s[len(s)-1]
		s = s[:len(s)-1]
		res = append(res, node.Val)
		for i := len(node.Children) - 1; i >= 0; i-- {
			s = append(s, node.Children[i])
		}
	}
	return
}
```

### N 叉树的后序遍历

[590. N 叉树的后序遍历](https://leetcode.cn/problems/n-ary-tree-postorder-traversal)

```go
func postorder(root *Node) (res []int) {
	if root == nil {
		return
	}
	s := []*Node{root}
	for len(s) > 0 {
		node := s[len(s)-1]
		s = s[:len(s)-1]
		res = append(res, node.Val)
		for _, child := range node.Children {
			s = append(s, child)
		}
	}
	length := len(res)
	for i := 0; i < length/2; i++ {
		res[i], res[length-1-i] = res[length-1-i], res[i]
	}
	return
}
```

### N 叉树的层序遍历

[429. N 叉树的层序遍历](https://leetcode.cn/problems/n-ary-tree-level-order-traversal)

```go
func levelOrder(root *Node) (ans [][]int) {
	if root == nil {
		return
	}
	q := []*Node{root}
	for len(q) > 0 {
		var level []int
		length := len(q)
		for i := 0; i < length; i++ {
			level = append(level, q[i].Val)
			q = append(q, q[i].Children...)
		}
		ans = append(ans, level)
		q = q[length:]
	}
	return
}
```

### Morris Traversal

不使用栈，使用线索二叉树，空间复杂度为 O(1)

> 每个前驱恰好访问两次，前序遍历和中序遍历仅有一行代码不同

```go
func inorderTraversal(root *TreeNode) []int {
	var res []int
	curr := root
	for curr != nil {
		if curr.Left == nil {
			res = append(res, curr.Val)
			curr = curr.Right
		} else {
			pre := curr.Left
			for pre.Right != nil && pre.Right != curr {
				pre = pre.Right
			}
			if pre.Right == nil {
				pre.Right = curr
				curr = curr.Left
			} else {
				res = append(res, curr.Val)
				pre.Right = nil
				curr = curr.Right
			}
		}
	}
	return res
}

func preorderTraversal(root *TreeNode) []int {
	var res []int
	curr := root
	for curr != nil {
		if curr.Left == nil {
			res = append(res, curr.Val)
			curr = curr.Right
		} else {
			pre := curr.Left
			for pre.Right != nil && pre.Right != curr {
				pre = pre.Right
			}
			if pre.Right == nil {
				res = append(res, curr.Val)
				pre.Right = curr
				curr = curr.Left
			} else {
				pre.Right = nil
				curr = curr.Right
			}
		}
	}
	return res
}
```

## BST

高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

二叉查找树（Binary Search Tree），它或者是一棵空树，或者是具有下列性质的二叉树：

- 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
- 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
- 它的左、右子树也分别为二叉排序树。

二叉搜索树作为一种经典的数据结构，它既有链表的快速插入与删除操作的特点，又有数组快速查找的优势；
所以应用十分广泛，例如在文件系统和数据库系统一般会采用这种数据结构进行高效率的排序与检索操作。

### 验证二叉搜索树

[98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree)

```go
func isValidBST(root *TreeNode) bool {
	var stack []*TreeNode
	inorder := -1 << 63
	for len(stack) > 0 || root != nil {
		for root != nil {
			// push
			stack = append(stack, root)
			root = root.Left
		}
		// pop
		root = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if root.Val <= inorder {
			return false
		}
		inorder = root.Val
		root = root.Right
	}
	return true
}
```

### 有序数组转二叉搜索树

[108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree)

```go
func sortedArrayToBST(nums []int) *TreeNode {
	if len(nums) == 0 {
		return nil
	}
	mid := len(nums) / 2
	return &TreeNode{nums[mid], sortedArrayToBST(nums[:mid]), sortedArrayToBST(nums[mid+1:])}
}
```

### 二叉搜索树中的搜索

[700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree)

> 递归

```go
func searchBST(root *TreeNode, val int) *TreeNode {
	if root == nil || root.Val == val {
		return root
	}
	if root.Val > val {
		return searchBST(root.Left, val)
	}
	return searchBST(root.Right, val)
}
```

> 迭代

```go
func searchBST(root *TreeNode, val int) *TreeNode {
	for root != nil && root.Val != val {
		if root.Val > val {
			root = root.Left
		} else {
			root = root.Right
		}
	}
	return root
}
```

## Trie

### 实现 Trie (前缀树)

[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree)

```go
type Trie struct {
	children map[rune]*Trie
	isEnd    bool
}

func Constructor() Trie {
	return Trie{make(map[rune]*Trie), false}
}

func (trie *Trie) Insert(word string) {
	p := trie
	for _, ch := range word {
		if child, ok := p.children[ch]; ok {
			p = child
		} else {
			newNode := &Trie{children: make(map[rune]*Trie)}
			p.children[ch] = newNode
			p = newNode
		}
	}
	p.isEnd = true
}

func (trie *Trie) Search(word string) bool {
	p := trie
	for _, ch := range word {
		if child, ok := p.children[ch]; ok {
			p = child
			continue
		}
		return false
	}
	return p.isEnd
}

func (trie *Trie) StartsWith(prefix string) bool {
	p := trie
	for _, ch := range prefix {
		if child, ok := p.children[ch]; ok {
			p = child
			continue
		}
		return false
	}
	return true
}
```
