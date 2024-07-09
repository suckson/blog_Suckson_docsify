<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-24 21:30:50
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-24 22:27:28
 -->
### JS前世今生~

!> 三百六十路呦，越过春夏秋冬。

> 在这个世纪之交诞生的 JavaScript，没人想到会发展为当今世界上最流行的语言之一。它不够成熟，不够严肃，甚至连名字都是模仿的 Java。那么，JavaScript 的成功是依靠运气和完美时机的侥幸吗？其实不然——即使技术不具备卓越的影响力，但事实证明，只要足够好用就可以了。

如果你在19世纪到20世纪预测，javaScript是世界上最流行的语言，那么你要么会被误以为要么是个疯子，要么是个理想家。

在世纪之交的javaScript不能像专业的语言那样工作，他甚至没有被设计成严格的语法，毕竟，web开发者已经有了喜欢他们熟练的开发工具。那就是Java，通过applet嵌入系统。

但是在1995年，网络浏览器先驱网景（Netscape）公司意识到，他们需要为人们提供一个更简单的选择。那时候他们处境艰难，与微软的市场大战正在紧锣密鼓，即将与Sun微系统公司达成重大战略合作伙伴关系，时间紧迫。他们雇佣了布兰登·艾奇（Brendan Eich），要求他尽可能快地创造一种新的语言。他在10天内就完成了JavaScript的第一个版本，正好赶上了这个漂亮的浏览器：

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/jshistory/js.png" />
<p style="text-align:center;color:#ccc;">Netscape 2: JavaScript的首次登场</p>

艾奇真正想做的是构建一个像Scheme这样的学术编程语言的浏览器托管版本（网页脚本语言），但网景公司的愿景与此不同。他们想要一种看上去与Java足够相似，即使它的行为和Java不一样的语言。两个类似的名字：Java和JavaScript，导致了多年的混乱。

> *我是根据公司高层指令开发这门语言，让它看上去和Java足够相似，但又不要让它太大。它只是有那么点儿像这种愚蠢语言的弟弟，对吧？* <p style="text-align:right;color:#ccc;">——布兰登·艾奇</p>

##### 一、滚动按钮时代

在它诞生后的前五年时间里，Javascript填补了那些不擅长Java编程的人的空白。这些人包括一些编程外行、业余爱好者和匆忙做些简单编程的人，也包括网页设计师这个新的技术工人阶层。他们的工作是使网页用户界面看起来时髦漂亮和图形化，他们追求一种比<blink>标签更精致，比旋转球体GIF图像看上去更现代的效果。
而在专业领域，JavaScript的主要工作是创建一种用户界面粘合剂，将设计好的网页粘在一起。每次你需要一个交互按钮，一个弹出菜单，一个立体图像效果，你都需要JavaScript。
那么谁想要一个翻转按钮呢？答案是：所有人。</br>
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/jshistory/js2.gif"  style="display:block;margin: 0 auto"/>
<p style="text-align:center;color:#ccc;">2000年左右的翻滚按钮</p>

##### 二、沙箱（Sandbox）囚徒

今天，当人们批评JavaScript时，通常是基于其语言本身的局限性：打了补丁的OOP特性，弱类型安全性，笨重的DOM模型，对“==”和“===”的困惑，等等。但这些并不是JavaScript在其早期被看作一门糟糕的编程工具的原因。毕竟，有许多丑陋的编程语言（包括BASIC，COBOL，SQL和 PHP），因为它们出现在正确的时间和正确的地点，而变得至关重要。JavaScript作为所有Web浏览器原生本机支持的唯一语言，出现在整个世界都被网站接管的时间点，它绝对属于在正确的时间出现在正确的位置的情形。

JavaScript的真正局限性是沙箱：一种可以将代码固定到合适位置的严格控制的环境——沙箱将JavaScript与桌面世界隔离。例如，JavaScript代码无法直接访问文件系统、显示器或任何硬件资源。更严重的是，它隔离了JavaScript和Web服务器上的所有资源，比如存储客户列表和产品目录的数据库，以及运行业务逻辑的服务器端代码。被完全孤立的JavaScript，除了在页面上摆弄按钮之外，几乎没有什么其它能做，这一点也不令人奇怪。
##### 二、使用XMLHttpRequest打开管道

