<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-04-26 16:06:33
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-01 19:16:50
 -->
### 滚动条知多少
 

  
 一、CSS overflow  规定了如果内容超出范围会发生什么
   *  visible   &nbsp;  &nbsp;  &nbsp; //默认值。内容不会被修剪，会呈现在元素框之外。
   *  hidden    &nbsp;  &nbsp;  //内容会被修剪，并且其余内容是不可见的。
   *  scroll &nbsp;  &nbsp; &nbsp;  //会显示滚动条
   *  auto &nbsp;  &nbsp;  &nbsp; &nbsp;//  如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容
   * inherit  &nbsp;  &nbsp;    // 继承父及元素的overflow值

 二 、滚动条样式

 1、::-webkit-scrollbar   定义了滚动条整体的样式；

 2、::-webkit-scrollbar-thumb  滑块部分；

 3、::-webkit-scrollbar-track  轨道部分；
  
 ###### 案例:

 <style>
 .father{
   width:100%;
   height:200px;
   border:1px solid #fdsfsr;
   border-radius:8px;
	 background-color: #ebdcdc;
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
  width:100%;
   border:1px solid #fdsfsr;
   border-radius:8px;
 }
 </style>
  <div class="father">
    <div class="child">
 <ul>一、CSS overflow  规定了如果内容超出范围会发生什么
 <li>*  visible   &nbsp;  &nbsp;  &nbsp; //默认值。内容不会被修剪，会呈现在元素框之外。</li>
   
   *  hidden    &nbsp;  &nbsp;  //内容会被修剪，并且其余内容是不可见的。
   *  scroll &nbsp;  &nbsp; &nbsp;  //会显示滚动条
   *  auto &nbsp;  &nbsp;  &nbsp; &nbsp;//  如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容
   * inherit  &nbsp;  &nbsp;    // 继承父及元素的overflow值
</ul>
 二 、滚动条样式

 1、::-webkit-scrollbar   定义了滚动条整体的样式；

 2、::-webkit-scrollbar-thumb  滑块部分；

 3、::-webkit-scrollbar-track  轨道部分；
    </div>
 </div>
 
 


