---
sidebar_position: 2
---

## LeetCode

二分查找时间复杂度为 O(logn)，虽然性能比较优秀，但应用场景也比较有限。  
底层必须依赖数组，并且还要求数据是有序的。对于较小规模的数据查找，我们直接使用顺序遍历就可以了，二分查找的优势并不明显。二分查找更适合处理静态数据，也就是没有频繁的数据插入、删除操作。

最简单的情况：有序数组中不存在重复元素，查找值等于给定值的数据。

### 第一个错误的版本

[278. 第一个错误的版本](https://leetcode.cn/problems/first-bad-version)

```go
func firstBadVersion(n int) int {
	return sort.Search(n, func(i int) bool { return isBadVersion(i) })
}
```

```go
func firstBadVersion(n int) int {
	i, j := 0, n
	for i < j {
		h := i + (j-i)/2
		if isBadVersion(h) {
			j = h
		} else {
			i = h + 1
		}
	}
	return i
}
```

### 猜数字大小

[374. 猜数字大小](https://leetcode.cn/problems/guess-number-higher-or-lower)

```go
func guessNumber(n int) int {
	i, j := 0, n
	for i < j {
		h := i + (j-i)/2
		if guess(h) <= 0 {
			j = h
		} else {
			i = h + 1
		}
	}
	return i
}
```

### x 的平方根

[69. x 的平方根](https://leetcode.cn/problems/sqrtx)

> 二分查找

```go
func mySqrt(x int) int {
	var sqrt int
	l, r := 0, x
	for l <= r {
		mid := l + (r-l)/2
		if mid*mid <= x {
			sqrt = mid
			l = mid + 1
		} else {
			r = mid - 1
		}
	}
	return sqrt
}
```

**牛顿法**

> 多数方程不存在求根公式，因此求精确根非常困难，甚至不可解，从而寻找方程的近似根就显得特别重要。方法使用函数 的泰勒级数的前面几项来寻找方程 的根。牛顿迭代法是求方程根的重要方法之一，其最大优点是在方程 的单根附近具有平方收敛，而且该法还可以用来求方程的重根、复根，此时线性收敛，但是可通过一些方法变成超线性收敛。另外该方法广泛用于计算机编程中。

一般来说，可以判断相邻两次迭代的结果的差值是否小于一个极小的非负数 ϵ\epsilonϵ，其中 ϵ 一般可以取 1e-6 或者 1e-7

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

[0 ～ n-1 中缺失的数字](https://leetcode.cn/problems/que-shi-de-shu-zi-lcof)

> 缺失数字左边值等于下标，右边不等  
> 这道题相当于，找出第一个 `num[i] != i` 的下标

```go
func missingNumber(nums []int) int {
	i, j := 0, len(nums)-1
	for i <= j {
		h := i + (j-i)/2
		if nums[h] == h {
			i = h + 1
		} else {
			j = h - 1
		}
	}
	return i
}
```

### 比目标字母大的最小字母

[744. 寻找比目标字母大的最小字母](https://leetcode.cn/problems/find-smallest-letter-greater-than-target)

```go
func nextGreatestLetter(letters []byte, target byte) byte {
	if letters[len(letters)-1] <= target {
		return letters[0]
	}
	i, j := 0, len(letters)-1
	for i < j {
		h := i + (j-i)/2
		if letters[h] > target {
			j = h
		} else {
			i = h + 1
		}
	}
	return letters[i]
}
```

### Pow(x, n)

[50. Pow(x, n)](https://leetcode.cn/problems/powx-n)

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

### 寻找旋转排序数组中的最小值

[153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array)

> 画图理解。要么是直线，例如 `[1, 2, 3, 4, 5]`  
> 要么是折线，例如 `[3, 4, 5, 1, 2]`，前半段`[3, 4, 5]` 在后半段`[1, 2]`的上方

```go
func findMin(nums []int) int {
	i, j := 0, len(nums)-1
	for i < j {
		h := i + (j-i)/2
		if nums[h] <= nums[j] {
			j = h
		} else {
			i = h + 1
		}
	}
	return nums[i]
}
```

### 寻找旋转排序数组中的最小值 II

[154. 寻找旋转排序数组中的最小值 II](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii)

> 按题设，可能存在重复元素

```go
func findMin(nums []int) int {
	i, j := 0, len(nums)-1
	for i < j {
		h := i + (j-i)/2
		if nums[h] < nums[j] {
			j = h
		} else if nums[h] > nums[j] {
			i = h + 1
		} else {
			j--
		}
	}
	return nums[i]
}
```

### 搜索二维矩阵

[74. 搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix)

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

[240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii)

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
