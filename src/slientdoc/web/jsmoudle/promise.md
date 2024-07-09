<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-10-19 20:46:04
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-20 01:09:45
 -->
!> 一颗心可以破碎，但是不可活受罪。

>在JavaScript的世界中，所有代码都是单线程执行的。由于这个“缺陷”，导致JavaScript的所有网络操作，浏览器事件，都必须是异步执行。异步执行可以用回调函数实现,但是这种实现往往是代码往往不够优雅，此时Primose对象应运而生~~

> 用什么总结一下Primose对象的呢：`一个类似古人云：“君子一诺千金”，这种“承诺将来会执行”的对象在JavaScript中称为Promise对象。`
<p>&nbsp;</p>

##### Promise特点

1. 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

```js
// 在没有prmise之前 ajax 通常都是这么写的
var $ = {
  ajax: function(funSuccess, funFail){
      suceess: funSuccess(),
      error: funFail()
  }
}

// 调用： 
$.ajax(
  success: function(){
    alert('成功')
  },
  error: function(){
    alert('失败')
  }
)

// 有了Prmise之后就可以:
var $ = {
  ajax: function(){
    return new Promise(function(reslove, reject){
      if(error){
        reject(error)
      }
      reslove()
    })
  }
}

// 调用：
$.ajax().then(function(){
   alert('成功')
}).catch(function(){
   alert('失败')
})
```

js封装ajax的原生案例：
```js
'use strict';

// ajax函数将返回Promise对象:
function ajax(method, url, data) {
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.status);
                }
            }
        };
        request.open(method, url);
        request.send(data);
    });
}
// 调用
var log = document.getElementById('test-promise-ajax-result');
var p = ajax('GET', '/api/categories');
p.then(function (text) { // 如果AJAX成功，获得响应内容
    log.innerText = text;
}).catch(function (status) { // 如果AJAX失败，获得响应代码
    log.innerText = 'ERROR: ' + status;
});
```
<p>&nbsp;</p>

#### Promise中`all()`、`race()`的使用：

1. all方法，该方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后并且执行结果都是成功的时候才执行回调。

```js
Promise
		.all([promiseObject1(), promiseObject2(), promiseObject3()])
		.then(function(results){
			console.log(results);
		});
```

2. all是等所有的异步操作都执行完了再执行then方法，那么race方法就是相反的，谁先执行完成就先执行回调。

```js
function requestImg(){
    var p = new Promise(function(resolve, reject){
        var img = new Image();
        img.onload = function(){
            resolve(img);
        }
        img.src = 'xxxxxx';
    });
    return p;
}
//延时函数，用于给请求计时
function timeout(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('图片请求超时');
        }, 5000);
    });
    return p;
}
Promise
.race([requestImg(), timeout()])
.then(function(results){
    console.log(results);
})
.catch(function(reason){
    console.log(reason);
});
```

`requestImg函数`会异步请求一张图片，我把地址写为"xxxxxx"，所以肯定是无法成功请求到的。timeout函数是一个延时5秒的异步操作。我们把这两个返回Promise对象的函数放进race，于是他俩就会赛跑，如果5秒之内图片请求成功了，那么遍进入then方法，执行正常的流程。如果5秒钟图片还未成功返回，那么timeout就跑赢了，则进入catch，报出“图片请求超时”的信息。 
