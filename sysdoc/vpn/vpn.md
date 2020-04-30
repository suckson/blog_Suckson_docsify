<div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16  font__weight-light brk-library-rendered rendered show">
    <span class="sr-only">Close</span> 
    <i class="start-icon far fa-check-circle faa-tada animated"></i>
    作为一个有技术追求的码农，肯定不想仅仅局限于自己的工地搬砖。为了突破限制，总结了此篇，欢迎批评指正，欢迎在issues里面提出问题。
  </div>
<p>&nbsp;</p>

### 科学上网之 `V2ray`的使用

`[v2ray]`(https://github.com/v2ray/v2ray-core)

#### 1. 购买
  
  这个就不需要过多的介绍了吧，自己搭建私服没有服务器怎么能行，推荐给大家一个云服务商`搬瓦工(Bandwagon Host)`看他们的产品相信你就懂了，不需要内存，不需要硬盘，我要的就是流量和网速。[点此链接可以优惠购买](https://bandwagonhost.com/aff.php?aff=59671)

### 2. 补充一些知识
  - 正向代理 vs 反向代理  怎么定义这个正向反响，首先我觉得要明确一个对象，这个是相对与服务器本身。  如果是将自己的内部服务代理出去，别人能够看到。比如我们内部的数据库mysql 一般监听的端口为3306，而我们一般不会将3306直接暴露出来，而是通过nginx 监听80端口，然后转发3306端口的请求。相对于外部请求直接访问3306端口是没有效果的。而正向代理则是指，将一个请求请求的内容原封不动返还给我。比如说科学上网，我们在发出一个我们访问不了的ip请求到一个服务器，服务器收到这个请求后会替我们去代理这个请求继续请求，最后服务器收到数据后再将数据返还给我们。

 - V2Ray是一个网络转发程序，支持 TCP、mKCP、WebSocket 这3种底层传输协议，支持HTTP、Socks、Shadowsocks、VMess这4种内容传输协议（HTTP只支持传入），并且有完整的TLS实现。
 
 - shadowsocks是Shadowsocks 是一款著名的 SOCKS5 代理工具。[深入了解](https://loggerhead.me/posts/shadowsocks-yuan-ma-fen-xi-xie-yi-yu-jie-gou.html)

 - vmess协议  VMess 是 V2Ray 原创的加密通讯协议。 [深入了解Vmess](https://www.v2ray.com/developer/protocols/vmess.html)

 - [V2ray官网](https://www.v2ray.com/)

### 2. Server搭建
  
  1. 下载v2ray安装，你可以选择源码编译安装，或者自己下载已经编译好的安装包。源码编译需要Go的环境。[下载链接](https://github.com/v2ray/v2ray-core/releases)


  2. 启动V2ray，需要配置v2ray的config.json。这里记录一下重点的命令：

  ```bash
    getconf LONG_BIT    查看cpu的型号
    systemctl –version  查看是否支持Systemctl
    sudo chmod +x /etc/init.d/v2ray #更改权限  
    sudo update-rc.d v2ray defaults #设置开机启动
  
    //// SYSTEMD 启动方式
    sudo vim /etc/systemd/system/v2ray.service
    [Unit]
    Description=V2ray deamon

    [Service]
    Type=simple
    ExecStart=/home/username/project/v2ray/v2ray[Install]
    WantedBy=multi-user.target

    // 修改路径为你的程序位置，注意此处需要绝对路径，接着执行下面命令来启用：
    sudo systemctl enable v2ray
    sudo systemctl daemon-reload
    sudo systemctl start v2ray

    // 大功告成，你可以通过下列命令停止或重新运行 V2ray：
    sudo systemctl stop v2ray
    sudo systemctl restart v2ray
  ``` 
  !> 这里是v2ray的config.json, 其中屏蔽了很多cnd服务器。

  ```json
    {
      "log": {
        "access": "/var/log/v2ray/access.log",
        "error": "/var/log/v2ray/error.log",
        "loglevel": "warning"
      },
      "inbound": {
        "port": youPort,
        "protocol": "vmess",
        "listen": "127.0.0.1", // 监听127.的回环地址
        "settings": {
          "clients": [{
              "id": "ID",
              "level":  这里写你的level,
              "alterId": 64
            }
          ]
        },
        "streamSettings": {
          "network": "ws",
          "wsSettings": {
            "connectionReuse": true,
            "path": "/v2ray"
          }
        }
      },
      "outbound": {
          "protocol": "freedom",
          "settings": {},
          "tag": "direct"
        }, 
      "outboundDetour": [{
          "protocol": "blackhole",
          "settings": {},
          "tag": "blocked"
        }]
      ,
      "routing": {
        "strategy": "rules",
        "settings": {
          "rules": [{
              "type": "field",
              "ip": [
                "0.0.0.0/8",
                "10.0.0.0/8",
                "100.64.0.0/10",
                "127.0.0.0/8",
                "169.254.0.0/16",
                "172.16.0.0/12",
                "192.0.0.0/24",
                "192.0.2.0/24",
                "192.168.0.0/16",
                "198.18.0.0/15",
                "198.51.100.0/24",
                "203.0.113.0/24",
                "::1/128",
                "fc00::/7",
                "fe80::/10"
              ],
              "outboundTag": "blocked"
            }
          ]
        }
      }
    }
  ```


  需要支持sockdows协议的朋友可以使用下面的配置,json格式要求非常严格，在使用时务必删掉注释。

  ```json
  "inboundDetour": [
    {
      "protocol": "shadowsocks",
      "port": 30001, // 监听 30001 端口
      "settings": {
        "method": "aes-256-cfb", 
        "password": "v2ray",     // 密码，必须和客户端相同
        "udp": false             // 是否开启 UDP 转发
      }
    }
  ]
  ```
  3. 配置nginx反向代理，这里注意是要配置成websocket协议的请求头[了解websocket](http://www.ruanyifeng.com/blog/2017/05/websocket.html)
  
  ```conf
  location /bonjour(v2ray里面配置的path) {
   proxy_redirect       off;
            proxy_pass           http://(你v2ray配置里面监听的地址，一般都是127.0.0.1回环地址，因为用nginx转发，不需要监听特定网卡):(端口);
            proxy_http_version   1.1;
            proxy_set_header     Upgrade $http_upgrade;
            proxy_set_header     Connection "upgrade";
            proxy_set_header     Host $http_host;
  }
  ```

  ### 客户端

  这里主要就是从之前的下载V2Ray服务端的网站，下载Windows抑或是其他适合自己目前系统的客户端（客户端和服务端是一体的），你也可以下载使用带有图形化界面的第三方客户端。在配置中如果没其他变动，配置文件中也就改个IP就能用了,原本IP也需要相同，但是如果服务端没有修改是默认的，那么客户端也无需修改。之后在浏览器也需要个扩展插件配合，Chrome的扩展Omega或者Firefox的Autoproxy，其中配置成socks 127.0.0.1:1080就好了。如果在服务端配置中还加上Shadowsocks的支持，那么也可以直接使用Shadowsocks的客户端。
  
  安卓Android安卓上已经出了Actinium和实验版本的V2Ray这两个相关客户端了，可以直接去Google Play下载安装，附图：
  <img src="https://zshttp.com/wp-content/uploads/2019/04/5ed1acacba33e8e.jpg">


  Windows客户端配置：
  <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/36DFF9EA5DABB0BEC31F6ACAF690853C.jpg">


  mac客户端[下载链接](https://github.com/yanue/V2rayU/releases)
    <img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/C9A79E3899CDBDAA1EE7E420B5586369.jpg">




  