今天，当人们批评JavaScript时，通常是基于其语言本身的局限性：打了补丁的OOP特性，弱类型安全性，笨重的DOM模型，对“==”和“===”的困惑，等等。但这些并不是JavaScript在其早期被看作一门糟糕的编程工具的原因。毕竟，有许多丑陋的编程语言（包括BASIC，COBOL，SQL和 PHP），因为它们出现在正确的时间和正确的地点，而变得至关重要。JavaScript作为所有Web浏览器原生本机支持的唯一语言，出现在整个世界都被网站接管的时间点，它绝对属于在正确的时间出现在正确的位置的情形。

JavaScript的真正局限性是沙箱：一种可以将代码固定到合适位置的严格控制的环境——沙箱将JavaScript与桌面世界隔离。例如，JavaScript代码无法直接访问文件系统、显示器或任何硬件资源。更严重的是，它隔离了JavaScript和Web服务器上的所有资源，比如存储客户列表和产品目录的数据库，以及运行业务逻辑的服务器端代码。被完全孤立的JavaScript，除了在页面上摆弄按钮之外，几乎没有什么其它能做，这一点也不令人奇怪。

奇怪的是，有确实的证据表明确实是微软拯救了JavaScript。但不是今天的这个在每个操作系统上都拥抱开源开发的微软，而是那个赤裸裸的反开源的斗士，和以“拥抱，扩展和消灭”的理念消灭其竞争对手的微软。
事情是这样发生的。大约就在全世界都在疯狂使用滚动按钮的同时，微软的一个团队正在研究一种使Outlook的Web前端更具响应性的方法。他们正在构建一个名为Outlook Web Access的产品，其外观如下：

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/jshistory/js3.gif"  style="display:block;margin: 0 auto"/>
<p style="text-align:center;color:#ccc;">2000年的Outlook Web Access</p>

微软团队的目标相对温和。他们想构建一个比在浏览器中运行更高效的电子邮件阅读器，最重要的是，他们不想每隔几秒钟刷新整个页面。因此，他们正在研究一种让网页在后台悄悄地检查新邮件的技术。这一目标可能看起来并不惊天动地，但请记住，Gmail在那时候还没有发明出来。而事实上，那时的整个谷歌公司也才只有几年的历史。
微软团队用一个名为XMLHttpRequest的ActiveX组件创建了一个小的管道系统。XMLHttpRequest的基本思想很简单，它为JavaScript代码提供了一种生成Web请求的方法。就像一个Web浏览器可以联系一个Web服务器并发出一个请求一样（例如，“嘿，请把那个页面给我！”），JavaScript代码可以使用XMLHttpRequest对象发出自己的请求（例如，“嘿，请再给我发些邮件”）。
突然间，一个网页就可以使用Web服务器的所有资源了。需要数据库中的一些数据吗？请呼叫服务器并请求它发送。需要服务器执行一个计算，一个安全测试，一个超级机密验证检查吗？请呼叫服务器并请求它执行。最重要的是，这些“呼叫”都发生在后台，前台页面保持不变。
XMLHttpRequest并非没有奇怪之处。首先，它的命名很奇怪，大小写不一致，在像JavaScript这样的区分大小写的语言中，这是一件令人头痛的事。其次，这个名称表明你的代码发送和接收的是XML格式的消息。然而事实上，消息几乎可以是任何格式：普通文本、HTML块或序列化为JSON的JavaScript对象。但是，最大的问题可能是XMLHttpRequest对象是使用ActiveX构建的，这意味着它只能用于Windows计算机，而且只能在Internet Explorer中工作。
但是这些奇怪之处都没有阻止它前进。在短短的几年内，其他浏览器都提供了自己的XMLHttpRequest实现：同样的对象，但没有任何ActiveX的难题。
尽管创建了XMLHttpRequest对象，但微软在他们自己的Web开发中迟迟没有充分使用它。他们不愿将它用于基于Web的公共电子邮件系统Hotmail，相反，他们一直等待，直到谷歌首先在2004年的Gmail，然后在2005年的谷歌地图中使用XMLHttpRequest并震惊了Web开发世界。这是一个真正的圣杯：基于Web的程序，具备了桌面应用程序的响应能力。
<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/jshistory/jsditu.jpeg"  style="display:block;margin: 0 auto"/>
<p style="text-align:center;color:#ccc;">2005年的谷歌地图</p>

