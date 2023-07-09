---
sidebar_position: 7
---

回溯算法实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就“回溯”返回，尝试别的路径。回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。

### 第 k 个排列

[60. 第 k 个排列](https://leetcode.cn/problems/permutation-sequence)

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

[37. 解数独](https://leetcode.cn/problems/sudoku-solver/)

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

### 全排列

[46. 全排列](https://leetcode.cn/problems/permutations)

```go
func permute(nums []int) [][]int {
	ans := make([][]int, 0)
	used := make([]bool, len(nums))
	backtrack(nums, &ans, used, []int{})
	return ans
}

func backtrack(nums []int, ans *[][]int, used []bool, cur []int) {
	if len(cur) == len(nums) {
		*ans = append(*ans, append([]int(nil), cur...))
		return
	}
	for i := range nums {
		if !used[i] {
			cur = append(cur, nums[i])
			used[i] = true
			backtrack(nums, ans, used, cur)
			cur = cur[:len(cur)-1]
			used[i] = false
		}
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
func letterCasePermutation(S string) (ans []string) {
	dfs(&ans, S, 0)
	return
}

func dfs(ans *[]string, s string, i int) {
	if i == len(s) {
		*ans = append(*ans, s)
		return
	}
	ch := s[i]
	if (ch >= 'A' && ch <= 'Z') || ch >= 'a' && ch <= 'z' {
		dfs(ans, s[:i]+string(ch^32)+s[i+1:], i+1) //搜索转换字母大小写后的组合
	}
	dfs(ans, s, i+1) //搜索原字母的组合
}
```

[其它解法：二分掩码](https://leetcode.cn/problems/letter-case-permutation/solution/zi-mu-da-xiao-xie-quan-pai-lie-by-leetcode)

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

### 组合总和

[39. 组合总和](https://leetcode.cn/problems/combination-sum)

```java
public List<List<Integer>> combinationSum(int[] candidates, int target) {
	List<List<Integer>> res = new LinkedList<>();
	Arrays.sort(candidates);
	dfs(res, new LinkedList<Integer>(), candidates, target, 0);
	return res;
}

void dfs(List<List<Integer>> res, List<Integer> list, int[] candidates, int target, int start) {
	if (target == 0) {
		res.add(new LinkedList<>(list));
		return;
	}
	while (start < candidates.length && candidates[start] <= target) {
		list.add(candidates[start]);
		dfs(res, list, candidates, target - candidates[start], start);
		list.remove(list.size() - 1);
		start++;
	}
}
```

### 组合总和 II

[40. 组合总和 II](https://leetcode.cn/problems/combination-sum-ii)

```java
public List<List<Integer>> combinationSum2(int[] candidates, int target) {
    List<List<Integer>> res = new LinkedList<>();
    Arrays.sort(candidates);
    dfs(res, new LinkedList<Integer>(), candidates, target, 0);
    return res;
}

void dfs(List<List<Integer>> res, List<Integer> list, int[] candidates, int target, int start) {
    if (target == 0) {
        res.add(new LinkedList<>(list));
        return;
    }
    int prev = 0;// 所有数字（包括目标数）都是正整数，解集不能包含重复的组合
    while (start < candidates.length && candidates[start] <= target) {
        if (prev != candidates[start]) {
            list.add(candidates[start]);
            dfs(res, list, candidates, target - candidates[start], start + 1);
            list.remove(list.size() - 1);
            prev = candidates[start];
        }
        start++;
    }
}
```

### 组合总和 III

[216. 组合总和 III](https://leetcode.cn/problems/combination-sum-iii)

```java
public List<List<Integer>> combinationSum3(int k, int n) {
	List<List<Integer>> res = new LinkedList<>();
	dfs(res, new LinkedList<Integer>(), 1, k, n);
	return res;
}

void dfs(List<List<Integer>> res, LinkedList<Integer> list, int start, int k, int n) {
	if (k == 0 && n == 0) {
		res.add(new LinkedList<>(list));
	} else if (k < 0) {
		return;
	}
	// 剩余k个数的和大于n时不需要遍历
	for (int i = start; i < 10 && n >= k * i + k * (k - 1) / 2; ++i) {
		list.add(i);
		dfs(res, list, i + 1, k - 1, n - i);
		list.removeLast();
	}
}
```

### 电话号码的字母组合

[17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number)

```java
public List<String> letterCombinations(String digits) {
	LinkedList<String> list = new LinkedList<>();
	if (digits.isEmpty())
		return list;
	String[] mapping = { "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz" };
	list.add("");
	for (int i = 0; i < digits.length(); i++) {
		int index = Character.getNumericValue(digits.charAt(i));
		while (list.peek().length() == i) {
			String s = list.remove();
			for (char ch : mapping[index].toCharArray()) {
				list.add(s + ch);
			}
		}
	}
	return list;
}
```

方法二

```java
static String[] arr = { "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz" };
static StringBuilder sb = new StringBuilder();

public List<String> letterCombinations(String digits) {
	List<String> list = new LinkedList<>();
	if (digits.isEmpty())
		return list;
	dfs(list, 0, digits);
	return list;
}

void dfs(List<String> list, int n, String digits) {
	if (n == digits.length()) {
		list.add(sb.toString());
		return;
	}
	for (int i = 0; i < arr[Character.getNumericValue(digits.charAt(n))].length(); ++i) {
		sb.append(arr[Character.getNumericValue(digits.charAt(n))].charAt(i));
		dfs(list, n + 1, digits);
		sb.deleteCharAt(sb.length() - 1);
	}
}
```
