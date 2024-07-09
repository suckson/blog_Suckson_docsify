<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-10-19 20:35:41
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-19 23:13:03
 -->
!> 无奈这天方知你最好，因始终得不到。

#### 什么是闭包？

> 有权访问另一个函数作用域中变量的函数

#### 闭包的特点

* 函数嵌套函数
* 函数内部可以引用外部的参数和变量
* 参数和变量不会被垃圾回收机制回收（也是缺点，使用不当会造成内存泄漏）

#### 闭包的优点

* 希望一个变量长期驻扎在内存中
* 避免了全局变量的污染
* 私有成员的存在

> 其实说的更直白一点，闭包其实是结合了全局变量和局部变量的优点

全局变量的好处就在于什么地方都能用，但是这样就会有个问题，全部变量的污染问题，你不知道在哪不小心改了，其他的引用这个变量的点都会受到影响局部变量就是定义在函数里的，他不能被倍的函数直接用，只能通过传参的一些方式,闭包就解决了这个问题，即时在局部被定义的，但是还能在别的函数里面直接调用。最简单的例子jquery，使用`$`一个变量，我们就可以使用jquery所有的方法。


#### 利用闭包封装对象的方法:

1. 声明函数后利用工厂模式重复调用
```js
(function(window,document){
    function Obj(select, obj){
				this.select = select
				this.setting  = obj
				this.init();
    };
	Obj.prototype = {
		init:function(){
		this.event();
	},
		event: function(){
			// $(this.select)[0].innerHTML 
		},
		$: function(Dom){
			return document.querySelectorAll(Dom)
		}
	}
	window.Obj = Obj
})(window,document)
```
封装类似于swiper插件的模式，在调用的时候只需要：

```js
var bar = new Obj("#element",{params: 'cahiheng'})
```


2. 利用函数方法封装相应模块暴露方法：
```js
**
 * Created by lonecloud on 2017/9/10.
 */
(function (window) {
    var DEBUG="debug"
    /**
     * 打印日志
     * @param args
     */
    function log(args) {
        console.log(args)
    }
 
    /**
     * debug 利用闭包
     * @param args
     */
    function debug(args) {
        console.log(DEBUG+args);
    }
    /**
     * 编写
     * @param args
     */
    function write(args) {
        document.write(args)
    }
    window.$ = {
        log: log,
        write: write,
        debug:debug
    }
})(window);
//调用
$.write("dda")
$.debug("dsds")
$.log("dsqwd")
```
