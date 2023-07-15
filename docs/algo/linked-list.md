---
sidebar_position: 3
---

物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的

## 常见

### 反转链表

[206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

[1]: http://cdn.lysander.top/reverse-linked-list.gif

![Reverse Linked List][1]

```go
func reverseList(head *ListNode) *ListNode {
	var prev *ListNode
	curr := head
	for curr != nil {
		next := curr.Next
		curr.Next = prev
		prev = curr
		curr = next
	}
	return prev
}
```

### 反转链表指定区间

[92. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii)

> `pre.Next = cur.Next` 有两个作用

1. 被下面一句 `cur = pre.Next` 使用，`cur` 向后移动
2. 最后一次循环，`m` 节点的 `next` 刚好指向 `n+1` 节点

```go
func reverseBetween(head *ListNode, m int, n int) *ListNode {
	newHead := &ListNode{Next: head}
	pre := newHead
	for i := 1; i < m; i++ {
		pre = pre.Next
	}
	dummy := pre    // 哨兵结点，位置 m-1
	pre = pre.Next  // 位置 m
	cur := pre.Next // 位置 m+1
	for i := m; i < n; i++ {
		pre.Next = cur.Next // 最后一次循环，node(m)->next = node(n+1)
		cur.Next = dummy.Next
		dummy.Next = cur
		cur = pre.Next
	}
	return newHead.Next
}
```

### 删除节点

[237. 删除链表中的节点](https://leetcode.cn/problems/delete-node-in-a-linked-list/)

将想要删除的节点的值替换为它后面节点中的值，然后删除它之后的节点

```go
func deleteNode(node *ListNode) {
	node.Val = node.Next.Val
	node.Next = node.Next.Next
}
```

### 删除链表的节点

[剑指 Offer 18. 删除链表的节点](https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/)

```go
func deleteNode(head *ListNode, val int) *ListNode {
	if head == nil {
		return nil
	}
	if head.Val == val {
		return head.Next
	}
	x := head
	for x.Next != nil {
		if x.Next.Val == val {
			x.Next = x.Next.Next
			break
		}
		x = x.Next
	}
	return head
}
```

### 移除链表元素

[203. 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)

```go
func removeElements(head *ListNode, val int) *ListNode {
	dummy := &ListNode{Next: head}
	prev, cur := dummy, dummy.Next
	for cur != nil {
		if cur.Val == val {
			prev.Next = cur.Next
		} else {
			prev = cur
		}
		cur = cur.Next
	}
	return dummy.Next
}
```

### 删除排序链表中的重复元素

[83. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/)

> 由于输入的列表已排序，因此我们可以通过将结点的值与它之后的结点进行比较来确定它是否为重复结点。如果它是重复的，我们更改当前结点的 next 指针，以便它跳过下一个结点并直接指向下一个结点之后的结点。

```go
func deleteDuplicates(head *ListNode) *ListNode {
	p := head
	for p != nil && p.Next != nil {
		if p.Val == p.Next.Val {
			p.Next = p.Next.Next
		} else {
			p = p.Next
		}
	}
	return head
}
```

### 删除排序链表中的重复元素 II

[82. 删除排序链表中的重复元素 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/)

```go
func deleteDuplicates(head *ListNode) *ListNode {
	dummy := &ListNode{}
	prev := dummy
	for head != nil {
		if head.Next != nil && head.Next.Val == head.Val {
			val := head.Val
			for head != nil && head.Val == val {
				head = head.Next
			}
			prev.Next = head
		} else {
			prev.Next = head
			prev = head
			head = head.Next
		}
	}
	return dummy.Next
}
```

### 相交链表

[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists)

> 设 A 的长度为 a + c，B 的长度为 b + c，其中 c 为尾部公共部分长度，由 `a + c + b = b + c + a` 即 `A + b = B + a`  
> 当访问 A 链表的指针访问到链表尾部时，令它从链表 B 的头部开始访问链表 B；同样地，当访问 B 链表的指针访问到链表尾部时，令它从链表 A 的头部开始访问链表 A  
> 这样就能控制访问 A 和 B 两个链表的指针能同时访问到交点。若不相交，则 a 和 b 都为 null，退出循环，并返回 null。

```java
public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
	ListNode a = headA;
	ListNode b = headB;
	while (a != b) {
		a = a == null ? headB : a.next;
		b = b == null ? headA : b.next;
	}
	return a;
}
```
