<div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16  font__weight-light brk-library-rendered rendered show">
    <span class="sr-only">Close</span> 
    <i class="start-icon far fa-check-circle faa-tada animated"></i>
    作为一个有技术追求的码农，肯定不想仅仅局限于自己的工地搬砖。为了突破限制，总结了此篇，欢迎批评指正，欢迎在issues里面提出问题。
  </div>
<p>&nbsp;</p>

### 科学上网之 `V2ray`的使用

#### 1. 购买
  
  这个就不需要过多的介绍了吧，自己搭建私服没有服务器怎么能行，推荐给大家一个云服务商`搬瓦工(Bandwagon Host)`看他们的产品相信你就懂了，不需要内存，不需要硬盘，我要的就是流量和网速。[点此链接可以优惠购买](https://bandwagonhost.com/aff.php?aff=59671)

#### 2. 补充一些知识
  - 正向代理 vs 反向代理  怎么定义这个正向反响，首先我觉得要明确一个对象，这个是相对与服务器本身。  如果是将自己的内部服务代理出去，别人能够看到。比如我们内部的数据库mysql 一般监听的端口为3306，而我们一般不会将3306直接暴露出来，而是通过nginx 监听80端口，然后转发3306端口的请求。相对于外部请求直接访问3306端口是没有效果的。而正向代理则是指，将一个请求请求的内容原封不动返还给我。比如说科学上网，我们在发出一个我们访问不了的ip请求到一个服务器，服务器收到这个请求后会替我们去代理这个请求继续请求，最后服务器收到数据后再将数据返还给我们。

 - V2Ray是一个网络转发程序，支持 TCP、mKCP、WebSocket 这3种底层传输协议，支持HTTP、Socks、Shadowsocks、VMess这4种内容传输协议（HTTP只支持传入），并且有完整的TLS实现。
 
 - shadowsocks是Shadowsocks 是一款著名的 SOCKS5 代理工具。[深入了解](https://loggerhead.me/posts/shadowsocks-yuan-ma-fen-xi-xie-yi-yu-jie-gou.html)

 - vmess协议  VMess 是 V2Ray 原创的加密通讯协议。 [深入了解Vmess](https://www.v2ray.com/developer/protocols/vmess.html)

#### 2. Server搭建

  