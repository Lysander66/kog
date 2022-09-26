---
sidebar_position: 1
---

## recursion

[235. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree)

```go
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	if root == nil || p == nil || q == nil {
		return nil
	}
	ancestor := root
	for {
		if p.Val < ancestor.Val && q.Val < ancestor.Val {
			ancestor = ancestor.Left
		} else if p.Val > ancestor.Val && q.Val > ancestor.Val {
			ancestor = ancestor.Right
		} else {
			return ancestor
		}
	}
}
```

[236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree)

```go
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	if root == nil || root == p || root == q {
		return root
	}
	left := lowestCommonAncestor(root.Left, p, q)
	right := lowestCommonAncestor(root.Right, p, q)
	if left != nil && right != nil {
		return root
	}
	if left == nil {
		return right
	}
	return left
}
```

## 剑指 Offer

[数组中出现次数超过一半的数字](https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof)

> Boyer-Moore 投票算法

```go
func majorityElement(nums []int) int {
	candidate, count := -1, 0
	for _, num := range nums {
		if count == 0 {
			candidate = num
		}
		if candidate == num {
			count++
		} else {
			count--
		}
	}
	return candidate
}
```

[03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof)
最简单是用 map
但是题目说 `nums 里的所有数字都在 0～n-1 的范围内`

原地交换 空间复杂度 O(1)

```go
func findRepeatNumber(nums []int) int {
	for i := 0; i < len(nums); i++ {
		if nums[i] != i {
			if nums[nums[i]] == nums[i] {
				return nums[i]
			}
			// swap
			nums[nums[i]], nums[i] = nums[i], nums[nums[i]]
		}
	}
	return -1
}
```

交换：`nums[nums[i]] = nums[i]` 将数字 n 放到下标 n 的位置

```go
func findRepeatNumber(nums []int) int {
	for i := 0; i < len(nums); i++ {
		n := nums[i]
		if n != i {
			if nums[n] == n {
				return n
			}
			// swap
			nums[i] = nums[n]
			nums[n] = n
		}
	}
	return -1
}
```

[05. 替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof)

```go
func replaceSpace(s string) string {
	var b strings.Builder
	for _, v := range s {
		if v == ' ' {
			b.WriteString("%20")
		} else {
			b.WriteRune(v)
		}
	}
	return b.String()
}
```

[06. 从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof)

```go
func reversePrint(head *ListNode) []int {
	index := -1
	p := head
	for p != nil {
		index++
		p = p.Next
	}
	res := make([]int, index+1)
	p = head
	// 倒序填充
	for p != nil {
		res[index] = p.Val
		index--
		p = p.Next
	}
	return res
}
```

## 位运算

### 汉明距离

