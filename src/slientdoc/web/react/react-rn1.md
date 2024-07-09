### React-Native环境搭建

!> 业精于勤荒于嬉，行成于思毁于随

*** 最近要做APP，技术栈选用的是react-native,自己还是个小白，今天就配置下RN的基础运行环境~~~ ***

> 由于小白用的是windows，所以linux和mac的今天就不做尝试了，以后有机会了在做相应补充。阅读官网文档了解到，我们需要安装
`Node`、`React Native 命令行工具`、`Python2` 以及 `JDK1.8` 和 `Android Studio` 废话不多说，开始搞起来~~

####  一、安装nodejs

  1. 访问 [nodejs官网](https://nodejs.org/en/)  根据自己的电脑系统下载安装包。这里注意，安装的node版本要大于10.0以上。
  我们选择的是10.16的稳定版。
   <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/node1.png" alt="nodejs">
  2. 安装过程一路默认即可，属于傻瓜式安装。
  3. 安装后，在任意位置打开命令行工具输入

  ```bash
  node -v
  npm -v 
  ```

  <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/node2.png">

  出现上述提示后，那么恭喜你，第一步已经成功了~~

####  二、安装React Native 命令行工具
  1. 看官方文档得知，这一步其实还是安装相对应的命令行工具，这次是 `yarn`

  ```bash
      # Yarn是Facebook提供的替代npm的工具，可以加速node模块的下载。
      # React Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。

      npm install -g yarn react-native-cli

      # 配置` Yarn `国内镜像
      yarn config set registry https://registry.npm.taobao.org --global
      yarn config set disturl https://npm.taobao.org/dist --global
      yarn -v
  ```

  <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/yarn1.png">
  2. 执行完命令后提示如上图所示，则代表安装成功。则第二部也已经成功。

####  三、安装Python

  1. 访问 [python官网](https://www.python.org/downloads/)根据自己的电脑系统下载安装包。这里注意，安装的版本要大于在2.X到3.0。
    我们选择的是V2.7.16。
     <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/python.png" alt="python">
  2. 安装过程一路默认即可，属于傻瓜式安装。
  3. 安装后，在任意位置打开命令行工具输入,出现如图所示的提示即为安装成功。
  ```bash
     python
  ```
  <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/pyok.png" alt="python">
  4. 若不能下载，请访问[百度云盘](https://pan.baidu.com/s/1bpdGW6wMLnPQBIngx5xPmg)下载所需资源 提取码`3fjy`。


####  四、安装JDK
  1. 访问 [oracle官网](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)根据自己的电脑系统下载安装包。
     <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/java1.png" alt="java">
  2. 安装过程一路默认即可，属于傻瓜式安装。
  3. 安装后，在任意位置打开命令行工具输入,出现如图所示的提示即为安装成功。

  ```bash
     java
     java -version
  ```

  <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/java2.png" alt="java">
  4. 若不能下载，请访问[百度云盘](https://pan.baidu.com/s/1PazhqJpn9kFle1AY99wqHg)下载所需资源 提取码`6zbm`。


####  五、安装Android Studio
 1. 访问 [Android Studio官网](https://developer.android.com/studio/index.html)下载安装包。若网站被墙了，可以尝试
    [云盘下载](https://pan.baidu.com/s/1E8x_iX_t9Yf-ZkuJtfttOQ) 提取码： `qxpo`
 2. 安装界面中选择"Custom"选项，确保选中了以下几项 `Android SDK`  、`Android SDK Platform`、 `Android Virtual Device`。
 <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/andrion.png">
 3. 安装 Android SDK，Android Studio 默认会安装最新版本的 Android SDK。目前编译 React Native 应用需要的是Android 9 (Pie)版本的 SDK（注意 SDK 版本不等于终端系统版本，RN 目前支持 android4.1 以上设备）。你可以在 Android Studio 的 SDK Manager 中选择安装各版本的 SDK。
 <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/andios.png">

 !> SDK Manager 还可以在 Android Studio 的"Preferences"菜单中找到。具体路径是Appearance & Behavior → System Settings → Android SDK。
 4. 配置 ANDROID_HOME 环境变量————打开控制面板 -> 系统和安全 -> 系统 -> 高级系统设置 -> 高级 -> 环境变量 -> 新建，创建一个名为`ANDROID_HOME`的环境变量（系统或用户变量均可），指向你的 Android SDK 所在的目录（具体的路径可能和下图不一致，请自行确认）：
 <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/andiosdk.png">
 SDK 默认是安装在下面的目录：

 ```html
    c:\Users\你的用户名\AppData\Local\Android\Sdk\platform-tools
 ```
5. 把 platform-tools 目录添加到环境变量 Path 中
打开控制面板 -> 系统和安全 -> 系统 -> 高级系统设置 -> 高级 -> 环境变量，选中Path变量，然后点击编辑。点击新建然后把 platform-tools 目录路径添加进去。

 <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/anzhuo3.png">

此目录的默认路径为：

 ```html
    c:\Users\你的用户名\AppData\Local\Android\Sdk\platform-tools
 ```

#### 六、创建新项目

1. 执行；

```bash
 react-native init AwesomeProject
```
2. 打开Android Studio，启动虚拟机。
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/viturl.png">

3. 编译并运行你的项目：

```bash
 cd AwesomeProject
 react-native run-android
```
4. 经过漫长的编译过程后：
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/rn/success.png">

功夫不负有心人，成功运行了了我们的第一个项目。

