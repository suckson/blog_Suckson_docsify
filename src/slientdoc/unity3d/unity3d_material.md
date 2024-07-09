
### unity3D基础 Material的总结

  > [!DANGER|style:flat]  行路难行路难,多歧路，今安在？？

  最近要做一个透明水晶体的unity效果，正好在学习unity，就研究了研究unity材质

  #### 思路：要实现一个透明的水晶提体，只需创建一个3D 的object，并给设置相对应的material
  ######  
  #### 概念： 
  - 材质：物体的质地，指色彩，纹理，光滑度，透明度，反射率折射率，发光度等。其实就是shader的实例。

  - shader着色器  专门用来渲染3D图形的技术，可以是纹理按照某种方式展现。实际上就是一种欠到渲染管线中的一段代码。可以控制GPU运算图像的效果算法。

  - Texture 纹理 附加到物体表面的贴图。

  - 渲染模式  `opaque` 不透明模式  `tranSparepaprant` 透明半透明  `Cutout` 镂空  `fade` 淡入淡出

  
  `gameObject -> material -> shader -> Texture`
  
  第一步、创建材质  材质属于游戏资源  所以在project面板中创建
  <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/img_static/14611616036052_.pic_hd.jpg"  style="padding: 10px 30px;height:600px;"/>

  第二步、设置材质属性
   <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/img_static/27511616039769_.pic_hd.jpg"  style="padding: 10px 30px;0:600px;"/>
  
  第三步、创建一个最简单的gameObject`cube`并且吧刚才设置好的shader拖拽到`cube`上 
  <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/img_static/27521616039881_.pic_hd.jpg" style="padding: 10px 30px;height:600px;"/>





  



  
