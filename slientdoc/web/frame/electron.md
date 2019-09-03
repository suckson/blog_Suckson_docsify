<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-03 22:18:06
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-03 23:35:50
 -->
### Electorn

> [!NOTE|style:flat] 天青色等烟雨，而我在等你!

> electron是由Github开发，用HTML，CSS和JavaScript来构建跨平台桌面应用程序的一个开源库。 Electron底层将Chromium和Node.js合并到同一个运行时环境中，使其同时支持DOM和Node的api。开发者可以不必在精通C# .net 等等语言的基础上快速上手支持多个平台的桌面程序的开发。 

> 对于electron 来说，底层是Chromium，是多进程的。 分为`MainProcess`和`RenderProcess`

###### MainProcess
1. 可以使用和系统对接的Electron API-创建菜单，上传文件等等,
2. 创建渲染进程- Renderer Process
3. 全面支持Node.js
4. 有且只有一个，程序的入口

###### RenderProcess
1. 可以有多个，每个对应一个窗口
2. 每个都是一个单独的进程
3. 全面支持Node.js和DOM API
4. 可以使用一部分Electron提供的API

* 二者可以调用的API作比较
  <img src = "public/imgsys/jinhceng.png">


