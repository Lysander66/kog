---
sidebar_position: 3
---

堆（Heap）是一种完全二叉树。它最大的特性是：每个节点的值都大于等于（或小于等于）其子树节点的值。因此，堆被分成了两类，大顶堆和小顶堆。

堆是一种完全二叉树。它最大的特性是：每个节点的值都大于等于（或小于等于）其子树节点的值。因此，堆被分成了两类，大顶堆和小顶堆。

堆中比较重要的两个操作是插入一个数据和删除堆顶元素。这两个操作都要用到堆化。插入一个数据的时候，我们把新插入的数据放到数组的最后，然后从下往上堆化；

删除堆顶数据的时候，我们把数组中的最后一个元素放到堆顶，然后从上往下堆化。这两个操作时间复杂度都是 O(logn)。

**堆的应用**

- 优先级队列

1. 合并有序小文件
2. 高性能定时器

- 求 Top K
- 求中位数

### 数组中的第 K 个最大元素

[215. 数组中的第 K 个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array)

> build max heap
> 然后交换堆顶元素和最后一个元素，heapify 前 n-1 个元素，这样堆顶就是第 2 大  的的元素，以此类推，可以找到第 3 大..第 k 大

```go
func findKthLargest(nums []int, k int) int {
	for i := (len(nums) - 1) / 2; i >= 0; i-- {
		siftDown(nums, i, len(nums))
	}
	n := len(nums) - 1
	for ; k > 1; k-- {
		nums[0], nums[n] = nums[n], nums[0]
		siftDown(nums, 0, n)
		n--
	}
	return nums[0]
}

func siftDown(a []int, i, n int) {
	for {
		l, r, larger := i*2+1, i*2+2, i
		if l < n && a[l] > a[larger] {
			larger = l
		}
		if r < n && a[r] > a[larger] {
			larger = r
		}
		if larger == i {
			break
		}
		a[i], a[larger] = a[larger], a[i]
		i = larger
	}
}
```

### 剑指 Offer 40. 最小的 k 个数

[剑指 Offer 40. 最小的 k 个数](https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof)

> 先将前 k 个数插入大根堆中，随后从第 k+1 个数开始遍历，如果比堆顶小，则交换位置，然后堆化。

```go
func getLeastNumbers(arr []int, k int) []int {
	for i := k / 2; i >= 0; i-- {
		siftDown(arr, i, k)
	}
	for i := k; i < len(arr); i++ {
		if arr[i] < arr[0] {
			arr[0], arr[i] = arr[i], arr[0]
			siftDown(arr, 0, k)
		}
	}
	return arr[0:k]
}

func siftDown(a []int, i, n int) {
	for {
		l, r, larger := i*2+1, i*2+2, i
		if l < n && a[l] > a[larger] {
			larger = l
		}
		if r < n && a[r] > a[larger] {
			larger = r
		}
		if larger == i {
			break
		}
		a[i], a[larger] = a[larger], a[i]
		i = larger
	}
}
```

### 数据流中的第 K 大元素

[703. 数据流中的第 K 大元素](https://leetcode.cn/problems/kth-largest-element-in-a-stream)

```

```

### 数据流的中位数

[295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream)

```

```

### 前 K 个高频元素

[347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements)

```

```

### 前 K 个高频单词

[692. 前 K 个高频单词](https://leetcode.cn/problems/top-k-frequent-words)

```

```

### 合并 K 个排序链表

[23. 合并 K 个排序链表](https://leetcode.cn/problems/merge-k-sorted-lists)

```

```

## references

1. [什么是二叉堆](https://blog.csdn.net/xiao__jia__jia/article/details/82755722)
1. [为什么说堆排序没有快速排序快](https://time.geekbang.org/column/article/69913)
1. [堆的应用：如何快速获取到 Top 10 最热门的搜索关键词](https://time.geekbang.org/column/article/70187)
