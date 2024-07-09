<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-02 15:46:43
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-17 11:02:52
 -->
### http协议篇

> [!DANGER|style:flat]  会当凌绝顶！一览众山小！！

首先问一个问题，大部分的时候你应该清楚的的知道：当你在浏览器的地址栏输入一个url按下回车时？浏览器发生了什么？？
 相信这个问题难不倒大多数的朋友： 

##### 一、五层网络模型介绍：
<img src="https://img-blog.csdnimg.cn/20190531141151520.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTY4Njc3OQ==,size_16,color_FFFFFF,t_70"/>

1.  物理层：定义物理设备如何传输数据，网线，网卡，等。<br/>

1.  数据链路层：通讯实体之间建立数据链路链接。<br/>

3.  网络层： 为数据在节点之间传输之间传输创建逻辑链路。比如说我们要访问百度的服务器，我们发送的数据如何传输这一个过程。<br/>

4.  传输层： 为用户提供端到端的服务，常用的是TCP和UDP  ，传输层像高层屏蔽了下层数据通讯的细节。比如说我们在浏览器输入一个地址，这个地址如何解析，最后发送的细节是不需要我们用户来完成的。<br/>

5.  应用层：为应用软件提供服务，构建与TCP协议之上，屏蔽了网络传输的相关细节。<br/>
<p>1、2、3三层是计算机底层的相关封装，是比较底层的知识</p>

##### 二、HTTP 历史：

1. 第一版的定稿版本http0.9 ，只有一个get命令，没有header等数据的信息，服务发送完毕，马上关闭TCP链接。

2. HTTP、1.0  增加了很多命令，增加了status code，header ，增加了多字符集支持，多部分发送，权限，缓存等。

3. HTTP1.1 支持了持久链接，优化了HTTP请求相关，增加了pipeline，同时可以并行处理多个请求，增加了host和其他命令。

4. HTTP2.0 暂时未普及，未来之潮，所有数据按照二进制传输，同一个链接发送多个请求，头信息压缩及推送提高效率。

##### 三、HTTP三次握手：
 <p>1、首先需要创建一个tcpconnection </p>
 <img src="https://img-blog.csdnimg.cn/20190531144535242.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTY4Njc3OQ==,size_16,color_FFFFFF,t_70"/>
 <p>
  http链接创建之前，会用tcp三次握手为确保传输的稳定，客户端发送SYN=1，Seq=X，服务端接收到后返回SYN=1，ACK=X+1,Seq =Y，之后再返回ACK=Y+1，Seq=Z
 </p>
 <img src="https://img-blog.csdnimg.cn/20190531144913208.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTY4Njc3OQ==,size_16,color_FFFFFF,t_70"></img>
 <p>
 在Wireshark中,我们可以清楚地看到这三个过程。
 </p>
 <img src="https://img-blog.csdnimg.cn/20190531150049304.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTY4Njc3OQ==,size_16,color_FFFFFF,t_70"></img>


#####  四、URI  URL URN

1. URI： Unform Resource Identifer /统一资源标志符，用来标志统一的资源信息

2. URL： 统一资源定位器  格式：http://user:pass@host.com:80/path?query=shring#hash  hash寓意代表文档的哪一个片段，锚点。

3. URN：永久统一资源定位符（业内很少使用，暂无成熟的使用方案）

#####  五、HTTP的方法
+ 用来定义语义上对于资源的操作：
  - get 获取数据
  - post 添加数据
  - put修改数据
  - delete删除数据
+ 常见的httpCode 
  - 1——199 操作需继续
  - 200——299 成功
  - 300——399 操作需要重定向
  - 400——499 没有权限
  - 500——599 服务器发生错误

#####  六、HTTP的客户端
 <p>1、最常见的http客户端——各种浏览器 </p>
 <p>2、`crul`命令工具（如下图）等 </p>
 <img src = "https://img-blog.csdnimg.cn/20190602122214449.png">
 这个就是在gitbash命令行中输入
 ```bash
 crul -v baidu.com
 ```

 ###### 七、cros跨域：
  - 为了更加深入的理解这个问题：我们使用nodejs创建了两个服务文件
