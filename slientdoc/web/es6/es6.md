<!-- 
 * @Author: suckson
 * @Date: 2019-10-11 09:41:02
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-13 21:13:34
 -->
### 不太好理解的Es6的语法的总结

> 每天的表现，就是你未来的必然

##### 1、 函数变量的解构和赋值传默认的参数

```js
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

##### 2、 解构赋值的用途
1. 交换值
2. 返回多个值
3. 解构赋值可以方便地将一组参数与变量名对应起来
4. 遍历 Map 结构
何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。
```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```
如果只想获取键名，或者只想获取键值，可以写成下面这样。
```js
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...获取键值对
}

```
5. 输入模块的指定方法
加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```