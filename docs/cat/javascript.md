---
title: JavaScript
sidebar_position: 97
---

## Prerequisites

- 不使用 onbody
- 不需要 type="text/javascript"
- 始终使用 strict 模式
- 了解闭包
- 理解 this
  > ES5/ES6/ES7 stuff
- var is deprecated. Use const and/or let
- Use for(elem of collection) never for(elem in collection)
- Use forEach, map, and filter where useful
- Use destructuring[解构赋值]
- Use object declaration short cuts[对象声明简写]
- Use the spread operator ...[使用扩展运算符...]
- Use class
- Understand getters and setters
- Use arrow functions where appropriate[合理使用箭头函数]
- Promises as well as async/await[Promises 以及 async/await]
- Use Template Literals[使用模板字符串]
  > coding conventions
- 变量、函数名、方法名都是小驼峰[lowercasedCamelCase]
- 构造函数、类名都是大驼峰[CapitalizedCamelCase]

### ES6

[支持特性](https://node.green)
访问[这里](http://ruanyf.github.io/es-checker)可以看到您的浏览器支持 ES6 的程度  
运行下面的命令，可以查看你正在使用的 Node 环境对 ES6 的支持程度

```js
npm install -g es-checker
es-checker
```

## 快速入门

### null 和 undefined

大多数情况下，我们都应该用 null。undefined 仅仅在判断函数参数是否传递的情况下有用。

### 比较运算符

`==` 会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；  
`===` 不会自动转换数据类型，如果数据类型不一致，返回 false，如果一致，再比较。

> 不要使用 `==` 比较，始终用 `===` 进行比较。  
> 另一个例外是 NaN 这个特殊的 Number 与所有其他值都不相等，包括它自己：
> 唯一能判断 NaN 的方法是通过 isNaN()函数：

> 最后要注意浮点数的相等比较  
> 浮点数在运算过程中会产生误差，因为计算机无法精确表示无限循环小数。要比较两个浮点数是否相等，只能计算它们之差的绝对值，看是否小于某个阈值：

### 循环

- for
- while
- do ... while

### 数组

[Array](https://www.liaoxuefeng.com/wiki/1022910821149312/1023020967732032)

- slice
  slice()就是对应 String 的 substring()版本，它截取 Array 的部分元素，然后返回一个新的 Array：
  注意到 slice()的起止参数包括开始索引，不包括结束索引。

```js
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
arr.slice(0, 3) // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
arr.slice(3) // 从索引3开始到结束: ['D', 'E', 'F', 'G']
```

**如果不给 slice()传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个 Array：**

```js
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
var aCopy = arr.slice()
aCopy // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr // false
```

- push 和 pop
  push()向 Array 的末尾添加若干元素，pop()则把 Array 的最后一个元素删除掉：

```js
var arr = [1, 2]
arr.push('A', 'B') // 返回Array新的长度: 4
arr // [1, 2, 'A', 'B']
arr.pop() // pop()返回'B'
arr // [1, 2, 'A']
arr.pop() arr.pop() arr.pop() // 连续pop 3次
arr // []
arr.pop() // 空数组继续pop不会报错，而是返回undefined
arr // []
```

- splice
  splice()方法是修改 Array 的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素：

```js
var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle']
// 从索引2开始删除3个元素,然后再添加两个元素:
arr.splice(2, 3, 'Google', 'Facebook') // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除,不添加:
arr.splice(2, 2) // ['Google', 'Facebook']
arr // ['Microsoft', 'Apple', 'Oracle']
// 只添加,不删除:
arr.splice(2, 0, 'Google', 'Facebook') // 返回[],因为没有删除任何元素
arr // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
```

- unshift 和 shift
- sort
- reverse
- concat
- join
- 多维数组

### 对象

要判断对象是否拥有某一属性，可以用 `in` 操作符：

```js
var xiaoming = {
  name: '小明',
  birth: 1990,
  score: null,
}
'name' in xiaoming // true
'grade' in xiaoming // false
```

要判断一个属性是否是对象自身拥有的，而不是继承得到的，可以用 `hasOwnProperty()` 方法：

```js
var xiaoming = {
  name: '小明',
}
xiaoming.hasOwnProperty('name') // true
xiaoming.hasOwnProperty('toString') // false
```

### Map 和 Set

JavaScript 的默认对象表示方式{}可以视为其他语言中的 Map 或 Dictionary 的数据结构，即一组键值对。
但是 JavaScript 的对象有个小问题，就是键必须是字符串。但实际上 Number 或者其他数据类型作为键也是非常合理的。
`为了解决这个问题，最新的ES6规范引入了新的数据类型Map`

```js
var m = new Map([
  ['Michael', 95],
  ['Bob', 75],
  ['Tracy', 85],
])
m.get('Michael') // 95
```

初始化 Map 需要一个二维数组，或者直接初始化一个空 Map。Map 具有以下方法：

```js
var m = new Map()
m.set('Adam', 67)
m.has('Adam') // true
m.get('Adam')
m.delete('Adam')
m.get('Adam') // undefined
```

要创建一个 Set，需要提供一个 Array 作为输入，或者直接创建一个空 Set：

```js
var s1 = new Set()
var s = new Set([1, 2, 3])
s.add(4)
s.delete(3)
```

### iterable

[for..of 和 for..in 区别](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024358748480)

- for...of

```js
var a = ['A', 'B', 'C']
var s = new Set(['A', 'B', 'C'])
var m = new Map([
  [1, 'x'],
  [2, 'y'],
  [3, 'z'],
])
for (var x of a) {
  // 遍历Array
  console.log(x)
}
for (var x of s) {
  // 遍历Set
  console.log(x)
}
for (var x of m) {
  // 遍历Map
  console.log(x[0] + '=' + x[1])
}
```

- forEach

```js
var a = ['A', 'B', 'C']
a.forEach(function (element, index, array) {
  // element: 指向当前元素的值
  // index: 指向当前索引
  // array: 指向Array对象本身
  console.log(element + ', index = ' + index)
})
```

增删改

```js
let arr = [1, 2, 5, 7]
arr.forEach(function (element, index) {
  // element = 8 // 这样写不管用
  arr[index] = 6
})
```

**注意，forEach()方法是 ES5.1 标准引入的，你需要测试浏览器是否支持**

Set 与 Array 类似，但 Set 没有索引，因此回调函数的前两个参数都是元素本身：

```js
var s = new Set(['A', 'B', 'C'])
s.forEach(function (element, sameElement, set) {
  console.log(element)
})
```

Map 的回调函数参数依次为 value、key 和 map 本身：

```js
var m = new Map([
  [1, 'x'],
  [2, 'y'],
  [3, 'z'],
])
m.forEach(function (value, key, map) {
  console.log(value)
})
```

对比

> forEach 不能中途跳出循环  
> for...of 可以与 break、continue 和 return 配合使用，但是不能访问下标  
> 最原始的 for 循环 既能访问下标，又能中途跳出循环

## 函数

### map/reduce

[map/reduce 的概念](https://www.liaoxuefeng.com/wiki/1022910821149312/1024322552460832)

```js
function pow(x) {
  return x * x
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var results = arr.map(pow) // [1, 4, 9, 16, 25, 36, 49, 64, 81]

arr.map(String) // 把Array的所有数字转为字符串
```

Array 的 reduce()把一个函数作用在这个 Array 的[x1, x2, x3...]上，这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算，其效果就是：  
`[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)`

比方说对一个 Array 求和，就可以用 reduce 实现：

```js
var arr = [1, 3, 5, 7, 9]
arr.reduce(function (x, y) {
  return x + y
}) // 25
```

## JSON

- 还可以传入一个函数，这样对象的每个键值对都会被函数先处理
- 如果我们还想要精确控制如何序列化小明，可以给 xiaoming 定义一个 toJSON()的方法，直接返回 JSON 应该序列化的数据
- JSON.parse()还可以接收一个函数，用来转换解析出的属性：

## 面向对象

## 解构赋值

> 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于 undefined，默认值才会生效。
> 如果一个数组成员是 null，默认值就不会生效，因为 null 不严格等于 undefined。

解构不仅可以用于数组，还可以用于对象。
如果变量名与属性名不一致，必须写成下面这样。

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' }
baz // "aaa"

let obj = { first: 'hello', last: 'world' }
let { first: f, last: l } = obj
f // 'hello'
l // 'world'
```

这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。  
`let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' }`  
也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' }
baz // "aaa"
foo // error: foo is not defined
```

### 用途

交换变量的值

```js
let x = 1
let y = ((2)[(x, y)] = [y, x])
```

从函数返回多个值
函数参数的定义

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3])

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1})
```

提取 JSON 数据

```js
let jsonData = {
  id: 42,
  status: 'OK',
  data: [867, 5309],
}

let { id, status, data: number } = jsonData

console.log(id, status, number)
// 42, "OK", [867, 5309]
```

- 函数参数的默认值
  指定参数的默认值，就避免了在函数体内部再写 `var foo = config.foo || 'default foo'` 这样的语句。
- 遍历 Map 结构
  任何部署了 Iterator 接口的对象，都可以用 for...of 循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。
- 输入模块的指定方法

## 数值

ES6 将全局方法 parseInt()和 parseFloat()，移植到 Number 对象上面，行为完全保持不变。这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
`Number.EPSILON`
ES6 在 Number 对象上面，新增一个极小的常量 Number.EPSILON，对于 64 位浮点数来说就等于 2 的 -52 次方。
可以用来设置“能够接受的误差范围”。比如，误差范围设为 2 的-50 次方（即 Number.EPSILON \* Math.pow(2, 2)），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。

```js
function withinErrorMargin(left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2)
}
0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true
```

### Math 对象的扩展

- Math.trunc()
  去除一个数的小数部分，返回整数部分
- Math.sign()
  判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值
- Math.cbrt()
  计算一个数的立方根
- Math.hypot()
  返回所有参数的平方和的平方根

- 对数方法
- 双曲函数方法
- 指数运算符

## 函数的扩展

函数参数的默认值

### 箭头函数

1. 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
2. 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。
3. 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
4. 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

`上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的`

## 参考资料

- [Mozilla Developer Network](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [廖雪峰. JavaScript 教程](https://www.liaoxuefeng.com/wiki/1022910821149312)
- [阮一峰. ECMAScript 6 入门](http://es6.ruanyifeng.com)
