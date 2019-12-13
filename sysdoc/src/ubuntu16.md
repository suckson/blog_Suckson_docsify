<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-12-12 12:53:30
 * @LastEditors: suckson
 * @LastEditTime: 2019-12-12 16:22:10
 -->
### U盘安装ubuntu16.04指南

> [!NOTE|style:flat] 请享受无法回避的痛苦。

> 最近搞什么3D环境，服务器是以前的一台windows机，现在需要重新宕机，换成乌班图16.04。废话不说，开搞——

### 一、下载所需镜像。等乱七八糟的软件

1.  1.`ubuntu的镜像`肯定是少不了的，这里推荐阿里镜像。因为国外官网的速度实在是不忍吐槽！注意，我们下载的是Server版本的，就是服务器版本的。不带desktop桌面。别问为什么，因为我们是程序员，不需要桌面！[阿里镜像](http://mirrors.aliyun.com/ubuntu-releases/16.04/)(https://ubuntu.com/download/desktop)
    
2.  2.`Rufus制作U盘启动工具`[下载链接](https://rufus.ie/)

### 二、开始制作优盘启动

设置参数，选择我们的镜像

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/ubuntu/ubuntu.png" />

制作成功后显示

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/ubuntu/2.png" />

### 三、启动安装系统
完成U盘制作，电脑关机插入U盘，开机时间启动BIOS设置从U盘启动，具体如何设置BIOS这里不分开来细说了，大家百度查找一下，问题应该不大。下面是本人电脑的选择方式，大家随机应变，不行就多试试，找到U盘的名字，多试几次从U盘启动肯定可以找到。本人是按按键F8



### 四、设置相关参数。
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/ubuntu/IMG_20191212_134316.jpg" />


中间设置到第七步的时候遇上了一个Bug, 因为之前电脑装过固态硬盘导致磁盘无法挂载。截图为证。
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/ubuntu/71d77e39ad3631ff24e5dccf1d4067b.png" />

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/ubuntu/41fd8a360a946935b0c5187c27ac1dc.png">

中间看了很久，也查了stackOverflow。看来很多群友都遇到像我一样的Bug，解决方案有很多种。说把固态拔掉就可以了，这显然不可取。最后在网上找了一个远程安装的linux版本，只需要配置好网卡等相关参数，既可以远程安装ubuntu，还比较轻便，我推荐这样安装。本文末尾处会献上所有资料。

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/ubuntu/a7989dbaba1301b7045a12a3fe42626.png">

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/ubuntu/86096590d8c6eaeee9def9932e53c62.png">

设置密码，选择相关网卡(`DHCP`)。安装下linxu相关软件(`OpenSSH`, `Vim` 、等)。最后我们成功的启动了我们的linux系统。


!> [资料下载链接](https://pan.baidu.com/s/16ttBUMFVbROKyUZn2vv3aQ ) 提取码 `23p7`