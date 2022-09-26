---
sidebar_position: 2
---

栈（Stack）后进先出（LIFO）； 队列（Queue）先进先出（FIFO）

Stack & Queue

## 栈

### 有效的括号

[20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses)

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

[232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks)

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

[剑指 Offer 09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof)

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

[剑指 Offer 30. 包含 min 函数的栈](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof)

## 队列

### 用队列实现栈

[225. 用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues)

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
