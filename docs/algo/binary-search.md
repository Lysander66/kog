---
sidebar_position: 2
---

## LeetCode

二分查找时间复杂度为 O(logn)，虽然性能比较优秀，但应用场景也比较有限。  
底层必须依赖数组，并且还要求数据是有序的。对于较小规模的数据查找，我们直接使用顺序遍历就可以了，二分查找的优势并不明显。二分查找更适合处理静态数据，也就是没有频繁的数据插入、删除操作。

最简单的情况：有序数组中不存在重复元素，查找值等于给定值的数据。

### 搜索二维矩阵

[74. 搜索二维矩阵](https://leetcode-cn.com/problems/search-a-2d-matrix)

> Treat matrix as 1D array.

ps: `matrix[mid/n][mid%n]`

```go
func searchMatrix(matrix [][]int, target int) bool {
	if len(matrix) == 0 {
		return false
	}
	n := len(matrix[0])
	left, right := 0, n*len(matrix)-1
	for left <= right {
		mid := left + (right-left)>>1
		if matrix[mid/n][mid%n] == target {
			return true
		} else if matrix[mid/n][mid%n] > target {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}
	return false
}

// 更简洁写法
func searchMatrix(matrix [][]int, target int) bool {
	m, n := len(matrix), len(matrix[0])
	i := sort.Search(m*n, func(i int) bool { return matrix[i/n][i%n] >= target })
	return i < m*n && matrix[i/n][i%n] == target
}
```

### 搜索二维矩阵 II

[240. 搜索二维矩阵 II](https://leetcode-cn.com/problems/search-a-2d-matrix-ii)

> 选择出发点

- 左下角，往右走增大，往上走减小，可选
- 右上角，往下走增大，往左走减小，可选
- 左上角，往右走和往下走都增大，不能选
- 右下角，往上走和往左走都减小，不能选

```go
func searchMatrix(matrix [][]int, target int) bool {
	if len(matrix) == 0 {
		return false
	}
	// start our "pointer" in the bottom-left
	row, col := len(matrix)-1, 0
	for row >= 0 && col < len(matrix[0]) {
		if matrix[row][col] > target {
			row--
		} else if matrix[row][col] < target {
			col++
		} else {
			return true
		}
	}
	return false
}
```

### 寻找旋转排序数组中的最小值

[153. 寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)

> 画图理解。要么是直线，例如 `[1, 2, 3, 4, 5]`  
> 要么是折线，例如 `[3, 4, 5, 1, 2]`，前半段`[3, 4, 5]` 在后半段`[1, 2]`的上方

```go
func findMin(nums []int) int {
	low, high := 0, len(nums)-1
	for low < high {
		pivot := low + (high-low)/2
		if nums[pivot] > nums[high] {
			low = pivot + 1
		} else {
			high = pivot
		}
	}
	return nums[low]
}
```

### 寻找旋转排序数组中的最小值 II

[154. 寻找旋转排序数组中的最小值 II](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)

> 按题设，可能存在重复元素

```go
func findMin(nums []int) int {
	low, high := 0, len(nums)-1
	for low < high {
		pivot := low + (high-low)/2
		if nums[pivot] > nums[high] {
			low = pivot + 1
		} else if nums[pivot] < nums[high] {
			high = pivot
		} else {
			high--
		}
	}
	return nums[low]
}
```

### 比目标字母大的最小字母

[744. 寻找比目标字母大的最小字母](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target)

```go
func nextGreatestLetter(letters []byte, target byte) byte {
	low, high := 0, len(letters)
	for low < high {
		mid := low + (high-low)/2
		if letters[mid] <= target {
			low = mid + 1
		} else {
			high = mid
		}
	}
	return letters[low%len(letters)]
}
```

取余，如果 `low = len(letters)`，则返回 letters[0]

### 第一个错误的版本

[278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version)

```go
func firstBadVersion(n int) int {
	lo, hi := 1, n
	for lo <= hi {
		mid := lo + (hi-lo)/2
		if isBadVersion(mid) {
			hi = mid - 1
		} else {
			lo = mid + 1
		}
	}
	return lo
}
```

### 猜数字大小

[374. 猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower)

```go
func guessNumber(n int) int {
	left, right := 1, n
	for left <= right {
		mid := left + (right-left)/2
		if guess(mid) == 1 {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return left
}
```

### Pow(x, n)

[50. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)

> 快速幂

```go
func myPow(x float64, n int) float64 {
	if n == 0 {
		return 1
	}
	if n == -1 {
		return 1 / x
	}
	y := myPow(x, n>>1)
	if n&1 == 1 {
		return y * y * x
	}
	return y * y
}
```

### x 的平方根

[69. x 的平方根](https://leetcode-cn.com/problems/sqrtx)

> 二分查找

```go
func mySqrt(x int) int {
	left, right := 0, x
	ans := -1
	for left <= right {
		mid := left + (right-left)/2
		if mid*mid <= x {
			ans = mid
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return ans
}
```

牛顿迭代

```go
func mySqrt(x int) int {
	if x == 0 {
		return 0
	}
	C, x0 := float64(x), float64(x)
	for {
		xi := 0.5 * (x0 + C/x0)
		if math.Abs(x0-xi) < 1e-7 {
			break
		}
		x0 = xi
	}
	return int(x0)
}
```

### 缺失的数字

[0 ～ n-1 中缺失的数字](https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof)

> 缺失数字左边值等于下标，右边不等  
> 这道题相当于，找出第一个 `num[i] != i` 的下标

```go
func missingNumber(nums []int) int {
	i, j := 0, len(nums)-1
	for i <= j {
		m := (i + j) / 2
		if nums[m] == m {
			i = m + 1
		} else {
			j = m - 1
		}
	}
	return i
}
```

## 其他

### 第一个等于 target

```go
func searchFirstEqualElement(nums []int, target int) int {
	low, high := 0, len(nums)-1
	for low <= high {
		mid := low + (high-low)/2
		if nums[mid] > target {
			high = mid - 1
		} else if nums[mid] < target {
			low = mid + 1
		} else {
			if (mid == 0) || (nums[mid-1] != target) {
				return mid
			}
			high = mid - 1 //不是第一个，继续往前找
		}
	}
	return -1
}
```

### 第一个大于等于 target

```go
func searchFirstGreaterElement(nums []int, target int) int {
	low, high := 0, len(nums)-1
	for low <= high {
		mid := low + (high-low)/2
		if nums[mid] >= target {
			if (mid == 0) || (nums[mid-1] < target) { //第一个大于等于 target 的元素
				return mid
			}
			high = mid - 1 //不是第一个，继续往前找
		} else {
			low = mid + 1
		}
	}
	return -1
}
```

### 最后一个等于 target

```go
func searchLastEqualElement(nums []int, target int) int {
	low, high := 0, len(nums)-1
	for low <= high {
		mid := low + (high-low)/2
		if nums[mid] > target {
			high = mid - 1
		} else if nums[mid] < target {
			low = mid + 1
		} else {
			if (mid == len(nums)-1) || (nums[mid+1] != target) {
				return mid
			}
			low = mid + 1 //不是最后一个，继续往后找
		}
	}
	return -1
}
```

### 最后一个小于等于 target

```go
func searchLastLessElement(nums []int, target int) int {
	low, high := 0, len(nums)-1
	for low <= high {
		mid := low + (high-low)/2
		if nums[mid] <= target {
			if (mid == len(nums)-1) || (nums[mid+1] > target) { //最后一个小于等于 target 的元素
				return mid
			}
			low = mid + 1 //不是最后一个，继续往后找
		} else {
			high = mid - 1
		}
	}
	return -1
}
```