##### 四、 现代化之路

XMLHttpRequest是改变JavaScript进程的关键因素。然而，在那之后还有几个拐点。

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/jshistory/js4.jpeg"  style="display:block;margin: 0 auto"/>
多年来，JavaScript语言一直停滞不前。问题在于，市场领先的Web浏览器Internet Explorer的升级是基于操作系统升级的时间尺度。也就是说，Internet Explorer升级速度非常缓慢，开发人员被迫编写检查浏览器版本的代码，并尝试动态适应。
2006年，开发人员获得了jQuery形式的解决方案。尽管jQuery今天已经过时了，但在10年前，如果你想花时间构建功能而不是解决浏览器兼容性问题，它是一个必不可少的工具。

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/jshistory/js5.png"  style="display:block;margin: 0 auto"/>
2008年，谷歌发布了一个名为V8的新JavaScript引擎。就像jQuery首次为开发人员提供了广泛的兼容性一样，V8也给他们带来了惊人的性能。而且因为V8引擎是一个独立的开源组件，其他项目也可以使用它。稍后，这将为Node.js和Electron等创新打开大门。

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/jshistory/js6.png"  style="display:block;margin: 0 auto"/>
2008年的晚些时候，HTML5的第一份工作草案出现了。HTML5本身并不是关于JavaScript的，但它与新一波的JavaScript API结合在了一起。突然间，开发人员拥有了用于存储本地数据，管理浏览器历史记录，使用音频和运行后台任务的工具。这些再一次缩小了Web功能和桌面功能之间的差距。
<br/>
<br/>

##### 四、 现代JavaScript

  JavaScript的成功是否是其在浏览器中的特权地位的必然结果？还是依靠运气和完美时机的侥幸？
有一点是肯定的：JavaScript是在压力下获得成功的。在它面世以后的大部分时间里，JavaScript没有成为任何人的最爱。很多人先是支持Java小程序，然后是Flash，甚至Silverlight。但JavaScript面对这些挑战者，并彻底击败了它们。
也许最公平的评价是，JavaScript证明了每个开发人员在内心深处都明白的道理。也就是说，对一项新技术来说，最重要的因素是它的影响力。如果你的技术具有卓越的影响力，它就不需要从成为最好的开始，只要足够好就可以了。
Javascript的未来将会沿着一条快速发展的道路延伸。现在，我们有运行在Web服务器上的JavaScript（多亏了`Node.js`），和支持桌面应用程序（多亏了Node.js和`Electron`）的JavaScript。我们有类似于JavaScript的TypeScript语言，它能够编译成JavaScript，让开发人员能够在不损害其道德的情况下为网页编写代码。在未来，`WebAssembly`可能会彻底打破语言限制，让开发人员可以通过支持JavaScript引擎来使用他们想要的任何更高级的语言。
是时候承认了，尽管JavaScript有很多漏洞和不一致之处，但它是最伟大的开发语言之一。布兰登·艾奇将JavaScript置入Netscape Navigator中，我们把整个世界塞进了浏览器，结果造就了现代的互联网世界.


> *永远相信JavaScript（Always bet on JavaScript）。* <p style="text-align:right;color:#ccc;">——布兰登·艾奇</p>

- 附：[原文链接](https://medium.com/young-coder/how-javascript-grew-up-and-became-a-real-language-17a0b948b77f) ——————2019-9-24 柴小恒译(杭州),
不当之处，还请联系作者批评指正。