---
sidebar_position: 8
---

贪心算法（又称贪婪算法）是指，在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，他所做出的是在某种意义上的局部最优解。

### 买卖股票的最佳时机 II

[122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii)

```go
func maxProfit(prices []int) (ans int) {
	for i := 1; i < len(prices); i++ {
		if prices[i]-prices[i-1] > 0 {
			ans += prices[i] - prices[i-1]
		}
	}
	return
}
```

### 分发饼干

[455. 分发饼干](https://leetcode.cn/problems/assign-cookies)

```go
func findContentChildren(g []int, s []int) int {
	sort.Ints(g)
	sort.Ints(s)
	var i, j, ans int
	for i < len(g) && j < len(s) {
		if g[i] <= s[j] {
			i++
			ans++
		}
		j++
	}
	return ans
}
```

### K 次取反后最大化的数组和

[1005. K 次取反后最大化的数组和](https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations)

```go
func largestSumAfterKNegations(nums []int, k int) (sum int) {
	sort.Ints(nums)
	// 负数取反
	for i := range nums {
		if k > 0 && nums[i] < 0 {
			nums[i] = -nums[i]
			k--
		}
	}
	// 若K仍大于0，此时数组A不存在负数。
	if k != 0 {
		// 若K为奇数（按题设，可以多次选择同一个索引）
		if k&1 == 1 {
			sort.Ints(nums)
			nums[0] = -nums[0]
		}
	}
	for _, v := range nums {
		sum += v
	}
	return
}
```

### 不含 AAA 或 BBB 的字符串

[984. 不含 AAA 或 BBB 的字符串](https://leetcode.cn/problems/string-without-aaa-or-bbb)

```go
func strWithout3a3b(a int, b int) string {
	var ans string
	var writeA bool
	for a > 0 || b > 0 {
		L := len(ans)
		if L >= 2 && ans[len(ans)-1] == ans[len(ans)-2] {
			writeA = ans[len(ans)-1] == 'b'
		} else {
			writeA = a >= b
		}
		if writeA {
			ans += "a"
			a--
		} else {
			ans += "b"
			b--
		}
	}
	return ans
}
```