[461. 汉明距离](https://leetcode-cn.com/problems/hamming-distance)

```go
// 在工程中，我们应该直接使用内置函数。
func hammingDistance(x, y int) int {
	return bits.OnesCount(uint(x ^ y))
}

// 移位实现位计数
func hammingDistance(x, y int) (ans int) {
	for s := x ^ y; s > 0; s >>= 1 {
		ans += s & 1
	}
	return
}

// Brian Kernighan 算法
func hammingDistance(x, y int) (ans int) {
	for s := x ^ y; s > 0; s &= s - 1 {
		ans++
	}
	return
}
```

### 位 1 的个数

[191. 位 1 的个数](https://leetcode-cn.com/problems/number-of-1-bits)

```go
// 普通
func hammingWeight(n uint32) int {
	var ans uint32
	for ; n > 0; n >>= 1 {
		ans += n & 1
	}
	return int(ans)
}

// 进阶
func hammingWeight(n uint32) (count int) {
	for ; n > 0; n &= n - 1 {
		count++
	}
	return
}

// 高端操作 Java、Redis的bitCount()
func hammingWeight(n uint32) int {
	n = n - ((n >> 1) & 0x55555555)
	n = n&0x33333333 + (n>>2)&0x33333333
	n = (n + (n >> 4)) & 0x0f0f0f0f
	n += n >> 8
	n += n >> 16
	return int(n & 0x3f)
}
```

## weight random

前缀和与二分搜索

```go
type Solution struct {
	prefixSum []int
}

func Constructor(w []int) Solution {
	prefixSum := make([]int, len(w))
	for i, e := range w {
		if i == 0 {
			prefixSum[i] = e
			continue
		}
		prefixSum[i] = prefixSum[i-1] + e
	}
	return Solution{prefixSum: prefixSum}
}

func (t *Solution) PickIndex() int {
	rand.Seed(time.Now().UnixNano())
	n := rand.Intn(t.prefixSum[len(t.prefixSum)-1]) + 1
	lo, hi := 0, len(t.prefixSum)-1
	for lo < hi {
		mid := lo + (hi-lo)>>1
		if t.prefixSum[mid] == n {
			return mid
		} else if t.prefixSum[mid] < n {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}
```

## shuffle

Knuth-Durstenfeld Shuffle

```go
rand.Seed(time.Now().Unix())
list := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
i := len(list) - 1
for ; i > 0; i-- {
    j := rand.Intn(i + 1)
    list[i], list[j] = list[j], list[i]
}
```

[Inside-Out Algorithm](https://blog.csdn.net/qq_26399665/article/details/79831490)

## 杨辉三角

[118. 杨辉三角](https://leetcode-cn.com/problems/pascals-triangle)

```go
func generate(numRows int) [][]int {
	ans := make([][]int, numRows)
	for i := range ans {
		ans[i] = make([]int, i+1)
		ans[i][0] = 1
		ans[i][i] = 1
		for j := 1; j < i; j++ {
			ans[i][j] = ans[i-1][j-1] + ans[i-1][j]
		}
	}
	return ans
}
```

## 三角形的最大周长

[976. 三角形的最大周长](https://leetcode-cn.com/problems/largest-perimeter-triangle)

```go
func largestPerimeter(a []int) int {
	sort.Ints(a)
	for i := len(a) - 1; i >= 2; i-- {
		if a[i-2]+a[i-1] > a[i] {
			return a[i-2] + a[i-1] + a[i]
		}
	}
	return 0
}
```

## 排列组合

### 下一个排列

[31. 下一个排列](https://leetcode-cn.com/problems/next-permutation)

### 两个数组的交集

[349. 两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays)

### 两个数组的交集 II

[350. 两个数组的交集 II](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii)

什么是局部性原理？
局部性原理的逻辑是这样的：
（1）内存读写块，磁盘读写慢，而且慢很多；
（2）磁盘预读：磁盘读写并不是按需读取，而是按页预读，一次会读一页的数据，每次加载更多的数据，如果未来要读取的数据就在这一页中，可以避免未来的磁盘 IO，提高效率；
画外音：通常，操作系统一页数据是 4K，MySQL 的一页是 16K。
（3）局部性原理：软件设计要尽量遵循“数据读取集中”与“使用到一个数据，大概率会使用其附近的数据”，这样磁盘预读能充分提高磁盘 IO；

- 稀疏索引

尽可能把所有列定义为 NOT NULL
索引 NULL 列需要额外的空间来保存，所以要占用更多的空间
进行比较和计算时要对 NULL 值做特别的处理
NULL 只能采用 IS NULL 或者 IS NOT NULL，而在=/!=/in/not in 时很容易造成查询结果与设计逻辑不符

数值型字段，default 值建议选用 0

区分度最高的放在联合索引的最左侧（区分度=列中不同值的数量/列的总行数）；

尽量把字段长度小的列放在联合索引的最左侧（因为字段长度越小，一页能存储的数据量越大，IO 性能也就越好）；

使用最频繁的列放到联合索引的左侧（这样可以比较少的建立一些索引）。

优先考虑覆盖索引
对于频繁的查询优先考虑使用覆盖索引。覆盖索引就是包含了所有查询字段(where,select,ordery by,group by 包含的字段)的索引
覆盖索引的好处：1.可以把随机 IO 变成顺序 IO 加快查询效率；2.能够避免回表查询，提升查询效率

一定要在表与表之间的关联键上建立索引

SQL 性能优化的目标:至少要达到 range 级别，要求是 ref 级别，如果可以是 consts 最好。

48、当只要一行数据时使用 LIMIT 1 ：
当你查询表的有些时候，你已经知道结果只会有一条结果，但因为你可能需要去 fetch 游标，或是你也许会去检查返回的记录数。
在这种情况下，加上 LIMIT 1 可以增加性能。这样一来，MySQL 数据库引擎会在找到一条数据后停止搜索，而不是继续往后查少下一条符合记录的数据。

需要注意的是， MySQL 8.0 版本直接将`查询缓存`的整块功能删掉了，也就是说 8.0 开始彻底没有这个功能了。

> 阿里巴巴 java 开发规范，“任何货币金额，均以最小货币单位且整型类型来进行存储”。这段话不知有没有道理。

> 最左前缀
> 覆盖索引
> 回表
> mysql 在使用不等于的时候，不能使用索引导致全表扫描
> like 以通配符（%abc）开始，索引会失效。解决：查询条件是覆盖索引

- InnoDB 存储引擎它也是有最小存储单位的，叫做页（Page），默认大小是 16kb
  任何表的 ibd 文件大小，它永远是 16k 的整数倍。理解这个事非常重要，MySQL 从磁盘加载数据是按照页来读取的，即便你查询一条数据，它也会读取一页 16k 的数据出来。
  数据库表中的数据都是存储在页里的，那么这一个页可以存放多少条记录呢？
  这取决于一行记录的大小是多少，假如一行数据大小是 1k，那么理论上一页就可以放 16 条数据。
  MySQL 参考手册中也有说到，InnoDB 会保留页的 1/16 空闲，以便将来插入或者更新索引使用，如果主键 id 不是顺序插入的，那可能还不是 1/16，会占用更多的空闲空间。
  总之，我们理解一个页不会全放数据就行了。

> HyperLogLog

- time
  const (
  secondsPerMinute = 60
  secondsPerHour = 60 _ secondsPerMinute
  secondsPerDay = 24 _ secondsPerHour
  secondsPerWeek = 7 * secondsPerDay
  daysPer400Years = 365*400 + 97
  daysPer100Years = 365*100 + 24
  daysPer4Years = 365*4 + 1
  )
