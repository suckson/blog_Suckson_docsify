<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-17 13:47:48
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-27 23:18:23
 -->
### 弹性盒子模型

!> 单身狗也是狗，可以不爱，但是请不要伤害。

- 先从最近简单的布局，在以往的布局中，盒子模型中依赖 display 属性 + position属性 + float属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。2009年，W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。


#### 案例 最快上手(form)

```html
<style>
form  {
  display: flex;
}
</style>
<form action="#">
  <input type="email" placeholder="Enter your email">
  <button type="button">
    我是一个按钮
  </button>
</form>
```

<div style="background:#17a2b8;padding:15px;">
<style>
form  {
  display: flex;
}
</style>
<form action="#">
  <input type="email" placeholder="Enter your email">
  <button type="button">
    我是一个按钮
  </button>
</form>
</div>

还没有设置了该属性后发现可以看到，这两个控件之间有3像素～4像素的间隔，这是浏览器的内置样式指定的。设置为flex之后，可以看到，两个控件之间的间隔消失了，因为弹性布局的项目（item）默认没有间隔



#### flex-grow 属性

- 如果我们希望，输入框占据当前行的所有剩余宽度，只需要指定输入框的flex-grow属性为1。

 1. 两个控件元素的宽度没有发生变化，因为弹性布局默认不改变项目的宽度。
 2. 弹性布局默认左对齐，所以两个控件会从行首开始排列。
 3. flex-grow属性默认等于0，即使用本来的宽度，不拉伸。等于1时，就表示该项目宽度拉伸，占据当前行的所有剩余宽度。


```css
input  {
  flex-grow: 1;
}
```

#### align-self 属性和 align-items 属性

让我们改变一下，在按钮中插入一张图片
```html
<form action="#">
  <input type="email" placeholder="Enter your email">
  <button type="button"><svg>  <!-- a smiley icon -->  </svg></button>
</form>
```

按钮插入图片后，它的高度变了，变得更高了。这时，就发生了一件很奇妙的事情。前面说过，弹性布局默认不改变项目的宽度，但是它默认改变项目的高度。如果项目没有显式指定高度，就将占据容器的所有高度。 本例中，按钮变高了，导致表单元素也变高了，使得输入框的高度自动拉伸了。

`align-self`属性可以改变这种行为。

```css
input {
  flex-grow: 1;
  align-self: center;
}
```

. align-self属性可以取四个值。

1. flex-start：顶边对齐，高度不拉伸
2. flex-end：底边对齐，高度不拉伸
3. center：居中，高度不拉伸
4. stretch：默认值，高度自动拉伸

如果项目很多，一个个地设置align-self属性就很麻烦。这时，可以在容器元素（本例为表单）设置align-items属性，它的值被所有子项目的align-self属性继承。
```css
form {
  display: flex;
  align-items: center;
}
```
上面代码中，form 元素设置了align-items以后，就不用在控件上设置align-self，除非希望两者的值不一样。