```js
var http = require('http')
var fs = require('fs')
var server =  http.createServer(function(res,req){
	console.log('requert come',res.url)
	var html = fs.readFileSync('text.html','utf-8')
	console.log(fs)
	console.log(html)
	req.writeHead(200,{
		'Content-Type': 'text/html'
	})
	req.end(html)
})
```
 - server1.js 这里读取一个test.html并发送到客户端默认监听8888端口,在html中我们发送了一个端口为8887端口的请求，看看会发生什么：
 
 ```js
var http = require('http')
var server =  http.createServer(function(res,req){
	console.log('requert come',res.url)
	req.end('123')
	req.writeHead(200,{
		'Access-Control-Origin': ''
	})
}).listen(8887)
console.log('server listening on 8887')
})
```
 - server2.js 
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>aaa </title>
	</head>
	<body>
		<p>asasasa</p>
	</body>
	<script type="text/javascript">
		var xhr = new XMLHttpRequest()
		xhr.open('GET','http://127.0.0.1:8887/')
		xhr.send()
	</script>
</html>
```
 - 启动两个服务后，打开浏览器：
 
<img src = "https://img-blog.csdnimg.cn/20190602123702327.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTY4Njc3OQ==,size_16,color_FFFFFF,t_70">

- 但是我们的服务器依然可以收到本次的request，之后我们在修改一下server2.js

```js
var http = require('http')
 
var server =  http.createServer(function(res,req){
	console.log('requert come',res.url)
	req.writeHead(200,{
		'Access-Control-Allow-Origin': '*'
	})
	req.end('123')
}).listen(8887)
console.log('server listening on 8887')
```
<p>重新启动，就一切正常了</p>
<img src = "https://img-blog.csdnimg.cn/20190602124822548.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTY4Njc3OQ==,size_16,color_FFFFFF,t_70">

!> 1.什么是跨域：通过以上的测试：大家都应该能感受到：浏览器对于不在同域的ajax，会默认拦截。我们需要在服务端设置允许那些ip可以访问我们这个服务。

###  解决跨域

1. 第一种方式是就是在服务端设置'Access-Control-Allow-Origin': * 这是最本质的解决浏览器的方案。设置为*可能会不安全，我们也可以改为指定的域名。

2. 第二种通过jsonp：什么是jsonp呢：我们把server2.js, text.html 修改
```js
req.writeHead(200,{
		'Access-Control-Allow-Origin': '*'
})
```
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>aaa </title>
	</head>
	<body>
		<p>asasasa</p>
	</body>
	<!-- <script type="text/javascript">
		var xhr = new XMLHttpRequest()
		xhr.open('GET','http://127.0.0.1:8887/')
		xhr.send()
	</script> -->
	<script type="text/javascript" src="http://127.0.0.1:8887/">		
	</script>
</html>
```
<p>
重新启动：
</p>
<img src = "https://img-blog.csdnimg.cn/2019060213205848.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTY4Njc3OQ==,size_16,color_FFFFFF,t_70">

> 我们发现这个请求也是可以成功的请求到：这是为什么呢？？原因是浏览器在默认这个情况下对于src  url   link 这些标签或者属性是没有限制的。基于这个特性，我们可以在服务端返回的内容里嵌入一段可执行的代码，来实现跨域的操作。

3. 第三种就是通过浏览器插件来解决：我们在google商店里边搜索cros，可以搜到很多插件，这些插件本质上会拦截所有的请求，并且自动限制请求头。

<img src="https://img-blog.csdnimg.cn/20190602132712103.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTY4Njc3OQ==,size_16,color_FFFFFF,t_70">

4. 在某些场景下给标签加上crossOrgin 属性来解决脚本是否显示错误信息。但有两个条件：一是跨域脚本的服务器必须通过Access-Controll-Allow-Origin 头信息允许当前域名可以获取错误信息，二是当前域名的 script 标签也必须指明 src 属性指定的地址是支持跨域的地址，也就是 crossorigin 属性。crossorigin 属性涉及到网络安全问题；加入允许本地获取到跨域脚本的错误信息那么----我们通过报错信息的不一致，可能可以推断出当前访问的用户的使用痕迹；进而『精准』推送相关的钓鱼网站给他。
