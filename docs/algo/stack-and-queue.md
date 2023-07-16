---
sidebar_position: 2
---

栈（Stack）后进先出（LIFO）； 队列（Queue）先进先出（FIFO）

Stack & Queue

## 栈

### 逆波兰表达式求值

[150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation)

逆波兰表示法（Reverse Polish notation，RPN，或逆波兰记法），是一种是由波兰数学家扬·武卡谢维奇 1920 年引入的数学表达式形式，在逆波兰记法中，所有操作符置于操作数的后面，因此也被称为后缀表示法。逆波兰记法不需要括号来标识操作符的优
先级。

> 操作数入栈；遇到操作符时，操作数出栈，求值，将结果入栈；当一遍后，栈顶就是表达式的值。

```go
func evalRPN(tokens []string) int {
	var stack []int
	for _, token := range tokens {
		val, err := strconv.Atoi(token)
		if err == nil {
			stack = append(stack, val)
		} else {
			x, y := stack[len(stack)-2], stack[len(stack)-1]
			stack = stack[:len(stack)-2]
			switch token {
			case "+":
				x += y
			case "-":
				x -= y
			case "*":
				x *= y
			case "/":
				x /= y
			}
			stack = append(stack, x)
		}
	}
	return stack[0]
}
```

### 中缀表达式转后缀表达式

