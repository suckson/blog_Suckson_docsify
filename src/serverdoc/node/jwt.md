<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-10-24 13:44:05
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-27 20:05:38
 -->
#### koa-jwt的使用

> 是命运的安排也好，是你存心的捉弄也好---

----在前后端分离的开发中，通过` Restful API `进行数据交互时，如果没有对 API 进行保护，那么别人就可以很容易地获取并调用这些 API 进行操作。那么服务器端要如何进行鉴权呢？

Json Web Token 简称为 JWT，它定义了一种用于简洁、自包含的用于通信双方之间以 JSON 对象的形式安全传递信息的方法。JWT 可以使用 HMAC 算法或者是 RSA 的公钥密钥对进行签名。


### 1. 那么到底要怎么进行认证呢？

<img src="https://suckosn-blog.oss-cn-hangzhou.aliyuncs.com/imgsys/jwt.png">

首先用户登录时，输入用户名和密码后请求服务器登录接口，服务器验证用户名密码正确后，生成token并返回给前端，前端存储token，并在后面的请求中把token带在请求头中传给服务器，服务器验证token有效，返回正确数据。

既然服务器端使用 Koa2 框架进行开发，除了要使用到 jsonwebtoken 库之外，还要使用一个 koa-jwt 中间件，该中间件针对 Koa 对 jsonwebtoken 进行了封装，使用起来更加方便。下面就来看看是如何使用的。

### 2.成tocken

```js
const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');

router.post('/login', async (ctx) => {
	const data = ctx.request.body;
	if(!data.name || !data.password){
		return ctx.body = {
			code: '000002',
			data: null,
			msg: '参数不合法'
		}
	}
	const result = await userModel.findOne({
		name: data.name,
		password: data.password
	})
	if(result !== null){
		const token = jwt.sign({
			name: result.name,
			_id: result._id
		}, 'my_token', { expiresIn: '2h' });
		return ctx.body = {
			code: '000001',
			data: token,
			msg: '登录成功'
		}
	}else{
		return ctx.body = {
			code: '000002',
			data: null,
			msg: '用户名或密码错误'
		}
	}
});

module.exports = router;
```

### 3.验证token

通过 koa-jwt 中间件来进行验证，用法也非常简单

```js
const koa = require('koa');
const koajwt = require('koa-jwt');
const app = new koa();

// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
      		ctx.body = 'Protected resource, use Authorization header to get access\n';
        }else{
            throw err;
        }
    })
})

app.use(koajwt({
	secret: 'my_token'
}).unless({
	path: [/\/user\/login/]
}));
通过 app.use 来调用该中间件，并传入密钥 {secret: 'my_token'}，unless 可以指定哪些 URL 不需要进行 token 验证。token 验证失败的时候会抛出401错误，因此需要添加错误处理，而且要放在 app.use(koajwt()) 之前，否则不执行。
```
如果请求时没有token或者token过期，则会返回401。


#### koa-jwt源码分析

我们上面使用 jsonwebtoken 的 sign() 方法来生成 token 的，那么 koa-jwt 做了些什么帮我们来验证 token。
```js
const jwt = require('jsonwebtoken');

module.exports = (...args) => {
    return new Promise((resolve, reject) => {
        jwt.verify(...args, (error, decoded) => {
            error ? reject(error) : resolve(decoded);
        });
    });
};

```
> 在 verify.js 中，使用 jsonwebtoken 提供的 verify() 方法进行验证返回结果。jsonwebtoken 的 sign() 方法来生成 token 的，而 verify() 方法则是用来认证和解析 token。如果 token 无效，则会在此方法被验证出来。

```js
module.exports = function resolveAuthorizationHeader(ctx, opts) {
    if (!ctx.header || !ctx.header.authorization) {
        return;
    }
    const parts = ctx.header.authorization.split(' ');
    if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];
        if (/^Bearer$/i.test(scheme)) {
            return credentials;
        }
    }
    if (!opts.passthrough) {
        ctx.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
    }
};
```

> 在 index.js 中，调用 verify.js 的方法进行验证并解析 token，拿到上面进行 sign() 的数据 {name: result.name, _id: result._id}，并赋值给 ctx.state.user，在控制器中便可以直接通过 ctx.state.user 拿到 name 和 _id。

#### 安全性

- 如果 JWT 的加密密钥泄露的话，那么就可以通过密钥生成 token，随意的请求 API 了。因此密钥绝对不能存在前端代码中，不然很容易就能被找到。

- 在 HTTP 请求中，token 放在 header 中，中间者很容易可以通过抓包工具抓取到 header 里的数据。而 HTTPS 即使能被抓包，但是它是加密传输的，所以也拿不到 token，就会相对安全了。