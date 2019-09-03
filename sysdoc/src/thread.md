<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-03 22:53:51
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-03 23:38:40
 -->
### 进程和线程
> [!NOTE|style:flat] 你我皆凡人，生在人世间！！

###### 概述
  - 线程是操作系统能够调度的最小单位，它被包含在进程之中，是进程中的实际运作单位！
  <img src = "public/webframeimg/renderprocess.png">
  <p style="text-align:center;">-关系如图-</p>


###### 两者的区别
1. 内存上，进程是单独的，默认情况下无法被其他进程共享。线程里面内存是可以共享。
2. 通信机制上，进程不互通（特殊方法下如IPC 除外），线程可以相互通讯。
3. 量级上，线程更加轻量。