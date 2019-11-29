<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-11-28 09:32:39
 * @LastEditors: suckson
 * @LastEditTime: 2019-11-28 10:05:20
 -->
 
!> IT界知名的程序员曾说：对于那些月薪三万以下，自称IT工程师的码农们，其实我们从来没有把他们归为我们IT工程师的队伍。他们虽然总是以IT工程师自居，但只是他们一厢情愿罢了。

此话一出，不知激起了多少(码农)程序员的愤怒，却又无可奈何，于是码农问程序员。

码农：你知道get和post请求到底有什么区别？

程序员：你看这篇就知道了。

码农：你月薪三万了？

程序员：嗯。

码农：你是怎么做到的？

程序员：我做梦做到的

这个问题几乎面试的时候都会问到，是一个老生常谈的话题，然而随着不断的学习，对于以前的认识有很多误区，所以还是需要不断地总结的，学而时习之，不亦说乎。

关于get和post如果你有条件上百度的话，至少有200百万条结果，每个人都有每个人的思考，当然，这篇也是我的思考，如果有些结论有错误，希望能够喷起来。在批评中不断改进，与诸君共勉一句话：若批评无意义，则赞美无意义。

### http的特点

基于tcp/ip、一种网络应用层协议、超文本传输协议HyperText Transfer Protocol

工作方式： 客户端请求服务端应答的模式

快速：无状态连接

灵活：可以传输任意对象，对象类型由Content-Type标记

客户端请求request消息包括以下格式：请求行（request line）、请求头部（header）、空行、请求数据

服务端响应response也由四个部分组成，分别是：状态行、消息报头、空行、响应正文

### 请求方法

http请求可以使用多种请求方法。

HTTP1.0定义了三种请求方法：GET, POST 和 HEAD方法。

HTTP1.1新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法。

HTTP2.0 新的二进制格式（Binary Format），HTTP1.x的解析是基于文本
。

基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认01的组合。基于这种考虑HTTP2.0的协议解析决定采用二进制格式，实现方便且健壮。

多路复用（MultiPlexing），即连接共享，即每一个request都是是用作连接共享机制的。一个request对应一个id，这样一个连接上可以有多个request，每个连接的request可以随机的混杂在一起，接收方可以根据request的 id将request再归属到各自不同的服务端请求里面。

header压缩，如上文中所言，对前面提到过HTTP1.x的header带有大量信息，而且每次都要重复发送，HTTP2.0使用encoder来减少需要传输的header大小，通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小。

服务端推送（server push），同SPDY一样，HTTP2.0也具有server push功能。
参考链接：https://baike.baidu.com/item/HTTP%202.0/12520156?fr=aladdin

1	GET	请求指定的页面信息，并返回实体主体。

2	HEAD	类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头

3	POST	向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。
4	PUT	从客户端向服务器传送的数据取代指定的文档的内容。

5	DELETE	请求服务器删除指定的页面。

6	CONNECT	HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。

7	OPTIONS	允许客户端查看服务器的性能。

8	TRACE	回显服务器收到的请求，主要用于测试或诊断。

### 我们耳熟能详的的区别

http协议最常见的两种方法GET和POST，这几点答案其实有几点并不准确

请求缓存：GET 会被缓存，而post不会

收藏书签：GET可以，而POST不能

保留浏览器历史记录：GET可以，而POST不能

用处：get常用于取回数据，post用于提交数据

安全性：post比get安全

请求参数：querystring 是url的一部分get、post都可以带上。get的querystring（仅支持urlencode编码），post的参数是放在body（支持多种编码）

请求参数长度限制：get请求长度最多1024kb，post对请求数据没有限制

### get和post误区

针对上面常见的区别，如果面试的时候这么说，肯定是有很大的毛病，刚在学校面试的时候也曾经囫囵吞枣地这样说过，现在回过头再想以前的错误认知，又有许多新的认识。

`误区一`

“用处：get常用于取回数据，post用于提交数据”

曾听到过这样一种说法：get替换post来优化网站性能，虽然这种说法没错，也的确get常被用于取回数据，但是post也被一些ui框架使用于取回数据，比如kendo ui中的grid，就是用post来接受数据的。所以结论是get、post用途也是因地制宜。如果你有使用过kendo UI，会发现分页、过滤、自定义的参数都包含在form data里面。

请求参数


get是querystring（仅支持urlencode编码），post是放在body（支持多种编码）
query参数是URL的一部分，而GET、POST等是请求方法的一种，不管是哪种请求方法，都必须有URL，而URL的query是可选的，可有可无。

`误区二`

“请求参数长度限制：get请求长度最多1024kb，post对请求数据没有限制”

这句话看上去实在没毛病啊，菜鸟教程也是这样说的啊。虽然字面意思上没有错误，但是理解一定要正确。我想说的是GET方法提交的url参数数据大小没有限制，在http协议中没有对url长度进行限制（不仅仅是querystring的长度），这个限制是特定的浏览器及服务器对他的限制

下面就是对各种浏览器和服务器的最大处理能力做一些说明

IE浏览器对URL的最大限制为2083个字符

Firefox (Browser)：对于Firefox浏览器URL的长度限制为65,536个字符。

Safari (Browser)：URL最大长度限制为 80,000个字符。

Opera (Browser)：URL最大长度限制为190,000个字符。

Google (chrome)：URL最大长度限制为8182个字符。

Apache (Server)：能接受最大url长度为8,192个字符。

Microsoft Internet Information Server(IIS)：能接受最大url的长度为16,384个字符。

