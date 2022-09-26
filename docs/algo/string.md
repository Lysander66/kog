---
sidebar_position: 2
---

# 字符串匹配算法

## BF 算法

Brute Force 算法，中文叫作暴力匹配算法，也叫朴素匹配算法。从名字可以看出，这种算法的字符串匹配方式很“暴力”，当然也就会比较简单、好懂，但相应的性能也不高。

BF 算法是最简单、粗暴的字符串匹配算法，它的实现思路是，拿模式串与主串中是所有子串匹配，看是否有能匹配的子串。所以，时间复杂度也比较高，是 O(n\*m)，n、m 表示主串和模式串的长度。不过，在实际的软件开发中，因为这种算法实现简单，对于处理小规模的字符串匹配很好用。

## RK 算法

RK 算法的全称叫 Rabin-Karp 算法，是由它的两位发明者 Rabin 和 Karp 的名字来命名的。

RK 算法是借助哈希算法对 BF 算法进行改造，即对每个子串分别求哈希值，然后拿子串的哈希值与模式串的哈希值比较，减少了比较的时间。所以，理想情况下，RK 算法的时间复杂度是 O(n)，跟 BF 算法相比，效率提高了很多。不过这样的效率取决于哈希算法的设计方法，如果存在冲突的情况下，时间复杂度可能会退化。极端情况下，哈希算法大量冲突，时间复杂度就退化为 O(n\*m)。

## BM 算法

[字符串匹配基础（中）：如何实现文本编辑器中的查找功能](https://time.geekbang.org/column/article/71525)

Boyer-Moore 算法。它是一种非常高效的字符串匹配算法，有实验统计，它的性能是著名的 KMP 算法的 3 到 4 倍。  
BM 算法核心思想是，利用模式串本身的特点，在模式串中某个字符与主串不能匹配的时候，将模式串往后多滑动几位，以此来减少不必要的字符比较，提高匹配的效率。BM 算法构建的规则有两类，坏字符规则和好后缀规则。好后缀规则可以独立于坏字符规则使用。因为坏字符规则的实现比较耗内存，为了节省内存，我们可以只用好后缀规则来实现 BM 算法。

1. 坏字符规则
2. 好后缀规则

## KMP 算法

KMP 算法是根据三位作者（D.E.Knuth，J.H.Morris 和 V.R.Pratt）的名字来命名的，算法的全称是 Knuth Morris Pratt 算法，简称为 KMP 算法。

## Trie 树

[Trie 树：如何实现搜索引擎的搜索关键词提示功能](https://time.geekbang.org/column/article/72414)

自动输入补全，比如输入法自动补全功能、IDE 代码编辑器自动补全功能、浏览器网址输入的自动补全功能等等。

Trie 树是一种解决字符串快速匹配问题的数据结构。如果用来构建 Trie 树的这一组字符串中，前缀重复的情况不是很多，那 Trie 树这种数据结构总体上来讲是比较费内存的，是一种空间换时间的解决问题思路。
尽管比较耗费内存，但是对内存不敏感或者内存消耗在接受范围内的情况下，在 Trie 树中做字符串匹配还是非常高效的，时间复杂度是 O(k)，k 表示要匹配的字符串的长度。

但是，Trie 树的优势并不在于，用它来做动态集合数据的查找，因为，这个工作完全可以用更加合适的散列表或者红黑树来替代。Trie 树最有优势的是查找前缀匹配的字符串，比如搜索引擎中的关键词提示功能这个场景，就比较适合用它来解决，也是 Trie 树比较经典的应用场景。

## AC 自动机

[AC 自动机：如何用多模式串匹配实现敏感词过滤功能](https://time.geekbang.org/column/article/72810)

## 统计频率

```java
public class Foo2 {
    static final String W1 = "路飞";
    static final String W2 = "弗兰奇";
    Map<String, Integer> map;

    void func(String content) {
        map = new HashMap<>();
        map.put(W1, 0);
        map.put(W2, 0);
        List<String> list = new ArrayList<>(map.keySet());
        for (int i = 0; i < content.length(); i++) {
            for (String word : list) {
                if (word.charAt(0) == content.charAt(i) && i + word.length() < content.length()) {
                    if (word.equals(content.substring(i, i + word.length()))) map.merge(word, 1, Integer::sum);
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        String content2 = "索隆弗兰奇路飞路弗兰奇路飞弗奇山治路\n" +
                "飞索隆弗兰奇路飞路弗兰奇路飞弗奇山治\n" +
                "索隆弗兰奇路飞路弗兰奇路飞弗奇山治\n" +
                "索隆弗兰奇路飞路弗兰奇路飞弗奇山治路\n" +
                "\n" +
                "飞索隆弗兰奇路飞路弗兰奇路飞弗奇山治";
        String fileName = "C:/Users/86152/Desktop/tmpDir/Luffy.txt";
        String content = new String(Files.readAllBytes(Paths.get(fileName)), Charset.forName("UTF-8"));
        Foo2 foo = new Foo2();
        foo.func(content);
        foo.map.entrySet().stream().sorted(Map.Entry.<String, Integer>comparingByValue().reversed()).forEach(System.out::println);
        // Files.lines(Paths.get(fileName), StandardCharsets.UTF_8).forEach(System.out::println);
        // List<String> result = Files.readAllLines(Paths.get(fileName), StandardCharsets.UTF_8);
    }
}
```

## 字符串中的单词数

[434. 字符串中的单词数](https://leetcode-cn.com/problems/number-of-segments-in-a-string/)

```go
func countSegments(s string) int {
	count := 0
	for i := 0; i < len(s); i++ {
		if (i == 0 || s[i-1] == ' ') && s[i] != ' ' {
			count++
		}
	}
	return count
}
```
