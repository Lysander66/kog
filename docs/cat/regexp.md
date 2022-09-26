---
sidebar_position: 5
---

正则表达式（Regular Expression）通常被用来检索、替换那些符合某个模式(规则)的文本。

## 零宽断言

- 正向先行断言 `(?=exp)` 匹配 exp 前面的内容
- 正向后发断言 `(?<=exp)` 匹配 exp 后面的内容
- 负向先行断言 `(?!exp)` 匹配非 exp 前面的内容
- 负向后发断言 `(?<!exp)` 匹配非 exp 后面的内容

e.g.  
要在 img 标签或 el-image 标签的 src 属性统一加上路径前缀 path，通过 `(?<=(<img|<el-image).*src=")(?=.*)` 匹配到`src=`后的位置，然后替换为 path 即可

```html
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="date" label="日期" width="180" />
  <el-table-column prop="icon" label="图标" width="80">
    <template slot-scope="scope">
      <img v-bind:src="scope.row.icon" style="width: 80px;" />
    </template>
  </el-table-column>
  <el-table-column prop="name" label="姓名" width="180" />
  <el-table-column prop="address" label="地址" />
  <el-table-column prop="img" label="图片" width="80">
    <el-image style="width: 100px;" :src="url" :fit="fit" />
  </el-table-column>
</el-table>
```

## 反向引用

[反向引用](https://www.cnblogs.com/-ShiL/archive/2012/04/06/Star201204061009.html)

## example

```java
void format() {
	// 此处省略一个步骤，处理标点符号和空格，全角/半角
	String input = "['遵义虾子中国辣椒城：满天星：11.00元/斤左右（精品）', '满天星：10.00元/斤左右（上统货）', '满天星：9.00元/斤左右（统货）', '七星椒：9.00元/斤左右（精品）', '七星椒：8.50元/斤左右（上统货）', '灯笼椒：13.00元/斤左右（精品）', '灯笼椒：12.50元/斤左右（上统货）', '灯笼椒：11.50元/斤左右（统贷）', '灯笼椒：11.50元/斤左右（厂货）', '子弹头：13.50元/斤左右（精品）', '子弹头：12.50元/斤左右（上统贷）', '子弹头：12.00元/斤左右（统货）', '艳椒：9.00元/斤左右（精品）', '艳椒：8.00元/斤左右（上统货）', '艳椒：7.50元/斤左右（统货）', '艳椒：7.00元/斤左右（厂货）', '二荆条：11.50元/斤左右（精品）', '二荆条：10.50元/斤左右（统货）', '大条椒：9.00元/斤左右（精品）', '大条椒：8.50元/斤左右（上统货）', '牛心椒：12.50元/斤左右（精品）', '牛心椒：12.00元/斤左右（上统货）', '牛心椒：11.50元/斤左右（统货）', '印度小椒：6.00元/斤左右（好货）', '印度中椒：6.50元/斤左右（好货）', '满天星辣椒面：15.00元/斤左右（特级）', '灯笼椒辣椒面：16.00元/斤（特级）', '条椒辣椒面：10.00元/斤（特级）', '山鹰椒辣椒面：7.00元/斤左右', '遵义虾子镇：草莓型烘椒：14.00元/斤左右(精品)', '草莓型烘椒：13.30元/斤左右(好货)', '草莓型烘椒：12.80元/斤左右(上统货)', '草莓型烘椒:12.00元/斤左右(厂货)', '草莓型晒椒：13.50元/斤左右(新好货)', '草莓型晒椒：12.50元/斤左右（新统货）', '满天星：11.50元/斤左右（好货）', '满天星：10.50元/斤左右（上统货）', '满天星：9.50元/斤左右（好货）', '七星椒：10.00元/斤左右（好货）', '子弹头：14.50元/斤左右（好货）', '子弹头：14.00元/斤左右（上统货）', '子弹头：13.00元/斤左右（统货）', '牛心椒：13.00元/斤左右（好货）', '牛心椒：12.50元/斤左右（统货）', '大条子：9.50元/斤左右（好货）', '大条子：9.00元/斤左右（统货）', '二荆条：11.00元/斤左右（好货）', '二荆条：10.00元/斤左右（上统货）', '二荆条：9.50元/斤左右（统货）', '艳椒：9.50元/斤左右（好货）', '艳椒：9.30元/斤左右（好货）', '艳椒：8.50元/斤左右（统货）', '韩国椒：8.00元/斤左右（好货）', '韩国椒：7.00元/斤左右（统货）', '印度小椒：5.50元/斤左右', '印度中椒：5.00元/斤左右', '黄杨小米椒：11.00元/斤左右（新货）', '']";
	final String SEPARATOR = ";";
	final String SEPARATOR2 = "@";
	input = input.substring(2, input.length() - 1);// 删除前面的【['】和后面的【]】
	input = input.replaceAll("(?<=[城镇])：", SEPARATOR2 + "'");// [城镇]之后的【：】替换为【@'】
	input = input.replaceAll("(,\\s')(?=[\u4e00-\u9fa5]+?[城镇])", SEPARATOR);// [城镇]之前的【, '】替换为【;】
	input = input.replaceAll("'", "");// 删除【'】
	Map<String, String> dataMap = new LinkedHashMap<>();
	for (String s : input.split(SEPARATOR)) {
		String[] tmp = s.split(SEPARATOR2);
		dataMap.put(tmp[0], tmp[1]);
	}
	Pattern p1 = Pattern.compile("(.+)：(\\d.+)?(?=元)((.*（)(.*?)(?=）))?");
	for (Entry<String, String> data : dataMap.entrySet()) {
		System.out.println(data.getValue().replaceAll("'", ""));
		String[] arr = data.getValue().split(",");
		for (String str : arr) {
			Matcher m = p1.matcher(str);
			while (m.find()) {
				String type = m.group(1);
				String price = m.group(2);
				String quality = m.group(5) == null ? "无" : m.group(5);
				System.out.println("城市【" + data.getKey() + "】，" + "品种【" + type + "】，" + "品质【" + quality + "】，" + "价格【" + price + "】");
			}
		}
	}
}
```
