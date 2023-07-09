---
sidebar_position: 6
---

动态规划(dynamic programming)是运筹学的一个分支，是求解决策过程(decision process)最优化的数学方法。

### 最长回文子串

[5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring)

> Manacher 算法

### 接雨水

[42. 接雨水](https://leetcode.cn/problems/trapping-rain-water)

```go
func trap(height []int) (ans int) {
	left, right := 0, len(height)-1
	leftMax, rightMax := 0, 0
	for left < right {
		leftMax = max(leftMax, height[left])
		rightMax = max(rightMax, height[right])
		if height[left] < height[right] {
			ans += leftMax - height[left]
			left++
		} else {
			ans += rightMax - height[right]
			right--
		}
	}
	return
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}
```

### 连续子数组的最大和

[剑指 Offer 42. 连续子数组的最大和](https://leetcode.cn/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof)

```go
func maxSubArray(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	curr, ans := nums[0], nums[0]
	for i := 1; i < len(nums); i++ {
		curr = max(curr+nums[i], nums[i])
		ans = max(ans, curr)
	}
	return ans
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}
```

### 乘积最大子序列

[152. 乘积最大子序列](https://leetcode.cn/problems/maximum-product-subarray/)

```go
func maxProduct(nums []int) int {
	globalMax, localMax, localMin := math.MinInt64, 1, 1
	for _, num := range nums {
		localMax, localMin = max(num*localMax, num*localMin, num), min(num*localMax, num*localMin, num)
		globalMax = max(globalMax, localMax)
	}
	return globalMax
}

func max(nums ...int) int {
	n := nums[0]
	for i := 0; i < len(nums); i++ {
		if nums[i] > n {
			n = nums[i]
		}
	}
	return n
}

func min(nums ...int) int {
	n := nums[0]
	for i := 0; i < len(nums); i++ {
		if nums[i] < n {
			n = nums[i]
		}
	}
	return n
}
```

### 买卖股票的最佳时机

[121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

```go
// 解法一
func maxProfit(prices []int) (ans int) {
	if len(prices) == 0 {
		return
	}
	minPrice := prices[0]
	for _, price := range prices {
		minPrice = min(minPrice, price)
		ans = max(price-minPrice, ans)
	}
	return
}

// 解法二 单调栈
func maxProfit(prices []int) (ans int) {
	if len(prices) == 0 {
		return
	}
	stack := []int{prices[0]}
	for i := 1; i < len(prices); i++ {
		if prices[i] > stack[len(stack)-1] {
			stack = append(stack, prices[i])
		} else {
			index := len(stack) - 1
			for ; index >= 0; index-- {
				if stack[index] < prices[i] {
					break
				}
			}
			stack = stack[:index+1]
			stack = append(stack, prices[i])
		}
		ans = max(ans, stack[len(stack)-1]-stack[0])
	}
	return
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

func min(x, y int) int {
	if x < y {
		return x
	}
	return y
}
```

### 不同路径

[62. 不同路径](https://leetcode.cn/problems/unique-paths)

```go
// 一维
func uniquePaths(m, n int) int {
	if m < n {
		return uniquePaths(n, m)
	}
	ways := make([]int, n)
	for j := range ways {
		ways[j] = 1
	}
	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			ways[j] += ways[j-1]
		}
	}
	return ways[n-1]
}

// 二维
func uniquePaths(m, n int) int {
	dp := make([][]int, m)
	for i := range dp {
		dp[i] = make([]int, n)
		dp[i][0] = 1
	}
	for j := 0; j < n; j++ {
		dp[0][j] = 1
	}
	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			dp[i][j] = dp[i-1][j] + dp[i][j-1]
		}
	}
	return dp[m-1][n-1]
}

// 组合数
func uniquePaths(m, n int) int {
	return int(new(big.Int).Binomial(int64(m+n-2), int64(n-1)).Int64())
}
```

### 最小路径和

[64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum/)

```go
// 最原始的方法，辅助空间 O(n^2)
func minPathSum(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}
	m, n := len(grid), len(grid[0])
	dp := make([][]int, m)
	for i := 0; i < m; i++ {
		dp[i] = make([]int, n)
	}
	dp[0][0] = grid[0][0]
	for i := 1; i < m; i++ {
		dp[i][0] = dp[i-1][0] + grid[i][0]
	}
	for j := 1; j < n; j++ {
		dp[0][j] = dp[0][j-1] + grid[0][j]
	}
	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
		}
	}
	return dp[m-1][n-1]
}

func min(x, y int) int {
	if x < y {
		return x
	}
	return y
}
```

### 爬楼梯

[70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)

> 这道题至少有 [3 种解法](https://leetcode.cn/problems/climbing-stairs/solution/pa-lou-ti-by-leetcode-solution/)

```go
func climbStairs(n int) int {
	a, b, c := 0, 0, 1
	for i := 1; i <= n; i++ {
		a = b
		b = c
		c = a + b
	}
	return c
}
```

### 斐波那契数

[509. 斐波那契数](https://leetcode.cn/problems/fibonacci-number/)

> 这道题至少有 [6 种解法](https://leetcode.cn/problems/fibonacci-number/solution/fei-bo-na-qi-shu-by-leetcode/)

```go
func fib(n int) int {
	if n < 2 {
		return n
	}
	a, b, c := 0, 0, 1
	for i := 2; i <= n; i++ {
		a = b
		b = c
		c = a + b
	}
	return c
}
```

[10- I. 斐波那契数列](https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/)

> 根据题目要求，答案需要取模 1e9+7（1000000007）

```go
func fib(n int) int {
	if n < 2 {
		return n
	}
	a, b, c := 0, 0, 1
	for i := 2; i <= n; i++ {
		a = b
		b = c
		c = (a + b) % 1000000007
	}
	return c
}
```

[10- II. 青蛙跳台阶问题](https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)

```go
func numWays(n int) int {
	a, b, c := 0, 0, 1
	for i := 1; i <= n; i++ {
		a = b
		b = c
		c = (a + b) % 1000000007
	}
	return c
}
```

## 0-1 背包问题

### 组合总和 Ⅳ

[377. 组合总和 Ⅳ](https://leetcode.cn/problems/combination-sum-iv/)

### 零钱兑换

[322. 零钱兑换](https://leetcode.cn/problems/coin-change/)

### 分割等和子集

[416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)

### 最长有效括号

[32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/)

### 至少有 1 位重复的数字

[1015. 至少有 1 位重复的数字](https://leetcode.cn/problems/numbers-with-repeated-digits/)

### 最大为 N 的数字组合

[902. 最大为 N 的数字组合](https://leetcode.cn/problems/numbers-at-most-n-given-digit-set/)

### 监控二叉树

[968. 监控二叉树](https://leetcode.cn/problems/binary-tree-cameras/)

### 正则表达式匹配

[10. 正则表达式匹配](https://leetcode.cn/problems/regular-expression-matching/)

### 通配符匹配

[44. 通配符匹配](https://leetcode.cn/problems/wildcard-matching/)

## references

1. [希望用一种规律搞定背包问题](https://leetcode.cn/problems/combination-sum-iv/solution/xi-wang-yong-yi-chong-gui-lu-gao-ding-bei-bao-wen-/)
1. [0-1 背包问题](https://time.geekbang.org/column/article/74788)
