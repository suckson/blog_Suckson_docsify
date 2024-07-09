<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-01 22:59:08
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-02 00:00:17
 -->
### java内存分析

!>  世界上没有做不成的事

###### java虚拟机的内存可以分为三个区域：
+ 栈 `stack` 
   1. 描述的是方法执行的模型，每个方法调用都会创建一个栈帧(储存局部变量，操作数。方法出口等)。
   2. JVM会为每一个线程创建一个栈帧，用来储存该方法的实际信息。
   3. 栈属于线程私有，不能线程共享。
   4. 站的储存特性是先进后出，后进先出，类似于弹夹。
   5. 栈是有系统自动分配的。速度快，是一个连续的储存空间。
  
+ 堆 `heap`
   1. 堆用于存储创建好的对象。
   2. JVM只有一个堆，被所有线程所共享。
   3. 堆是一个不连续的内存空间，分配灵活，速度慢。

+ 方法区(也是存在堆里面) `method area`
   1. JVM只有一个方法区，被所有线程所共享。
   2. 方法也是堆，只是用来存储类，常量相关信息。
   3. 用来存放程序中用于不变或者唯一不变的内容(类信息， class 对象等)。

   <div>
   <h3 style="text-align:center;padding:25px;">图解模型分析</h3>
   <div style="display:flex;">
   <div style="width:35%;padding:50px;background:#ffbdbd;text-align:center;">
   <p>栈模型</br>
   连续的存放对象，通过内训地址指向堆的引用···</br>
   （通常是一串内存地址）
   </p>
   </div>
   <div style="width:65%;padding:50px;background:#32adad44;text-align:center;">
   <p>堆模型  存放常量  方法  类的信息</br>
      main方法执行后 压栈  在栈中创建一个个对象
   </p>
   </div>
   </div>
   </div>

