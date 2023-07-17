---
sidebar_position: 6
---

动态规划(dynamic programming)是运筹学的一个分支，是求解决策过程(decision process)最优化的数学方法。

### 最长回文子串

[5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring)

> 中心扩展

```go
func longestPalindrome(s string) string {
	if s == "" {
		return ""
	}
	var start, end int
	for i := 0; i < len(s); i++ {
		if l, r := expand(s, i, i); r-l > end-start {
			start, end = l, r
		}
		if l, r := expand(s, i, i+1); r-l > end-start {
			start, end = l, r
		}
	}
	return s[start : end+1]
}

func expand(s string, i, j int) (int, int) {
	left, right := i, j
	for left >= 0 && right < len(s) && s[left] == s[right] {
		left, right = left-1, right+1
	}
	return left + 1, right - 1
}
```

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
	max := nums[0]
	for i := 1; i < len(nums); i++ {
		if nums[i]+nums[i-1] > nums[i] {
			nums[i] += nums[i-1]
		}
		if nums[i] > max {
			max = nums[i]
		}
	}
	return max
}
```

### 乘积最大子序列

[152. 乘积最大子序列](https://leetcode.cn/problems/maximum-product-subarray)

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

[121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock)

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

我们用 f(i,j) 表示从左上角走到 (i,j) 的路径数量，其中 i 和 j 的范围分别是 [0,m) 和 [0,n)。
由于我们每一步只能从向下或者向右移动一步，因此要想走到 (i,j)，如果向下走一步，那么会从 (i−1,j) 走过来；如果向右走一步，那么会从 (i,j−1) 走过来。因此我们可以写出动态规划转移方程：
`f(i,j)=f(i−1,j)+f(i,j−1)`

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
```

从左上角到右下角，需要移动 m+n−2 次，其中有 m−1 次向下移动，n−1 次向右移动。因此路径的总数，就等于从 m+n−2 次移动中选择 n−1 次向下移动的方案数，即组合数：
$C_{m+n−2}^{n−1}$

```go
func uniquePaths(m, n int) int {
	return int(new(big.Int).Binomial(int64(m+n-2), int64(n-1)).Int64())
}
```

### 最小路径和

[64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum)

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

[70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs)

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

[509. 斐波那契数](https://leetcode.cn/problems/fibonacci-number)

> 这道题至少有 [6 种解法](https://leetcode.cn/problems/fibonacci-number/solutions/545049/fei-bo-na-qi-shu-by-leetcode-solution-o4ze)

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

[10- I. 斐波那契数列](https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof)

> 根据题目要求，答案需要取模 1e9+7

```go
func fib(n int) int {
	if n < 2 {
		return n
	}
	const mod int = 1e9 + 7
	a, b, c := 0, 0, 1
	for i := 2; i <= n; i++ {
		a = b
		b = c
		c = (a + b) % mod
	}
	return c
}
```

[10- II. 青蛙跳台阶问题](https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof)

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

### 最长递增子序列

[300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence)

动态规划 dp[i] = max(dp[j]) + 1，其中 0 ≤ j < i 且 num[j] < num[i]

```go
func lengthOfLIS(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	dp := make([]int, len(nums))
	dp[0] = 1
	maxLen := 1
	for i := 1; i < len(nums); i++ {
		max := 0
		for j := 0; j < i; j++ {
			if nums[i] > nums[j] && dp[j] > max {
				max = dp[j]
			}
		}
		dp[i] = max + 1
		if dp[i] > maxLen {
			maxLen = dp[i]
		}
	}
	return maxLen
}
```

## 0-1 背包问题

### 组合总和 Ⅳ

[377. 组合总和 Ⅳ](https://leetcode.cn/problems/combination-sum-iv)

### 零钱兑换

[322. 零钱兑换](https://leetcode.cn/problems/coin-change)

### 分割等和子集

[416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum)

### 最长有效括号

[32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses)

### 至少有 1 位重复的数字

[1015. 至少有 1 位重复的数字](https://leetcode.cn/problems/numbers-with-repeated-digits)

### 最大为 N 的数字组合

[902. 最大为 N 的数字组合](https://leetcode.cn/problems/numbers-at-most-n-given-digit-set)

### 监控二叉树

[968. 监控二叉树](https://leetcode.cn/problems/binary-tree-cameras)

### 正则表达式匹配

[10. 正则表达式匹配](https://leetcode.cn/problems/regular-expression-matching)

### 通配符匹配

[44. 通配符匹配](https://leetcode.cn/problems/wildcard-matching)

## references

1. [希望用一种规律搞定背包问题](https://leetcode.cn/problems/combination-sum-iv/solution/xi-wang-yong-yi-chong-gui-lu-gao-ding-bei-bao-wen-)
1. [0-1 背包问题](https://time.geekbang.org/column/article/74788)
