<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-01 18:02:38
 * @LastEditors: suckson
 * @LastEditTime: 2019-12-13 10:00:14
 -->
## 那些css你还没用过的骚套路
> [!WARNING|style:flat]  你要时刻让自己的技术超出正常人的水平！！！

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

###  2、超出文字隐藏：
 文字超出部分显示`...`是个常见的需求然而我们每次都要用js来截取字符串吗？？不用 我们完全可以通过css来实现

<div style="width:100%;">
  <p class="bg-success" style="width:180px;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
  天涯思君不可望，武当山顶松长<p>
  <p class="bg-success" style="width:180px;color:#fff;overflow:hidden;     white-space:nowrap;">
  天涯思君不可望，武当山顶松长</p>
<div>
</div>

代码如下 
```css
.class{
width:180px;
color:#fff;
overflow:hidden;  // 文字溢出隐藏
text-overflow:ellipsis;  // 显示...
white-space:nowrap;  // 不换行
}
```

###  3、文字竖版排列：
  ```html
  <div class="verticle-mode">  
    <h4>咏柳</h4>  
    <p>碧玉妆成一树高，<br>万条垂下绿丝绦。<br>不知细叶谁裁出，<br>二月春风似剪刀。</p>  
  </div
  ```

  ```css
  .verticle-mode {   
    writing-mode: tb-rl;   
    -webkit-writing-mode: vertical-rl;         
    writing-mode: vertical-rl;   
}   
/* IE7比较弱，需要做点额外的动作 */ 
.verticle-mode {   
    *width: 120px;   
}   
.verticle-mode h4,   
.verticle-mode p {   
    *display: inline;   
    *writing-mode: tb-rl;   
}   
.verticle-mode h4 {   
    *float:rightright;   
}
  ```

 <style>
.verticle-mode {
    width:150px;
    margin: 20px auto; 
    writing-mode: tb-rl;   
    -webkit-writing-mode: vertical-rl;         
    writing-mode: vertical-rl;
    color: green; 
}   
/* IE7比较弱，需要做点额外的动作 */ 
.verticle-mode {   
    *width: 120px;   
}   
.verticle-mode h4,   
.verticle-mode p {   
    *display: inline;   
    *writing-mode: tb-rl;   
}   
.verticle-mode h4 {   
    *float:rightright;   
}
 </style>
<div class="verticle-mode">  
    <h4>咏柳</h4>  
    <p>碧玉妆成一树高<br>万条垂下绿丝绦<br>不知细叶谁裁出<br>二月春风似剪刀</p>  
</div>

### 3.css控制页面的换行，加上回车。

```css
.div{
	white-space: pre-wrap;
	line-height:25px;
}
```

### 4.几个特殊的alert样式
<div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
            <span class="sr-only">Close</span> 
    <i class="start-icon far fa-check-circle faa-tada animated"></i>
    You successfullyread this important.
  </div>
  <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
          <span aria-hidden="true">
          </span>
          <span class="sr-only">Close</span>
  <i class="start-icon  fa fa-info-circle faa-shake animated"></i>
  This alert needs your attention, but it's not super important.
  </div>
 <div class="alert fade alert-simple alert-warning alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
      <span aria-hidden="true">
      </span>
      <span class="sr-only">Close</span>
    <i class="start-icon fa fa-exclamation-triangle faa-flash animated"></i>
     Better check yourself, you're not looking too good.
  </div>
  <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16  font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
            <span class="sr-only">Close</span>
    <i class="start-icon far fa-times-circle faa-pulse animated"></i>
    Change a few things up and try submitting again.
  </div>
 <div class="alert fade alert-simple alert-primary alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
    <i class="start-icon fa fa-thumbs-up faa-bounce animated"></i>
     You successfullyread this important.
 </div>

 ```html
 <div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
            <span class="sr-only">Close</span> 
    <i class="start-icon far fa-check-circle faa-tada animated"></i>
    You successfullyread this important.
  </div>

  <div class="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
          <span aria-hidden="true">
          </span>
          <span class="sr-only">Close</span>
  <i class="start-icon  fa fa-info-circle faa-shake animated"></i>
  This alert needs your attention, but it's not super important.
  </div>

 <div class="alert fade alert-simple alert-warning alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
      <span aria-hidden="true">
      </span>
      <span class="sr-only">Close</span>
    <i class="start-icon fa fa-exclamation-triangle faa-flash animated"></i>
     Better check yourself, you're not looking too good.
  </div>

  <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16  font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
            <span class="sr-only">Close</span>
    <i class="start-icon far fa-times-circle faa-pulse animated"></i>
    Change a few things up and try submitting again.
  </div>
  
 <div class="alert fade alert-simple alert-primary alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
    <i class="start-icon fa fa-thumbs-up faa-bounce animated"></i>
     You successfullyread this important.
 </div>
 ```
