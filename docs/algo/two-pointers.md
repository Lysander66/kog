---
sidebar_position: 2
---

双指针是一种思想，一种技巧或一种方法，并不是什么特别具体的算法，在二分查找等算法中经常用到这个技巧。具体就是用两个变量动态存储两个或多个结点，来方便我们进行一些操作。通常用在线性的数据结构中，比如链表和数组，有时候也会用在图算法中。

## 快慢指针

类似于龟兔赛跑，两个链表上的指针从同一节点出发，其中一个指针前进速度是另一个指针的两倍。利用快慢指针可以用来解决某些算法问题，比如

1. 计算链表的中点：快慢指针从头节点出发，每轮迭代中，快指针向前移动两个节点，慢指针向前移动一个节点，最终当快指针到达终点的时候，慢指针刚好在中间的节点。
2. 判断链表是否有环：如果链表中存在环，则在链表上不断前进的指针会一直在环里绕圈子，且不能知道链表是否有环。使用快慢指针，当链表中存在环时，两个指针最终会在环中相遇。
3. 判断链表中环的起点：当我们判断出链表中存在环，并且知道了两个指针相遇的节点，我们可以让其中任一个指针指向头节点，然后让它俩以相同速度前进，再次相遇时所在的节点位置就是环开始的位置。
4. 求链表中环的长度：只要相遇后一个不动，另一个前进直到相遇算一下走了多少步就好了
5. 求链表倒数第 k 个元素：先让其中一个指针向前走 k 步，接着两个指针以同样的速度一起向前进，直到前面的指针走到尽头了，则后面的指针即为倒数第 k 个元素。（严格来说应该叫先后指针而非快慢指针）

### 删除链表的倒数第 N 个节点

[19. 删除链表的倒数第 N 个节点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list)

```go
func removeNthFromEnd(head *ListNode, n int) *ListNode {
	dummy := &ListNode{Next: head}
	fast, slow := dummy, dummy
	// 先找到倒数第n个节点前一个节点，即倒数第n+1个节点
	for i := 0; i < n+1; i++ {
		fast = fast.Next
	}
	for fast != nil {
		fast, slow = fast.Next, slow.Next
	}
	slow.Next = slow.Next.Next
	return dummy.Next
}
```

### 链表开始入环的第一个节点

[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii)

```go
func detectCycle(head *ListNode) *ListNode {
	slow, fast := head, head
	for fast != nil && fast.Next != nil {
		slow, fast = slow.Next, fast.Next.Next
		if slow == fast {
			slow = head
			for slow != fast {
				slow, fast = slow.Next, fast.Next
			}
			return slow
		}
	}
	return nil
}
```

### 环形链表