所以为了符合所有标准，url的最好不好超过最低标准的2083个字符（2k+35）。当然在做客户端程序时，url并不展示给用户，只是个程序调用，这时长度只收web服务器的影响了。对于中文的传递，一个汉字最终编码后的字符长度是9个字符。

最常见的form表单，浏览器默认的form表单，默认的content-type是application/x-www-form-urlencoded,提交的数据会按照key value的方式，jquery的ajax默认的也是这种content-type。当然在post方式中添加querystring一定是可以接收的到，但是在get方式中加body参数就不一定能成功接收到了。

`误区三`

“post比get安全性要高”

这里的安全是相对性，并不是真正意义上的安全，通过get提交的数据都将显示到url上，页面会被浏览器缓存，其他人查看历史记录会看到提交的数据，而post不会。另外get提交数据还可能会造成CSRF攻击。

`误区四`

“GET产生一个TCP数据包；POST产生两个TCP数据包。”

这一点理解起来还是有一定难度的,实际上，不论哪一种浏览器，在发送 POST 的时候都没有带 Expect 头，server 也自然不会发 100 continue。通过抓包发现，尽管会分两次，body 就是紧随在 header 后面发送的，根本不存在『等待服务器响应』这一说。

从另一个角度说，TCP 是传输层协议。别人问你应用层协议里的 GET 和 POST 有啥区别，你回答说这俩在传输层上发送数据的时候不一样，确定别人不抽你？

参考资料：https://zhuanlan.zhihu.com/p/25028045

### 状态码1xx

100 Continue：服务器仅接收到部分请求，但是一旦服务器并没有拒绝该请求，客户端应该继续发送其余的请求。

101 Switching Protocols：服务器转换协议：服务器将遵从客户的请求转换到另外一种协议。

102: 由WebDAV（RFC 2518）：扩展的状态码，代表处理将被继续执行

# 状态码2xx:成功

200 OK：请求成功（其后是对GET和POST请求的应答文档。

201 Created：请求被创建完成，同时新的资源被创建。

202 Accepted：供处理的请求已被接受，但是处理未完成。

203 Non-authoritative Information：文档已经正常地返回，但一些应答头可能不正确，因为使用的是文档的拷贝。

204 No Content：没有新文档。浏览器应该继续显示原来的文档。如果用户定期地刷新页面，而Servlet可以确定用户文档足够新，这个状态代码是很有用的。
205 Reset Content：没有新文档。但浏览器应该重置它所显示的内容。用来强制浏览器清除表单输入内容。

206 Partial Content：客户发送了一个带有Range头的GET请求，服务器完成了它。

# 状态码3xx:重定向

300 Multiple Choices：多重选择。链接列表。用户可以选择某链接到达目的地。最多允许五个地址。

301 Moved Permanently：所请求的页面已经转移至新的url

302 Found：所请求的页面已经临时转移至新的url。

303 See Other：所请求的页面可在别的url下被找到。

304 Not Modified：未按预期修改文档。客户端有缓冲的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档）。服务器告诉客户，原来缓冲的文档还可以继续使用。

305 Use Proxy：客户请求的文档应该通过Location头所指明的代理服务器提取。

306 Unused：此代码被用于前一版本。目前已不再使用，但是代码依然被保留。

307 Temporary Redirect：被请求的页面已经临时移至新的url。

# 状态码4xx:客户端错误

400 Bad Request：服务器未能理解请求。

401 Unauthorized：被请求的页面需要用户名和密码。

401.1：登录失败。

401.2：服务器配置导致登录失败。

401.3：由于 ACL 对资源的限制而未获得授权。

401.4：筛选器授权失败。

401.5：ISAPI/CGI 应用程序授权失败。

401.7：访问被 Web 服务器上的 URL 授权策略拒绝。这个错误代码为 IIS 6.0 所专用。

402 Payment Required：此代码尚无法使用。

403 Forbidden：对被请求页面的访问被禁止。

404 Not Found:服务器无法找到被请求的页面。

405 Method Not Allowed:请求中指定的方法不被允许。

406 Not Acceptable:服务器生成的响应无法被客户端所接受。

407 Proxy Authentication Required:用户必须首先使用代理服务器进行验证，这样请求才会被处理。

408 Request Timeout:请求超出了服务器的等待时间。

409 Conflict:由于冲突，请求无法被完成。

410 Gone:被请求的页面不可用。

411 Length Required:“Content-Length” 未被定义。如果无此内容，服务器不会接受请求。

412 Precondition Failed:请求中的前提条件被服务器评估为失败。

413 Request Entity Too Large:由于所请求的实体的太大，服务器不会接受请求。

414 Request-url Too Long:由于url太长，服务器不会接受请求。当post请求被转换为带有很长的查询信息的get请求时，就会发生这种情况。

415 Unsupported Media Type:由于媒介类型不被支持，服务器不会接受请求。

416 Requested Range Not Satisfiable:服务器不能满足客户在请求中指定的Range头。

417 Expectation Failed:执行失败。

423:锁定的错误。

# 状态码5** 服务端错误

500 Internal Server Error：请求未完成。服务器遇到不可预知的情况。

501 Not Implemented：请求未完成。服务器不支持所请求的功能。

502 Bad Gateway：请求未完成。服务器从上游服务器收到一个无效的响应。

503 Service Unavailable：请求未完成。服务器临时过载或宕机。

504 Gateway Timeout：网关超时。

505 HTTP Version Not Supported：服务器不支持请求中指明的HTTP协议版本。


