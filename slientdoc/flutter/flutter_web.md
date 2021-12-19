# flutter构建原理之如何将dart代码转换为js的那些事

### 前言
要问现在最火的移动端的框架是什么，每个人心中自有自己的答案。不过就笔者人而言，前端两个字，更多的是代表显卡上每一个像素绘制的艺术，从这一出发点来看。flutter基于浏览器上的DOM树、安卓View、IOS的UIVeiw、从渲染底层的来构建我们的应用UI，提供相关接口。这一出发点来看。目前flutter已经站在时代的前沿。
flutter在移动端的实践中，目前来说已经有很成熟的业界方案了、但是flutter在web的环境里面的应用还是有所欠缺的。今天我们来研究下flutter 构建web程序的相关技术栈。



###  flutter_web源远 flutter原理简介

<img src="https://pic1.zhimg.com/80/v2-7272cc75bef61b03e0cb9e577e2f592d_1440w.jpg?source=1940ef5c"> 

其实、最早在2018 flutter 1.0的时候、Flutter的产品经理Tim Sneath就推出了flutter_web。flutter Web想在单代码库的情况下，让应用拥有Web支持。开发者就可以使用Dart编写的应用可以被部署到任意的Web服务器上，或嵌入到浏览器中。甚至其他的IOS、安卓、windows设备、开发者可以使用Flutter的所有特性，也不需要特殊的浏览器插件支持。在Flutter Web的设计之初，主要考虑了两个方案用于Web支持:
  1、HTML+CSS+Canvas 
  2、[]CSS Paint API(https://zhuanlan.zhihu.com/p/39931190)

方案1具有最好的兼容性，它优先考虑HTML+CSS表达，当HTML+CSS无法表达图片的时候，会使用Canvas来绘制。但2D Canvas在浏览器中是位图表示，会造成像素化下的性能问题。方案2是新的Web API, 属于Houdini的组成部分。Houdini提供了一组可以直接访问CSS对象模型的API，使得开发者可以去书写代码并被浏览器作为CSS加以解析，这样在无需等待浏览器原生的支持下，创造了新的CSS特性。它的绘制并非由核心Javascript完成，而是类似Web Worker的机制。其绘制由显示列表支持，而不是位图。但目前CSS Paint API不支持文本，此外各家厂商对齐支持也并不统一。

  好了、废话先不讲了。接下来我们从一个简单的demo入手，看看flutter，是如何一步一步将web转换为我们的js

### 代码分析
  这里我们拿官方最熟悉的demo初始化项目，当然我们也可以拿其他更复杂的场景[链接](https://github.com/flutter/samples)来验证,这里我们用最简单的官方demo来掩饰我们的案例， 在启动完我们的项目后,执行
  ```bash
      项目
      flutter run -d chrome
      flutter build web

      // 单个的dart 文件 我们可以dart2.js使用 
      dart2js dart文件名 --out=js文件名
  ```

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/flutter/8161639881641_.pic.jpg"> 
`flutter` build后的文件产物
其中assets文件夹中包含了我们app中的图片，字体等；main.dart.js中包括了所有的Flutter web sdk和我们的业务代码。
flutter_service_worker.js.map，浏览器在做source mapping时会用到，我们可以通过--no-source-maps选项来关闭这个文件的创建。

Flutter for Web的两种编译模式

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/flutter/8221639913789_.pic.jpg"> 

- dartdevc
在dartdevc我们不仅可以将代码直接运行在Chrome浏览器，也可以将Flutter代码编译为js文件部署在服务端。如果代码运行在Chrome浏览器，如下图，flutter_tools会使用dartdevc编译器进行编译，dartdevc是支持增量编译的，开发者可以像调试Flutter Mobile代码一样使用hot reload来提升调试效率。Flutter for Web调试也是非常方便的，编译后的代码是默认支持source map，当运行在web浏览器时，开发者是不用关心生成的js代码是怎样的。
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/flutter/991637689002_.pic_hd.jpg"> 

-dart2js https://dart.dev/tools/dart2js
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/flutter/dart2.js.png"> 

在调用flutter build web命令后会将项目的main.dart传入编译流程，最终输出的是中间文件app.dill。这个dill文件很关键，笔者的理解是一种包含了dart程序的抽象语法树生成的AST文件，能运行在所有的操作系统和CPU架构上。在构建过程中flutter_tools首先会将传入的参数进行组装，然后调用dart2jsSnapshot。进行dart文件编译，生成Weget树的二进制文件的dill文件，这个代码的位置在dart-sdk/html/dart2js/html_dart2js.dart(Flutter 2.5.3 Tools • Dart 2.14.4)这个路径下。dart2jsSnapshot 是一个专门为web平台转换做的解释器。类似于flutter_web_sdk。只不过flutter_web_sdk的源码更多的是在调试时候做debugger，效率很低。在build的时候，显然利用快照的方式比较合理。本质上是一件事情。
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/flutter/8231639913968_.pic.jpg"> 
dart2jsSnapshot的调用参数有

```bash
--no-source-maps参数就是我们上文提到的是否生成sourcemap的选项；
--cfe-only参数代表只完成前端编译，生成kernel(.dill)文件后就不继续后面的编译流程。
```

在html_dart2js.dart中，通过dart2js的registerCustomElement方法生成Component，第二步是将co通过对Component进行遍历，可以找到app中所有的Library，Library中包含了库中定义的所有的方法节点、变量节点等。
```dart
Function _registerCustomElement(context, document, String tag, [Map? options]) {
  var constructor = findConstructorForNativeSubclassType(type, 'created');
  if (constructor == null) {
    throw new ArgumentError("$type has no constructor called 'created'");
  }

  // Workaround for 13190- use an article element to ensure that HTMLElement's
  // interceptor is resolved correctly.
  getNativeInterceptor(new Element.tag('article'));

  String baseClassName = findDispatchTagForInterceptorClass(interceptorClass);
  if (baseClassName == null) {
    throw new ArgumentError(type);
  }
  /*省略部分代码**/
  JS(
      'void',
      '#.createdCallback = #',
      properties,
      JS('=Object', '{value: #}',
          _makeCallbackMethod(_callConstructor(constructor, interceptor))));
  JS('void', '#.attachedCallback = #', properties,
      JS('=Object', '{value: #}', _makeCallbackMethod(_callAttached)));
  JS('void', '#.detachedCallback = #', properties,
      JS('=Object', '{value: #}', _makeCallbackMethod(_callDetached)));

  return JS(
      'JavaScriptFunction', '#.registerElement(#, #)', document, tag, opts);
}

```
在compile方法中最终会调用到kernel_target.dart中的buildComponent()方法，该方法的实现如下：
```dart.js
Future buildComponent({bool verify: false}) async { if (loader.first == null) return null; return withCrashReporting(() async { 
 ticker.logMs("Building component"); await loader.buildBodies(); 
 finishClonedParameters(); 
 loader.finishDeferredLoadTearoffs(); 
 loader.finishNoSuchMethodForwarders(); List myClasses = collectMyClasses(); 
 loader.finishNativeMethods(); 
 loader.finishPatchMethods(); 
 finishAllConstructors(myClasses); 
 runBuildTransformations(); if (verify) this.verify(); 
 installAllComponentProblems(loader.allComponentProblems); return component; 
 }, () => loader?.currentUriForCrashReporting); 
 } 
```

其中buildBodies()对每一个Library进行词法分析和语法分析，把dart源码中的每一个Library解析保存在Component中；

runBuildTransformations()方法是对Component做一些转换主要包括evaluate constants,add constant coverage 和lower value classes，主要是对代码中的常量做处理，对dart中对js的调用做转换等。

BinaryPrinter会对Component进行语法树的遍历，将Component中每一个node按照一定格式写入到dill文件。



Dart2js生成前端代码

和前端编译一样，首先通过flutter_tools调用到dart2jsSnapshot。调用的参数如下：

```text
--libraries-spec=/Users/beike/flutter/bin/cache/flutter_web_sdk/libraries.json 

--native-null-assertions 

-Ddart.vm.product=true 

-DFLUTTER_WEB_AUTO_DETECT=true 

--no-source-maps 

-O1 

-o 

/Users/beike/path_to_js/main.dart.js 

/Users/beike/path_to_dill/app.dill 
```
其中O1代表优化等级,O4的优化程度最高。通过优化可以减少产物的大小并且优化代码的性能。

Dart2js的后端编译主要包括以下代码:
```dart
KernelResult result = await kernelLoader.load(uri); 
 [省略部分代码] 
 JsClosedWorld closedWorld = selfTask.measureSubtask("computeClosedWorld", () => computeClosedWorld(rootLibraryUri, libraries)); 
 [省略部分代码] 
 GlobalTypeInferenceResults globalInferenceResults = 
 performGlobalTypeInference(closedWorld); 
 [省略部分代码] 
 generateJavaScriptCode(globalInferenceResults); 
 ```
1. 首先，编译器会将传入的dill通过BinaryBuilder加载到Component中并存储在KernelResult中；

2. computeClosedWorld()方法会将第一步解析出来的所有Library解析成JsClosedWorld，JsClosedWorld代表了通过closed-world语义编译之后的代码。它的结构如下：
```dart
class JsClosedWorld implements JClosedWorld { static const String tag = 'closed-world'; @override final NativeData nativeData; @override final InterceptorData interceptorData; @override final BackendUsage backendUsage; @override final NoSuchMethodData noSuchMethodData; 

 FunctionSet _allFunctions; final Map<classentity, Set> mixinUses; Map<classentity, List> _liveMixinUses; final Map<classentity, Set> typesImplementedBySubclasses; final Map<classentity, Map> _subtypeCoveredByCache = 
 <classentity, Map>{}; // TODO(johnniwinther): Can this be derived from [ClassSet]s?  final Set implementedClasses; final Set liveInstanceMembers; /// Members that are written either directly or through a setter selector.  final Set assignedInstanceMembers; @override final Set liveNativeClasses; @override final Set processedMembers; 
 [省略部分代码] 
 } 
```

通过传入的app入口，也就是main()函数，我们能够知道什么方法被调用，哪些类被初始化，哪些语言特性被使用到等。从结构我们可以看出JsClosedWorld就是用来存储这些信息的。这些信息将决定后续的编译流程如何优化，代码如何生成。


然后，对于JsClosedWorld进行代码优化，包括上面代码中的performGlobalTypeInference()等。


最终，generateJavaScriptCode()方法会将上边返回的结果通过JSBuilder生成最终的js AST。


简单了解了Flutter for Web的编译模式和编译流程之后，下面我们看一下如何部署Flutter for Web产物。


### 构建产物
1. serverWork Flutter for Web默认支持Service worker。如果想禁用Service Worker，在编译时加上--pwa-strategy=none参数即可。
```js
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

```
Service worker是和JavaScript主线程执行在不同线程的一个进程，可以拦截和修改资源访问，更细粒度的缓存资源。它的生命周期包括注册、安装和激活，提供了回调方法在这几个生命周期进行一些自定义任务。这里我们看到flutter在构建完成之后对我们缓存获取做了一个优化，其中RESOURCES默认缓存了我们App中使用到的资源，当去拉取这些资源的时候，会默认返回缓存中的资源，当没有命中缓存再去请求网络资源。以保证我们的加载速度。



2. CanvasKit和HTML
```dart
void main() {
  ui.window.onBeginFrame = beginFrame;
  ui.window.scheduleFrame();
}

void beginFrame(Duration timeStamp) {
  ///画一个 100 的剧中蓝色
  canvas.drawRect(
      Rect.fromCenter(
          center: Offset.zero,
          width: 100,
          height: 100),
      new Paint()..color = Colors.blue);
}
 ```


```dart
abstract class c {
  void drawRect(Rect rect, Paint paint);
}
html.HtmlElement _drawRect(ui.Offset p, SurfacePaintData paint) {

 [省略部分代码]
  Element = _drawRect(paint);
 [省略部分代码]
 final String cssTransform = float64ListToCssTransform(
 transformWithOffset(_canvasPool.currentTransform, p).storage);
 imgElement.style
 ..transformOrigin = '0 0 0' ..transform = cssTransform 
 ..removeProperty('width')
 ..removeProperty('height');
 rootElement.append(imgElement);
 _children.add(imgElement); return imgElement;
 }
 ```

当调度任务调用到drawRect()方法之后，会调用到drawRect()方法,方法中会创建canvas元素，并且将dart的绘制逻辑用重新实现一边，最终将Element添加到rootElement，也就是当前的flt-canvas元素中。生成的html如下：
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/flutter/WeChat18c88d2f231e75fb6c7ad4efcb6ac78b.png"> 

### flutter 总结展望

通过以上的简单分析，我们发现通过flutter的编译。重写了大量的绘制的class，这对于前端开发来说可能提供了一个新的思路。当然本次有些地方的分析还是很粗略的分析。对于细致的过程，只是初步的分析介绍了fullter打包构建流程，并没有给出完整的思路。我们希望随着flutter社区方案的愈加完善，利用fluuter技术栈上线的web产品也会越来越多。