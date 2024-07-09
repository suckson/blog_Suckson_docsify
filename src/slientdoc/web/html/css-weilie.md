<!--
 * @Author: suckson
 * @Date: 2019-09-02 12:54:13
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-02 12:59:03
 -->
### css3 伪类的思考

> [!DANGER|style:flat]  天才就是99%的汗水加1%的灵感！

### 1.`::before`和`::after`

<img src="https://suckson-blog-static.oss-cn-beijing.aliyuncs.com/static/313F1A3FB096C31D35EB370A0472BA91.jpg" />

诸如这样的效果，我们当然也可以写两个class  .left or  .right,但是这种修饰性的元素我们直接写在DOM里面会显得不是很优雅。为此 ，可以结合::before和::after下特有的content，用于在css渲染中向元素逻辑上的头部或尾部添加内容。
经常可以见到一些font-icon库的作者使用Class 其实就是用了这个原理 
```css
.su-actived2::after{
  position: absolute;
  content: '';
  right: 0;
  top: 0;
  background: url('./../img/img_you@2x.png') no-repeat;
  width: 8px;
  height: 100%;
  background-size: 100% 100%;
  display: flex;
}
.su-actived2::before{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  background: url('./../img/img_zuo@2x.png') no-repeat;
  width: 8px;
  height: 100%;
  background-size: 100% 100%;
  display: flex;
}

/*
著名的css图标库 fontawesome
*/
.fa-flag:before {
    content: "\f024";
}
```