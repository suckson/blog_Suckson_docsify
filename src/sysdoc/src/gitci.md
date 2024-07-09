<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-11-01 11:13:27
 * @LastEditors: suckson
 * @LastEditTime: 2019-11-01 12:39:06
 -->
### 基于github的持续集成

!>  我没能看到灿烂的时节

>作为一个开发者，最讨厌的事情莫过于重复的做一件无味的事情！！像部署这种工作，我们完全可以用代码解脱我们的双手！

### 简单来了解webhook

  类似于事件监听，当我们push的时候可以用githook 触发一些事件。登录自己的githook，在自己的开源项目中这样设置。


<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/img/webhooks.png">


这样设置后我们在push代码后，github会发送一个请求到我们的服务器。我们通过处理这个请求来同步我们的代码。
 


### 服务器处理请求

这里我使用node处理这个请求,这里用到了`github-webhook-handler`,最好初始化一个node的新项目，专门负责处理同步服务器的代码。

```js
var http = require('http')
var spawn = require('child_process').spawn
var createHandler = require('github-webhook-handler')
var handler = createHandler({
  path: '/pushCode',
  secret: '*******'
})
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location')
  })
}).listen(8083)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
   runProcess('sh', ['./deployed.sh'], function (txt) {  // 这里运行我们的脚本，spawn = require('child_process')是个内置的进程的对象
    console.log(txt)
  })
})

function runProcess(cmd, args, callback) {
  var child = spawn(cmd, args)
  var response = ''
  child.stdout.on('data', function (buffer) {
    response += buffer.toString()
  })
  child.stdout.on('end', function () {
    callback(response)
  })
}
```

```bash
cd /usr/local/project/node-blog-server/views/blog_Suckson_docsify/

git pull origin master
```

.sh脚本就是去指定目录下运行指定的命令了，我们去`/usr/local/project/node-blog-server/views/blog_Suckson_docsify/`目录下拉取我们的最新项目。这里主要服务器的仓库要提前初始化好，怎么配置git这里就不细论了。

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/img/gitci.png">
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/img/gitlabci2.png">

项目成功的push并且部署成功。

### 注意！！
如果中间脚本没有执行，要检查该`权限`和`脚本`的编码，为什么，请看操作系统的相关文章。用到下面的命令:
```bash
# 提升权限
chmod +x deployed.sh
# 设置编码
vim lnmp.sh    --------打开此文件
:set ff=unix(或者:set fileformat=unix)  
```