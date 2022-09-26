---
sidebar_position: 88
---

LRU Cache

> Get

- 如果 key 存在，则移动到链表头部，返回

- 如果 key 不存在，则返回 -1

> Put

- 如果 key 存在，将对应的节点的值更新为 value，并将该节点移到链表头部；

- 如果 key 不存在，创建新节点，添加到链表的头部。若链表节点数超出容量，则删除哈希表中对应的项，并删除链表尾节点。

### LRUCache

[146. LRU 缓存机制](https://leetcode-cn.com/problems/lru-cache)

```go
type LRUCache struct {
	capacity   int
	head, tail *Node
	items      map[int]*Node
}

type Node struct {
	key, val   int
	next, prev *Node
}

func Constructor(capacity int) LRUCache {
	return LRUCache{
		capacity: capacity,
		items:    make(map[int]*Node, capacity),
	}
}

func (c *LRUCache) Get(key int) int {
	if node, ok := c.items[key]; ok {
		c.MoveToFront(node)
		return node.val
	}
	return -1
}

func (c *LRUCache) Put(key int, value int) {
	if node, ok := c.items[key]; ok {
		node.val = value
		c.MoveToFront(node)
		return
	}
	if len(c.items) >= c.capacity {
		delete(c.items, c.tail.key)
		c.Remove(c.tail)
	}
	node := &Node{key: key, val: value}
	c.PushFront(node)
	c.items[key] = node
}

func (c *LRUCache) PushFront(node *Node) {
	node.next = c.head
	if c.head != nil {
		c.head.prev = node
	} else {
		c.tail = node
	}
	c.head = node
}

func (c *LRUCache) Remove(node *Node) {
	prevNode, nextNode := node.prev, node.next
	if prevNode != nil {
		prevNode.next = nextNode
		node.prev = nil
	} else {
		c.head = nextNode
	}
	if nextNode != nil {
		nextNode.prev = prevNode
		node.next = nil
	} else {
		c.tail = prevNode
	}
}

func (c *LRUCache) MoveToFront(node *Node) {
	c.Remove(node)
	c.PushFront(node)
}
```

### Sentinel

在双向链表的实现中，使用一个伪头部（dummy head）和伪尾部（dummy tail）标记界限，这样在添加节点和删除节点的时候就不需要检查相邻的节点是否存在。

针对链表的插入、删除操作，需要对插入第一个结点和删除最后一个结点的情况进行特殊处理。如果我们引入哨兵结点，在任何时候，不管链表是不是空，head 指针都会一直指向这个哨兵结点。我们也把这种有哨兵结点的链表叫带头链表。相反，没有哨兵结点的链表就叫作不带头链表。

```go
type LRUCache struct {
	capacity             int
	dummyHead, dummyTail *Node
	items                map[int]*Node
}

type Node struct {
	key, val   int
	next, prev *Node
}

func Constructor(capacity int) LRUCache {
	cache := LRUCache{
		capacity:  capacity,
		items:     make(map[int]*Node, capacity),
		dummyHead: &Node{},
		dummyTail: &Node{},
	}
	cache.dummyHead.next = cache.dummyTail
	cache.dummyTail.prev = cache.dummyHead
	return cache
}

func (c *LRUCache) Get(key int) int {
	if node, ok := c.items[key]; ok {
		c.MoveToFront(node)
		return node.val
	}
	return -1
}

func (c *LRUCache) Put(key int, value int) {
	if node, ok := c.items[key]; ok {
		node.val = value
		c.MoveToFront(node)
		return
	}
	if len(c.items) >= c.capacity {
		// 删除链表尾节点
		delete(c.items, c.dummyTail.prev.key)
		c.Remove(c.dummyTail.prev)
	}
	node := &Node{key: key, val: value}
	c.PushFront(node)
	c.items[key] = node
}

func (c *LRUCache) PushFront(node *Node) {
	// 链表头节点
	head := c.dummyHead.next
	c.dummyHead.next = node
	node.next = head
	head.prev = node
	node.prev = c.dummyHead
}

func (c *LRUCache) Remove(node *Node) {
	node.next.prev = node.prev
	node.prev.next = node.next
}

func (c *LRUCache) MoveToFront(node *Node) {
	c.Remove(node)
	c.PushFront(node)
}
```
