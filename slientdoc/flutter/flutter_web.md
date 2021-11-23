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

我们初始化一个webdemo 
1 检查我们的是否支持web端的构建 执行
···bash
flutter devices
···
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/flutter/951636992056_.pic_hd.jpg"> 
2、然后在命令行执行 flutter create you ProjectName
3、 flutter run -d chrome

这里我们用最简单的官方demo来掩饰我们的案例

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FlutterWeb Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
````
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/flutter/981637686330_.pic_hd.jpg"> 
`flutter` 编译后的页面元素

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/flutter/971637460663_.pic_hd.jpg"> 
`flutter` 编译后的文件结构

###  fluuter_web demo分析

1·  `flt-glass-pane` 元素

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/flutter/991637689002_.pic_hd.jpg"> 
这里我们看到`dart_sdk.js`封装了我们浏览器的document.createElement方法。生成了html元素。
 
 1、 canvas API
```html
<flt-scene-host style="pointer-events: none;" aria-hidden="true"><flt-scene><flt-canvas-container>
<canvas width="588" height="913" style="position: absolute; width: 588px; height: 913px; transform: translate(0px, 0px);">
</canvas>
</flt-canvas-container>
</flt-scene>
</flt-scene-host>
```
 canvas 的绘制逻辑


 2、css 应用
 3、解释器

### flutter 总结展望
