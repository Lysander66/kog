---
sidebar_position: 7
---

回溯算法实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就“回溯”返回，尝试别的路径。回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。

### 全排列

[46. 全排列](https://leetcode.cn/problems/permutations)

```go
func permute(nums []int) [][]int {
	ans := make([][]int, 0)
	used := make([]bool, len(nums))
	dfs(nums, &ans, used, []int{})
	return ans
}

func dfs(nums []int, ans *[][]int, used []bool, cur []int) {
	if len(cur) == len(nums) {
		*ans = append(*ans, append([]int(nil), cur...))
		return
	}
	for i := range nums {
		if !used[i] {
			cur = append(cur, nums[i])
			used[i] = true
			dfs(nums, ans, used, cur)
			cur = cur[:len(cur)-1]
			used[i] = false
		}
	}
}
```

### 组合

[77. 组合](https://leetcode.cn/problems/combinations)

```go
func combine(n int, k int) (ans [][]int) {
	// 将 temp 中 [0, k - 1] 每个位置 i 设置为 i + 1，即 [0, k - 1] 存 [1, k]
	// 末尾加一位 n + 1 作为哨兵
	var temp []int
	for i := 1; i <= k; i++ {
		temp = append(temp, i)
	}
	temp = append(temp, n+1)

	for j := 0; j < k; {
		comb := make([]int, k)
		copy(comb, temp[:k])
		ans = append(ans, comb)
		// 寻找第一个 temp[j] + 1 != temp[j + 1] 的位置 t
		// 我们需要把 [0, t - 1] 区间内的每个位置重置成 [1, t]
		for j = 0; j < k && temp[j]+1 == temp[j+1]; j++ {
			temp[j] = j + 1
		}
		// j 是第一个 temp[j] + 1 != temp[j + 1] 的位置
		temp[j]++
	}
	return
}
```

### 第 k 个排列

[60. 排列序列](https://leetcode.cn/problems/permutation-sequence)

> 暴力回溯需要在回溯到第 k 个排列时终止就不会超时了，但是效率依旧感人。
> [可以用数学的方法来解](https://www.cnblogs.com/ariel-dreamland/p/9149577.html)

```java
public String getPermutation(int n, int k) {
	StringBuilder sb = new StringBuilder();
	List<Integer> candidates = new LinkedList<>();
	int[] factorials = new int[n + 1];
	factorials[0] = 1;
	int fact = 1;
	for (int i = 1; i <= n; ++i) {
		candidates.add(i);
		fact *= i;
		factorials[i] = fact;
	}
	k--;
	for (int i = n - 1; i >= 0; --i) {
		int index = k / factorials[i];
		sb.append(candidates.remove(index));
		k -= index * factorials[i];
	}
	return sb.toString();
}
```

### 解数独

[37. 解数独](https://leetcode.cn/problems/sudoku-solver)

```go
func solveSudoku(board [][]byte) {
	var dfs func([][]byte) bool
	dfs = func(board [][]byte) bool {
		for i := 0; i < 9; i++ {
			for j := 0; j < 9; j++ {
				if board[i][j] != '.' {
					continue
				}
				for k := '1'; k <= '9'; k++ {
					board[i][j] = byte(k)
					if isValid(board, i, j) && dfs(board) {
						return true
					}
					board[i][j] = '.'
				}
				return false
			}

		}
		return true
	}

	dfs(board)
}

func isValid(board [][]byte, x, y int) bool {
	for i := 0; i < 9; i++ {
		// 行
		if i != x && board[i][y] == board[x][y] {
			return false
		}
		// 列
		if i != y && board[x][i] == board[x][y] {
			return false
		}
	}
	// 宫
	for i := 3 * (x / 3); i < 3*(x/3+1); i++ {
		for j := 3 * (y / 3); j < 3*(y/3+1); j++ {
			if (i != x || j != y) && board[i][j] == board[x][y] {
				return false
			}
		}
	}
	return true
}
```

### N 皇后

[51. N 皇后](https://leetcode.cn/problems/n-queens)

> 主对角线，y = -x + b 即 row + i = b，b 的最大值为 2n（当 row = n && i = n 时），所以 main_diag 的容量为 2n 即可。  
> 同理，另一对角线，y = x + b 即 row -i = b，而为了防止下标为负数，可以加上 n，将 row -i + n 作为下标，最大值为 2n（当 row = n && i = 0 时），故 anti_diag 的容量也设为 2n。

```java
List<List<String>> resultList = new LinkedList<>();

public List<List<String>> solveNQueens(int n) {
	boolean[] cols = new boolean[n];
	boolean[] main_diag = new boolean[2 * n];
	boolean[] anti_diag = new boolean[2 * n];
	LinkedList<Integer> result = new LinkedList<>();
	dfs(result, 0, cols, main_diag, anti_diag, n);
	return resultList;
}

void dfs(LinkedList<Integer> result, int row, boolean[] cols, boolean[] main_diag, boolean[] anti_diag, int n) {
	if (row == n) {
		List<String> list = new LinkedList<>();
		for (int x = 0; x < n; ++x) {
			StringBuilder sb = new StringBuilder();
			for (int y = 0; y < n; ++y)
				sb.append(result.get(x) == y ? "Q" : ".");
			list.add(sb.toString());
		}
		resultList.add(list);
		return;
	}
	for (int i = 0; i < n; ++i) {
		if (cols[i] || main_diag[row + i] || anti_diag[row - i + n])
			continue;
		result.add(i);
		cols[i] = true;
		main_diag[row + i] = true;
		anti_diag[row - i + n] = true;
		dfs(result, row + 1, cols, main_diag, anti_diag, n);
		result.removeLast();
		cols[i] = false;
		main_diag[row + i] = false;
		anti_diag[row - i + n] = false;
	}
}
```

解法二

```java
public List<List<String>> solveNQueens(int n) {
	// index表示行，value表示列。如result[0] = 3 表示第1行的Q在第3列
	int[] result = new int[n];
	List<List<String>> resultList = new LinkedList<>();
	dfs(resultList, result, 0, n);
	return resultList;
}

void dfs(List<List<String>> resultList, int[] result, int row, int n) {
	if (row == n) {
		List<String> list = new LinkedList<>();
		for (int x = 0; x < n; ++x) {
			StringBuilder sb = new StringBuilder();
			for (int y = 0; y < n; ++y)
				sb.append(result[x] == y ? "Q" : ".");
			list.add(sb.toString());
		}
		resultList.add(list);
		return;
	}
	for (int column = 0; column < n; ++column) {
		boolean isValid = true;
		result[row] = column;
		/*
		 * 逐行往下考察每一行。同列，result[i] == column
		 * 同对角线，row - i == Math.abs(result[i] - column)
		 */
		for (int i = row - 1; i >= 0; --i) {
			if (result[i] == column || row - i == Math.abs(result[i] - column)) {
				isValid = false;
				break;
			}
		}
		if (isValid) dfs(resultList, result, row + 1, n);
	}
}
```

### N 皇后 II

[52. N 皇后 II](https://leetcode.cn/problems/n-queens-ii)

```java
int count = 0;

public int totalNQueens(int n) {
	boolean[] cols = new boolean[n]; // columns |
	boolean[] main_diag = new boolean[2 * n]; // main_diag \
	boolean[] anti_diag = new boolean[2 * n]; // diagonals /
	dfs(0, cols, main_diag, anti_diag, n);
	return count;
}

void dfs(int row, boolean[] cols, boolean[] main_diag, boolean[] anti_diag, int n) {
	if (row == n)
		count++;
	for (int i = 0; i < n; i++) {
		if (cols[i] || main_diag[row + i] || anti_diag[row - i + n])
			continue;
		cols[i] = true;
		main_diag[row + i] = true;
		anti_diag[row - i + n] = true;
		dfs(row + 1, cols, main_diag, anti_diag, n);
		cols[i] = false;
		main_diag[row + i] = false;
		anti_diag[row - i + n] = false;
	}
}
```

### 全排列 II

[47. 全排列 II](https://leetcode.cn/problems/permutations-ii)

```go
func permuteUnique(nums []int) (ans [][]int) {
	sort.Ints(nums)
	var (
		n    = len(nums)
		used = make([]bool, n)
		cur  []int
	)

	var backtrack func(int)
	backtrack = func(idx int) {
		if idx == n {
			ans = append(ans, append([]int(nil), cur...))
			return
		}
		for i := range nums {
			if used[i] || (i > 0 && nums[i-1] == nums[i] && !used[i-1]) {
				continue
			}
			cur = append(cur, nums[i])
			used[i] = true
			backtrack(idx + 1)
			cur = cur[:len(cur)-1]
			used[i] = false
		}
	}

	backtrack(0)
	return
}
```

### 字母大小写全排列

[784. 字母大小写全排列](https://leetcode.cn/problems/letter-case-permutation)

> 通过 `ch ^ 32` 的方式转换大小写，利用异或属于半加运算(不带进位的加法)的性质

```go
func letterCasePermutation(s string) (ans []string) {
	var dfs func([]byte, int)
	dfs = func(s []byte, i int) {
		for i < len(s) && !unicode.IsLetter(rune(s[i])) {
			i++
		}
		if i == len(s) {
			ans = append(ans, string(s))
			return
		}
		dfs(s, i+1) //搜索原字母的组合
		s[i] ^= 32  //转换
		dfs(s, i+1) //搜索转换字母大小写后的组合
		s[i] ^= 32  //还原
	}

	dfs([]byte(s), 0)
	return
}
```

### 组合总和

[39. 组合总和](https://leetcode.cn/problems/combination-sum)

```go
func combinationSum(candidates []int, target int) (ans [][]int) {
	var path []int
	var dfs func(int, int)
	dfs = func(target, start int) {
		// 由于进入更深层的时候，小于 0 的部分被剪枝，因此递归终止条件值只判断等于 0 的情况
		if target == 0 {
			ans = append(ans, append([]int(nil), path...))
			return
		}
		for i := start; i < len(candidates); i++ {
			// 剪枝前提是候选数组有序
			if target-candidates[i] < 0 {
				break
			}
			path = append(path, candidates[i])
			dfs(target-candidates[i], i)
			path = path[:len(path)-1]
		}
	}

	sort.Ints(candidates)
	dfs(target, 0)
	return
}
```

### 组合总和 II

[40. 组合总和 II](https://leetcode.cn/problems/combination-sum-ii)

```go
func combinationSum2(candidates []int, target int) (ans [][]int) {
	var path []int
	var dfs func(int, int)
	dfs = func(target, start int) {
		if target == 0 {
			ans = append(ans, append([]int(nil), path...))
			return
		}
		var prev int
		for i := start; i < len(candidates); i++ {
			if target-candidates[i] < 0 {
				break
			}
			if candidates[i] != prev {
				path = append(path, candidates[i])
				dfs(target-candidates[i], i+1)
				path = path[:len(path)-1]
			}
			prev = candidates[i]
		}
	}

	sort.Ints(candidates)
	dfs(target, 0)
	return
}
```

### 组合总和 III

[216. 组合总和 III](https://leetcode.cn/problems/combination-sum-iii)

```go
func combinationSum3(k, n int) (ans [][]int) {
	var path []int
	var dfs func(int, int)
	dfs = func(start, sum int) {
		if sum > n {
			return
		}
		if len(path) == k {
			if sum == n {
				ans = append(ans, append([]int(nil), path...))
			}
			return
		}
		for i := start; i <= 9; i++ {
			if sum > n {
				break
			}
			path = append(path, i)
			dfs(i+1, sum+i)
			path = path[:len(path)-1]
		}
	}

	dfs(1, 0)
	return
}
```

### 电话号码的字母组合

[17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number)

```go
func letterCombinations(digits string) (ans []string) {
	if len(digits) == 0 {
		return
	}
	lookup := []string{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}
	var path []byte
	var dfs func(int)
	dfs = func(pos int) {
		if pos == len(digits) {
			ans = append(ans, string(path))
			return
		}
		letters := lookup[digits[pos]-'0']
		for i := range letters {
			path = append(path, letters[i])
			dfs(pos + 1)
			path = path[:len(path)-1]
		}
	}
	dfs(0)
	return
}
```
