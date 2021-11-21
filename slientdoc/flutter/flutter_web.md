# flutter构建web应用程序的原理初探索

### 前言
要问现在最火的移动端的框架是什么，每个人心中自有自己的答案。不过就笔者人而言，前端两个字，更多的是代表显卡上每一个像素绘制的艺术————，从这一出发点来看。flutter基于浏览器上的DOM树、安卓View、IOS的UIVeiw、从渲染底层的来构建我们的应用UI，提供相关接口。这一出发点来看。目前flutter已经站在时代的前沿。
flutter在移动端的实践中，目前来说已经有很成熟的业界方案了、但是flutter在web的环境里面的应用还是有所欠缺的。今天我们来研究下flutter 构建web程序的相关技术栈。



###  flutter_web源远 flutter原理简介

<img src="https://pic1.zhimg.com/80/v2-7272cc75bef61b03e0cb9e577e2f592d_1440w.jpg?source=1940ef5c"> 

最早在2018flutter 1.0的时候、Flutter的产品经理Tim Sneath就推出了flutter_web。flutter Web想在单代码库的情况下，让应用拥有Web支持。开发者就可以使用Dart编写的应用可以被部署到任意的Web服务器上，或嵌入到浏览器中。甚至其他的IOS、安卓、windows设备、开发者可以使用Flutter的所有特性，也不需要特殊的浏览器插件支持。在Flutter Web的设计之初，主要考虑了两个方案用于Web支持:
  1、HTML+CSS+Canvas 
  2、[]CSS Paint API(https://zhuanlan.zhihu.com/p/39931190)

方案1具有最好的兼容性，它优先考虑HTML+CSS表达，当HTML+CSS无法表达图片的时候，会使用Canvas来绘制。但2D Canvas在浏览器中是位图表示，会造成像素化下的性能问题。方案2是新的Web API, 属于Houdini的组成部分。Houdini提供了一组可以直接访问CSS对象模型的API，使得开发者可以去书写代码并被浏览器作为CSS加以解析，这样在无需等待浏览器原生的支持下，创造了新的CSS特性。它的绘制并非由核心Javascript完成，而是类似Web Worker的机制。其绘制由显示列表支持，而不是位图。但目前CSS Paint API不支持文本，此外各家厂商对齐支持也并不统一。

###  fluuter_web demo

```dart

````

```html
```

这是一个fultter一个官方demo。

###  fluuter_web demo分析
 
 1、 canvas API
 2、css 应用
 3、解释器

### flutter 总结展望