[中缀表达式转后缀表达式](https://www.nowcoder.com/practice/4e7267b55fdf430d9403aa12206572b3?sourceQid=23290&sourceTpId=13)

> 调度场算法（Shunting Yard Algorithm）是一个用于将中缀表达式转换为后缀表达式的经典算法，由艾兹格·迪杰斯特拉引入，因其操作类似于火车编组场而得名。

1. 操作数，直接输出
1. 左括号，入栈
1. 右括号，出栈并输出，直到遇到左括号
1. 运算符，如果优先级高于栈顶元素则入栈，否则不断出栈直到符合条件
1. 最后，剩余运算符出栈

```go
// Infix notation -> Reverse Polish notation
func infix2Postfix(infix []string) (postfix []string) {
	precedence := func(operator string) int {
		switch operator {
		case "*", "/":
			return 5
		case "+", "-":
			return 4
		}
		return 0
	}
	var stack []string
	for _, token := range infix {
		switch token {
		case "+", "-", "*", "/":
			// 运算符，如果优先级高于栈顶元素则入栈，否则不断出栈直到符合条件
			for len(stack) > 0 && precedence(stack[len(stack)-1]) >= precedence(token) {
				postfix = append(postfix, stack[len(stack)-1])
				stack = stack[:len(stack)-1]
			}
			stack = append(stack, token)
		case "(":
			stack = append(stack, token)
		case ")":
			// 弹出所有元素直到遇到左括号
			for len(stack) > 0 {
				if stack[len(stack)-1] != "(" {
					postfix = append(postfix, stack[len(stack)-1])
					stack = stack[:len(stack)-1]
				} else {
					// 弹出左括号
					stack = stack[:len(stack)-1]
					break
				}
			}
		default:
			// 操作数，直接输出
			postfix = append(postfix, token)
		}
	}
	for len(stack) > 0 {
		postfix = append(postfix, stack[len(stack)-1])
		stack = stack[:len(stack)-1]
	}
	return
}

func split(expr string) (arr []string) {
	var (
		start int
		flag  bool
		prev  rune
	)
	for i, ch := range expr {
		if unicode.IsSpace(ch) || ch == '.' {
			continue
		}
		isDigit := unicode.IsDigit(ch)
		if ch == '-' {
			// 使用 prev，因为 expr[i-1] 可能是空格
			if i > 0 && (unicode.IsDigit(prev) || prev == ')') { // '-' 出现在数字或者 ')' 后面是减号
			} else { // 负号
				isDigit = true
			}
		}
		if isDigit {
			if !flag {
				start = i
				flag = true
			}
		} else {
			if flag {
				arr = append(arr, strings.TrimSpace(expr[start:i]))
				flag = false
			}
			arr = append(arr, expr[i:i+1])
		}
		prev = ch
	}
	if flag {
		arr = append(arr, strings.TrimSpace(expr[start:]))
	}
	return
}
```

### 有效的括号

[20. 有效的括号](https://leetcode.cn/problems/valid-parentheses)

> 从左到右依次扫描字符串，扫描到左括号时，则将其压入栈中；
> 扫描到右括号时，从栈顶取出一个左括号。如果匹配，则继续向后扫描。

```go
var pairs = map[rune]rune{
	')': '(',
	']': '[',
	'}': '{',
}

func isValid(s string) bool {
	if len(s)&1 == 1 {
		return false
	}
	var stack []rune
	for _, c := range s {
		switch c {
		case '(', '[', '{':
			stack = append(stack, c)
		case ')', ']', '}':
			if len(stack) == 0 || stack[len(stack)-1] != pairs[c] {
				return false
			}
			stack = stack[:len(stack)-1]
		default:
		}
	}
	return len(stack) == 0
}
```

### 用栈实现队列

[232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks)

> 将一个栈当作输入栈，用于 push；
> 另一个栈当作输出栈，用于 pop 和 peek。  
> 每次 pop 或 peek 时，若 outStack 为空则将 inStack 的数据弹出并压入 outStack

```go
type MyQueue struct {
	in, out []int
}

func Constructor() MyQueue {
	return MyQueue{}
}

func (q *MyQueue) Push(x int) {
	q.in = append(q.in, x)
}

func (q *MyQueue) Pop() int {
	q.in2out()
	x := q.out[len(q.out)-1]
	q.out = q.out[:len(q.out)-1]
	return x
}

func (q *MyQueue) Peek() int {
	q.in2out()
	return q.out[len(q.out)-1]
}

func (q *MyQueue) in2out() {
	if len(q.out) == 0 {
		for len(q.in) > 0 {
			q.out = append(q.out, q.in[len(q.in)-1])
			q.in = q.in[:len(q.in)-1]
		}
	}
}

func (q *MyQueue) Empty() bool {
	return len(q.in) == 0 && len(q.out) == 0
}
```

### 用两个栈实现队列

[剑指 Offer 09. 用两个栈实现队列](https://leetcode.cn/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof)

> 删除时先判断 outStack 是否为空。如果为空则将 inStack 的数据弹出并压入 outStack

```go
type CQueue struct {
	in, out *list.List
}

func Constructor() CQueue {
	return CQueue{
		in:  list.New(),
		out: list.New(),
	}
}

func (q *CQueue) AppendTail(value int) {
	q.in.PushBack(value)
}

func (q *CQueue) DeleteHead() int {
	if q.out.Len() == 0 {
		for q.in.Len() > 0 {
			q.out.PushBack(q.in.Remove(q.in.Back()))
		}
	}
	if q.out.Len() != 0 {
		val := q.out.Remove(q.out.Back())
		return val.(int)
	}
	return -1
}
```

### 包含 min 函数的栈

[剑指 Offer 30. 包含 min 函数的栈](https://leetcode.cn/problems/bao-han-minhan-shu-de-zhan-lcof)

## 队列

### 用队列实现栈

[225. 用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues)

> push 时，新元素入队尾，然后旧元素依次出队再入队，这样新元素就到队首了。达到栈 LIFO 的效果。

```go
type MyStack struct {
	queue []int
}

func Constructor() (s MyStack) {
	return
}

func (s *MyStack) Push(x int) {
	n := len(s.queue)
	s.queue = append(s.queue, x)
	for ; n > 0; n-- {
		s.queue = append(s.queue, s.queue[0])
		s.queue = s.queue[1:]
	}
}

func (s *MyStack) Pop() int {
	v := s.queue[0]
	s.queue = s.queue[1:]
	return v
}

func (s *MyStack) Top() int {
	return s.queue[0]
}

func (s *MyStack) Empty() bool {
	return len(s.queue) == 0
}
```

## references

1. [调度场算法](https://zh.wikipedia.org/zh-hans/调度场算法)
1. [中缀表达式转后缀表达式](https://zq99299.github.io/dsalg-tutorial/dsalg-java-hsp/05/05.html)
