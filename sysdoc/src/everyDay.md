<!--
 * @Author: suckson
 * @Date: 2019-09-02 11:04:18
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-17 10:07:37
 -->
## 每日算法一练
> [!NOTE|style:flat]  我欲乘风归去！！！

 ####  一.在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不-致,请为该数组排序。使得排序后数组中球的顺序为黄、红、蓝。
 例如:红蓝蓝黄红黄蓝红红黄红，排序后为:黄黄黄红红红红红蓝蓝蓝。
 ```js
let Arr = [5,2,0,8,6,8,2,2,8];

const index = Arr.reduce((pre, item) => {
   if(item in pre){
    pre[item]++
  }else{
    pre[item] = 1 
  }
  return pre
},{})
let Res = []
for(item in index){
  for(var i = 0; i< index[item]; i++){
    Res.push(item)
  }
}
console.log(Res)
 ```
 ####  二.数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
 例如: 例如输入一个长度为9的数组, 由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。
 ```js
let Arr = [5,2,0,8,6,8,2,2,8];

let numlength = Math.floor(Arr.length / 2)

const index = Arr.reduce((pre, item) => {
   if(item in pre){
    pre[item]++
  }else{
    pre[item] = 1 
  }
  return pre
},{})

console.log(index)
function Result (index,numlength){
    for(item in index){
       if( index[item] > numlength ){
          return index
       }else{
           return 0
       }
    }
}
Result(index, numlength)
 ```
 
 ####  二.求多个数组之间的交集。
 例如: 例如输入二维数组合并二维数组中重复的元素。
 ```js
let Arr = [['1', '2', '3','7', '8', '10'], ['1', '11', '10'], ['1', '8', '7'], ['8', '1', '11']];

 ```