<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-10-09 17:09:21
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-09 18:38:28
 -->
!>我曾经也泄气过，但是我经常能死灰复燃，顽强的很！

### RN安卓真机调试

介绍一下安卓手机的RN真机调试(由于笔者很穷，暂时还没买苹果———呜呜呜))

#### 一、打开安卓收手机的usb调试功能。
 
> PS 具体手机的套路可能不一样，笔者用的华为系列。直接找不到开发者模式，需要到 `设置` > `系统` > `关于手机` > `版本号中去`
然后将版本号点击多次(`好像是七次`)才会提示，之后再去`设置` > `系统` > `开发人员选项` 中打开USB调试。

<div class="container">
<div class="row">
<div class="col-4">
<img src ="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/debugger/1.png">
</div>
<div class="col-4">
<img src ="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/debugger/2.png">
</div>
<div class="col-4">
<img src ="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/debugger/3.png">
</div>
</div>
</div>

<p>&nbsp;</p>

#### 二、检查你的设备是否能正确连接到ADB

```bash
adb devices
```

出现设备则说明链接成功

#### 三、运行启动

执行一下命令

```bash
react-native run-android
```
<img src ="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/debugger/4.png">
<p>&nbsp;</p>

第一次运行报了一个loaddebugger 的错，查阅资料才知道，真机不能安装该软件，否则会debugger失败，卸载即可。
在等待了几分钟之后
<p>&nbsp;</p>
<img src ="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/debugger/5.png">
我们成功的运行了项目。
<p>&nbsp;</p>

#### 四、重载，开发设置
 我们只需要摇一摇手机，即可对我们更改过的代码进行重新打包，我们可以实时的调试我们的应用。
 <p>&nbsp;</p>
<img src ="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/debugger/6.png">
<p>&nbsp;</p>