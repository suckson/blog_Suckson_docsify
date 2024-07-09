<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-10-13 22:44:34
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-13 23:20:35
 -->
### ServiceWork概述

> 确实，这是个充斥着焦虑和选择的时段，请戒骄戒躁，生活再坏，也不会坏到哪去，相信未来，相信未来人们的眼睛——朋友！！这次是真的不打扰了！！

#### 一、是什么？？？

  Service Worker本质上充当`Web应用程序`与`浏览器`之间的`代理服务器`，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API。

  - `Service Worker`的本质是一个 `Web Worker`，它独立于JavaScript主线程，因此它不能直接访问DOM，也不能直接访问window对象，但是，Service Worker可以访问navigator对象，也可以通过消息传递的方式（postMessage）与JavaScript主线程进行通信。
  - `Service Worker`是一个网络代理，它可以控制Web页面的所有网络请求。
  - `Service Worker`具有自身的`生命周期`，使用好Service Worker的关键是`灵活控制`其生命周期。

#### 二、 做什么？
 
  - 用于浏览器缓存
  - 实现离线Web APP
  - 消息推送

#### 三、怎么用？？？

```js
(function() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
    }
})()
```
```js
elf.addEventListener('error', function(e) {
  self.clients.matchAll()
    .then(function (clients) {
      if (clients && clients.length) {
        clients[0].postMessage({ 
          type: 'ERROR',
          msg: e.message || null,
          stack: e.error ? e.error.stack : null
        });
      }
    });
});

self.addEventListener('unhandledrejection', function(e) {
  self.clients.matchAll()
    .then(function (clients) {
      if (clients && clients.length) {
        clients[0].postMessage({
          type: 'REJECTION',
          msg: e.reason ? e.reason.message : null,
          stack: e.reason ? e.reason.stack : null
        });
      }
    });
})

importScripts('https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js');
workbox.setConfig({
  debug: true,
  modulePathPrefix: 'https://g.alicdn.com/kg/workbox/3.3.0/'
});

//直接激活跳过等待阶段
workbox.skipWaiting();
workbox.clientsClaim();
//定义要缓存的html
var cacheList = [
  '/',
  '/tbhome/home-2017',
  '/tbhome/page/market-list'
];
//html采用networkFirst策略，支持离线也能大体访问
workbox.routing.registerRoute(
  function(event) {
    // 需要缓存的HTML路径列表
    if (event.url.host === 'www.taobao.com') {
      if (~cacheList.indexOf(event.url.pathname)) return true;
      else return false;
    } else {
      return false;
    }
  },
  workbox.strategies.networkFirst({
    cacheName: 'tbh:html',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
);
```

