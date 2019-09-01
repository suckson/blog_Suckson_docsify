<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-01 18:02:38
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-01 19:29:07
 -->
## 那些css你还没用过的骚套路
!> 古人云：知之为知之不知为不知，真的是什么都不想知道，如果可以的话！！！

###  1、自定义滚动条的样式：

```css
.father{
   width:80%;
   height:35px;
   border:1px solid #fdsfsr;
   border-radius:8px;
   background:#408080;
   overflow-y:hidden;
   overflow-x:auto;
 }
 .father::-webkit-scrollbar{
    width: 20px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 5px;
 }
 .father::-webkit-scrollbar-thumb {
  border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #8080ff;
}
.father::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #3abdcf;
}
 .child{
   width:12000px;
   height:35px;
   border:1px solid #fdsfsr;
   border-radius:8px;
 }
```
 <style>
 .father{
   width:100%;
   height:200px;
   border:1px solid #fdsfsr;
   border-radius:8px;
	 background: #e6e6e6;
   overflow-y:auto;
   overflow-x:hidden;
 }
 .father::-webkit-scrollbar{
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 5px;
 }
 .father::-webkit-scrollbar-thumb {
  border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #fff;
}
.father::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #ccc;
}
 .child{
   width:100%;
   height:250px;
   border:1px solid #fdsfsr;
   border-radius:8px;
   padding: 15px;
 }
 </style>
  <div class="father">
    <div class="child">
       CSS overflow  规定了如果内容超出范围会发生什么
       <ol>
         <li> *  visible   &nbsp;  &nbsp;  &nbsp; //默认值。内容不会被修剪，会呈现在元素框之外。</li>
         <li> *  hidden    &nbsp;  &nbsp;  //内容会被修剪，并且其余内容是不可见的。</li>
         <li>*  scroll &nbsp;  &nbsp; &nbsp;  //会显示滚动条</li>
         <li>*  auto &nbsp;  &nbsp;  &nbsp; &nbsp;//  如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容</li>
         <li> * inherit  &nbsp;  &nbsp;    // 继承父及元素的overflow值</li>
        </ol>
         滚动条样式
         <ol>
         <li>::-webkit-scrollbar   定义了滚动条整体的样式；</li>
         <li>::-webkit-scrollbar-thumb  滑块部分；</li>
         <li>::-webkit-scrollbar-track  轨道部分；</li>
         </ol>
   </div>
 </div>
 
 