[141. 环形链表](https://leetcode.cn/problems/linked-list-cycle)

```go
func hasCycle(head *ListNode) bool {
	slow, fast := head, head
	for fast != nil && fast.Next != nil {
		slow, fast = slow.Next, fast.Next.Next
		if slow == fast {
			return true
		}
	}
	return false
}
```

### 回文链表

[234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list)

> 该方法的缺点是，在并发环境下，函数运行时需要锁定其他线程或进程对链表的访问，因为在函数执执行过程中链表暂时断开。

```go
func isPalindrome(head *ListNode) bool {
	var first *ListNode
	fast := head
	// 快慢指针，fast走两步，head走一步。fast走到尾时，head走到中点
	// 同时，反转前半部分链表
	for fast != nil && fast.Next != nil {
		fast = fast.Next.Next
		tmp := head.Next
		head.Next = first
		first = head
		head = tmp
	}
	// 如果链表长度是奇数，则后半部分链表要从中点的后一位开始
	var second *ListNode
	if fast == nil {
		second = head
	} else {
		second = head.Next
	}
	// 比较，同时还原链表
	flag := true
	for first != nil {
		flag = flag && first.Val == second.Val
		tmp := first.Next
		first.Next = head
		head = first
		first = tmp
		second = second.Next
	}
	return flag
}
```

## 碰撞指针

1. 二分查找问题
2. n 数之和问题：比如两数之和问题，先对数组排序然后左右指针找到满足条件的两个数。如果是三数问题就转化为一个数和另外两个数的两数问题。以此类推。

### 合并两个有序链表

[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists)

```go
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
	dummy := &ListNode{}
	p := dummy
	for l1 != nil && l2 != nil {
		if l1.Val <= l2.Val {
			p.Next, l1 = l1, l1.Next
		} else {
			p.Next, l2 = l2, l2.Next
		}
		p = p.Next
	}
	// go不支持三元运算符...
	if l1 == nil {
		p.Next = l2
	} else {
		p.Next = l1
	}
	return dummy.Next
}
```

### 合并两个有序数组

[88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array)

> 从 2 个数组长度之和的最后一个位置开始，依次选取两个数组中大的数，从第一个数组的尾巴开始往头放

```go
func merge(nums1 []int, m int, nums2 []int, n int) {
	tail := m + n - 1
	m--
	n--
	for m >= 0 && n >= 0 {
		if nums1[m] < nums2[n] {
			nums1[tail] = nums2[n]
			n--
		} else {
			nums1[tail] = nums1[m]
			m--
		}
		tail--
	}
	for ; n >= 0; n-- {
		nums1[n] = nums2[n]
	}
}
```

```java
public void merge(int[] nums1, int m, int[] nums2, int n) {
	int x = m-- + n-- - 1;
	while (m >= 0 && n >= 0) {
		nums1[x--] = nums1[m] > nums2[n] ? nums1[m--] : nums2[n--];
	}
	while (n >= 0) {
		nums1[x--] = nums2[n--];
	}
}
```

### 调整数组使奇数位于偶数前面

[剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode.cn/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof)

> 首尾双指针  
> 头指针向右移，直到发现偶数  
> 尾指针向左移，直到发现奇数  
> 当头指针指向偶数 & 尾指针指向奇数时，交换位置

```go
func exchange(nums []int) []int {
	i, j := 0, len(nums)-1
	for i < j {
		if nums[i]&1 == 1 {
			i++
			continue
		}
		if nums[j]&1 == 0 {
			j--
			continue
		}
		nums[i], nums[j] = nums[j], nums[i]
		i++
		j--
	}
	return nums
}
```

### 颜色分类

[75. 颜色分类](https://leetcode.cn/problems/sort-colors)

> 若 `nums[i]`等于 2，不断与 `nums[p2]` 交换，直到 `nums[i]`不等于 2  
> 此时，如果 `nums[i]`等于 0，则与 `nums[p0]` 交换

```go
func sortColors(nums []int) {
	p0, p2 := 0, len(nums)-1
	for i := 0; i <= p2; i++ {
		for ; i <= p2 && nums[i] == 2; p2-- {
			nums[i], nums[p2] = nums[p2], nums[i]
		}
		if nums[i] == 0 {
			nums[i], nums[p0] = nums[p0], nums[i]
			p0++
		}
	}
}
```

### 移除元素

[27. 移除元素](https://leetcode.cn/problems/remove-element)

```go
func removeElement(nums []int, val int) int {
	i, j := 0, len(nums)-1
	for i <= j {
		if nums[i] != val {
			i++
		} else {
			nums[i] = nums[j]
			j--
		}
	}
	return i
}
```

### 删除排序数组中的重复项

[26. 删除排序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array)

> 题设数组为排序数组，用双指针，前后对比即可。

```go
func removeDuplicates(nums []int) int {
	last := -1
	for _, num := range nums {
		if last == -1 || num != nums[last] {
			last++
			nums[last] = num
		}
	}
	return last + 1
}
```

### 删除排序数组中的重复项 II

[80. 删除排序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii)

```go
func removeDuplicates(nums []int) int {
	i := 0
	for _, num := range nums {
		if i < 2 || num > nums[i-2] {
			nums[i] = num
			i++
		}
	}
	return i
}
```

### 两数之和 II

[167. 两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted)

```go
func twoSum(numbers []int, target int) []int {
	low, high := 0, len(numbers)-1
	for low < high {
		sum := numbers[low] + numbers[high]
		if sum == target {
			return []int{low + 1, high + 1}
		} else if sum < target {
			low++
		} else {
			high--
		}
	}
	return []int{-1, -1}
}
```

### 三数之和

[15. 三数之和](https://leetcode.cn/problems/3sum)

> 排序，双指针

```go
func threeSum(nums []int) (ans [][]int) {
	sort.Ints(nums)
	for i := 0; i < len(nums)-2; i++ {
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}
		L, R := i+1, len(nums)-1
		for L < R {
			if nums[i]+nums[L]+nums[R] < 0 {
				L++
			} else if nums[i]+nums[L]+nums[R] > 0 {
				R--
			} else {
				ans = append(ans, []int{nums[i], nums[L], nums[R]})
				for L < R && nums[L] == nums[L+1] {
					L++
				}
				for L < R && nums[R] == nums[R-1] {
					R--
				}
				L, R = L+1, R-1
			}
		}
	}
	return
}
```

### 四数之和

[18. 四数之和](https://leetcode.cn/problems/4sum)

```go
func fourSum(nums []int, target int) [][]int {
	sort.Ints(nums)
	var res [][]int
	var L, R, sum int
	len := len(nums)
	for i := 0; i < len-3; i++ {
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}
		for j := i + 1; j < len-2; j++ {
			if j > i+1 && nums[j] == nums[j-1] {
				continue
			}
			sum = target - nums[i] - nums[j]
			L, R = j+1, len-1
			for L < R {
				if nums[L]+nums[R] < sum {
					L++
				} else if nums[L]+nums[R] > sum {
					R--
				} else {
					res = append(res, []int{nums[i], nums[j], nums[L], nums[R]})
					for L < R && nums[L] == nums[L+1] {
						L++
					}
					for L < R && nums[R] == nums[R-1] {
						R--
					}
					L, R = L+1, R-1
				}
			}
		}
	}
	return res
}
```

### 反转字符串

[344. 反转字符串](https://leetcode.cn/problems/reverse-string)

```go
func reverseString(s []byte) {
	for i := 0; i < len(s)/2; i++ {
		s[i], s[len(s)-1-i] = s[len(s)-1-i], s[i]
	}
}
```

## Sliding Window

两个指针，一前一后组成滑动窗口，并计算滑动窗口中的元素的问题。这类问题一般包括

1. 字符串匹配问题
2. 子数组问题

### 无重复字符的最长子串

[3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters)

```go
func lengthOfLongestSubstring(s string) int {
	lookup := make(map[byte]int)
	i, j, ans := 0, 0, 0
	for ; i < len(s); i++ {
		if idx, ok := lookup[s[i]]; ok && idx >= j {
			j = idx + 1
		}
		if i-j+1 > ans {
			ans = i - j + 1
		}
		lookup[s[i]] = i
	}
	return ans
}
```

```go
// 滑动窗口，双指针 i 和 start
func lengthOfLongestSubstring(s string) int {
	// 记录某个字符上一次出现的位置
	lastOccurred := make(map[rune]int)
	maxLength, start := 0, 0
	for i, ch := range []rune(s) {
		// 如果上一次出现的位置x在start之后，则将start指针移动到x后
		if x, ok := lastOccurred[ch]; ok && x >= start {
			start = x + 1
		}
		// maxLength = Max(maxLength, i-start+1)
		if i-start+1 > maxLength {
			maxLength = i - start + 1
		}
		lastOccurred[ch] = i
	}
	return maxLength
}
```

### 滑动窗口最大值

[239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum)

### 字符串的排列

[567. 字符串的排列](https://leetcode.cn/problems/permutation-in-string)

## references

1. [双指针套路总结](https://zhuanlan.zhihu.com/p/95747836)
1. [链表开始入环的第一个节点](https://www.jianshu.com/p/6ebedde370b0)
