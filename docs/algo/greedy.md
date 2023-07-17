---
sidebar_position: 8
---

贪心算法（又称贪婪算法）是指，在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，他所做出的是在某种意义上的局部最优解。

### 买卖股票的最佳时机 II

[122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii)

```java
public int maxProfit(int[] prices) {
	int sum = 0;
	for (int i = 1; i < prices.length; i++) {
		int tmp = prices[i] - prices[i - 1];
		if (tmp > 0)
			sum += tmp;
	}
	return sum;
}
```

### 分发饼干

[455. 分发饼干](https://leetcode.cn/problems/assign-cookies)

```java
public int findContentChildren(int[] g, int[] s) {
	Arrays.sort(g);
	Arrays.sort(s);
	int i = 0, j = 0, sum = 0;
	while (i < g.length && j < s.length) {
		if (g[i] <= s[j]) {
			i++;
			sum++;
		}
		j++;
	}
	return sum;
}
```

### K 次取反后最大化的数组和

[1005. K 次取反后最大化的数组和](https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations)

```java
public int largestSumAfterKNegations(int[] A, int K) {
	Arrays.sort(A);
	// 负数取反
	for (int i = 0; i < A.length; i++) {
		if (K > 0 && A[i] < 0) {
			A[i] = -A[i];
			K--;
		}
	}
	// 若K仍大于0，此时数组A不存在负数。
	if (K != 0) {
		// 若K为奇数（按题设，可以多次选择同一个索引）
		if ((K & 1) == 1) {
			Arrays.sort(A);
			A[0] = -A[0];
		}
	}
	int sum = 0;
	for (int j : A) {
		sum += j;
	}
	return sum;
}
```

### 不含 AAA 或 BBB 的字符串

[984. 不含 AAA 或 BBB 的字符串](https://leetcode.cn/problems/string-without-aaa-or-bbb)

```java
public String strWithout3a3b(int A, int B) {
    StringBuilder ans = new StringBuilder();
    boolean writeA = false;
    while (A > 0 || B > 0) {
        int len = ans.length();
        if (len >= 2 && ans.charAt(len - 1) == ans.charAt(len - 2))
            writeA = ans.charAt(len - 1) == 'b';
        else
            writeA = A >= B;

        if (writeA) {
            A--;
            ans.append('a');
        } else {
            B--;
            ans.append('b');
        }
    }
    return ans.toString();
}
```