```js
/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-29 13:44:00
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-29 13:44:00
 */
'use strict';
//需要缓存的资源列表
var precacheConfig = [
    ["https://static.ws.126.net/163/wap/f2e/milk_index/bg_img_sm_minfy.png",
        "c4f55f5a9784ed2093009dadf1e954f9"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/change.png",
        "9af1b102ef784b8ff08567ba25f31d95"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/icon-download.png",
        "1c02c724381d77a1a19ca18925e9b30c"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/icon-login-dark.png",
        "b59ba5abe97ff29855dfa4bd3a7a9f35"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/icon-refresh.png",
        "a5b1084e41939885969a13f8dbc88abd"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/icon-video-play.png",
        "065ff496d7d36345196d254aff027240"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/icon.ico",
        "a14e5365cc2b27ec57e1ab7866c6a228"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/iconfont_1.eot",
        "e4d2788fef09eb0630d66cc7e6b1ab79"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/iconfont_1.svg",
        "d9e57c341608fddd7c140570167bdabb"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/iconfont_1.ttf",
        "f422407038a3180bb3ce941a4a52bfa2"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/iconfont_1.woff",
        "ead2bef59378b00425779c4ca558d9bd"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/index.5cdf03e8.js",
        "6262ac947d12a7b0baf32be79e273083"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/index.bc729f8a.css",
        "58e54a2c735f72a24715af7dab757739"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/logo-app-bohe.png",
        "ac5116d8f5fcb3e7c49e962c54ff9766"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/logo-app-mail.png",
        "a12bbfaeee7fbf025d5ee85634fca1eb"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/logo-app-manhua.png",
        "b8905b119cf19a43caa2d8a0120bdd06"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/logo-app-open.png",
        "b7cc76ba7874b2132f407049d3e4e6e6"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/logo-app-read.png",
        "e6e9c8bc72f857960822df13141cbbfd"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/logo-site.png",
        "2b0d728b46518870a7e2fe424e9c0085"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/version_no_pic.png",
        "aef80885188e9d763282735e53b25c0e"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/version_pc.png",
        "42f3cc914eab7be4258fac3a4889d41d"],
    ["https://static.ws.126.net/163/wap/f2e/milk_index/version_standard.png",
        "573408fa002e58c347041e9f41a5cd0d"]
];
var cacheName = 'sw-precache-v3-new-wap-index-' + (self.registration ? self.registration.scope : '');

var ignoreUrlParametersMatching = [/^utm_/];

var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};
var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }
    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();
    return bodyPromise.then(function(body) {
        // new Response() is happy when passed either a stream or a Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};
var createCacheKey = function(originalUrl, paramName, paramValue,
                              dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);
    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }
    return url.toString();
};
var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
        return true;
    }
    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};
var stripIgnoredUrlParameters = function(originalUrl,
                                         ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';
    url.search = url.search.slice(1) // Exclude initial '?'
        .split('&') // Split into an array of 'key=value' strings
        .map(function(kv) {
            return kv.split('='); // Split each 'key=value' string into a [key, value] array
        })
        .filter(function(kv) {
            return ignoreUrlParametersMatching.every(function(ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
            });
        })
        .map(function(kv) {
            return kv.join('='); // Join each [key, value] array into a 'key=value' string
        })
        .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each
    return url.toString();
};

var hashParamName = '_sw-precache';
//定义需要缓存的url列表
var urlsToCacheKeys = new Map(
    precacheConfig.map(function(item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);
//把cache中的url提取出来,进行去重操作
function setOfCachedUrls(cache) {
    return cache.keys().then(function(requests) {
        //提取url
        return requests.map(function(request) {
            return request.url;
        });
    }).then(function(urls) {
        //去重
        return new Set(urls);
    });
}
//sw安装阶段
self.addEventListener('install', function(event) {
    event.waitUntil(
        //首先尝试取出存在客户端cache中的数据
        caches.open(cacheName).then(function(cache) {
            return setOfCachedUrls(cache).then(function(cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
                        //如果需要缓存的url不在当前cache中,则添加到cache
                        if (!cachedUrls.has(cacheKey)) {
                            //设置same-origin是为了兼容旧版本safari中其默认值不为same-origin,
                            //只有当URL与响应脚本同源才发送 cookies、 HTTP Basic authentication 等验证信息
                            var request = new Request(cacheKey, {credentials: 'same-origin'});
                            return fetch(request).then(function(response) {
                                //通过fetch api请求资源
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }
                                return cleanResponse(response).then(function(responseToCache) {
                                    //并设置到当前cache中
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        }).then(function() {

            //强制跳过等待阶段,进入激活阶段
            return self.skipWaiting();

        })
    );
});
self.addEventListener('activate', function(event) {
    //清除cache中原来老的一批相同key的数据
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.keys().then(function(existingRequests) {
                return Promise.all(
                    existingRequests.map(function(existingRequest) {
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            //cache中删除指定对象
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function() {
            //self相当于webworker线程的当前作用域
            //当一个 service worker 被初始注册时，页面在下次加载之前不会使用它。 claim() 方法会立即控制这些页面
            //从而更新客户端上的serviceworker
            return self.clients.claim();

        })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET') {
        // 标识位,用来判断是否需要缓存
        var shouldRespond;
        // 对url进行一些处理,移除一些不必要的参数
        var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
        // 如果该url不是我们想要缓存的url,置为false
        shouldRespond = urlsToCacheKeys.has(url);
        // 如果shouldRespond未false,再次验证
        var directoryIndex = 'index.html';
        if (!shouldRespond && directoryIndex) {
            url = addDirectoryIndex(url, directoryIndex);
            shouldRespond = urlsToCacheKeys.has(url);
        }
        // 再次验证,判断其是否是一个navigation类型的请求
        var navigateFallback = '';
        if (!shouldRespond &&
            navigateFallback &&
            (event.request.mode === 'navigate') &&
            isPathWhitelisted([], event.request.url)) {
            url = new URL(navigateFallback, self.location).toString();
            shouldRespond = urlsToCacheKeys.has(url);
        }
        // 如果标识位为true
        if (shouldRespond) {
            event.respondWith(
                caches.open(cacheName).then(function(cache) {
                    //去缓存cache中找对应的url的值
                    return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
                        //如果找到了,就返回value
                        if (response) {
                            return response;
                        }
                        throw Error('The cached response that was expected is missing.');
                    });
                }).catch(function(e) {
                    // 如果没找到则请求该资源
                    console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                    return fetch(event.request);
                })
            );
        }
    }
});
```
```js
self.addEventListener('error', function(e) {
  self.clients.matchAll()
    .then(function (clients) {
      if (clients && clients.length) {
        clients[0].postMessage({ 
          type: 'ERROR',
          msg: e.message || null,
          stack: e.error ? e.error.stack : null
        });
      }
    });
});

self.addEventListener('unhandledrejection', function(e) {
  self.clients.matchAll()
    .then(function (clients) {
      if (clients && clients.length) {
        clients[0].postMessage({
          type: 'REJECTION',
          msg: e.reason ? e.reason.message : null,
          stack: e.reason ? e.reason.stack : null
        });
      }
    });
})
//然后引入workbox
importScripts('https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js');
workbox.setConfig({
  debug: true,
  modulePathPrefix: 'https://g.alicdn.com/kg/workbox/3.3.0/'
});
//直接激活跳过等待阶段
workbox.skipWaiting();
workbox.clientsClaim();
//定义要缓存的html
var cacheList = [
  '/',
  '/tbhome/home-2017',
  '/tbhome/page/market-list'
];
//html采用networkFirst策略，支持离线也能大体访问
workbox.routing.registerRoute(
  function(event) {
    // 需要缓存的HTML路径列表
    if (event.url.host === 'www.taobao.com') {
      if (~cacheList.indexOf(event.url.pathname)) return true;
      else return false;
    } else {
      return false;
    }
  },
  workbox.strategies.networkFirst({
    cacheName: 'tbh:html',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
);
//静态资源采用staleWhileRevalidate策略，安全可靠
workbox.routing.registerRoute(
  new RegExp('https://g\.alicdn\.com/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'tbh:static',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20
      })
    ]
  })
);
//图片采用cacheFirst策略，提升速度
workbox.routing.registerRoute(
  new RegExp('https://img\.alicdn\.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'tbh:img',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 12 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('https://gtms01\.alicdn\.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'tbh:img',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: 12 * 60 * 60
      })
    ]
  })
);
```
