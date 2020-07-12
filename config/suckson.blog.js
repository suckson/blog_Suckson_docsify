/*
 * @Author: suckson
 * @Date: 2019-09-30 10:47:10
 * @LastEditors  : suckson
 * @LastEditTime : 2020-01-12 22:03:01
 */
(function(window) {
    function Suckson(fun) {
        this.ajax = function(method, url, data) {
            return new Promise((resolve, reject) => {
                var request = new XMLHttpRequest();
                request.open(method, url, true); /*设置请求方法与路径*/
                request.onreadystatechange = function() {
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
            })
        }
        this.init = function(config) {
                this.ajax('get', './config/config.json').then(response => {
                    const config = JSON.parse(response)
                    this.loadLib(config.isDev, config)
                })
                this.loadMusic(this.util.cdnUrl)
                fun()
            }
            this.loadMusic = function (cdnUrl){
                this.ajax('get', cdnUrl + '/configmp3List.json').then(response => {
                    const MusicList = JSON.parse(response)
                    window.MusicList = MusicList
                })
            }
            this.loadLib = function(isDev, config) {
                this.ajax('get', './config/lib.json').then(response => {
                    const dependenvices = JSON.parse(response)
                    let dependenvicesList = []
                    for (i in dependenvices) {
                        dependenvicesList = dependenvicesList.concat(dependenvices[i].path)
                    }
                    // cssExpr 用于判断资源是否是css
                    var cssExpr = new RegExp('\\.css')
                    for (let i = 0; i < dependenvicesList.length; i++) {
                        var url = dependenvicesList[i];
                        if (cssExpr.test(url)) {
                            this.util.loadStyleSheet(url)
                        } else {
                            this.util.loadScript(url, isDev, function() {
                                console.log(url)
                            })
                        }
                    }
                    /**
                     * 是否是开发环境 ，禁用devtools
                     */
                    if (!isDev) {
                        this.util.loadScript("/static/js/noCopy.js", isDev, function() {
                            console.log(url)
                        })
                    }
                    window.$docsify = config.docsfiy
                    setTimeout(function() {
                        window.gitalk = new Gitalk(config.docsfiy.gitalk)
                    }, 8000)
                })
            },
            this.util = {
                cdnUrl: 'http://alicdn.suckson.com',
                loadScript: function(url, isDev, callback) {
                    var script = document.createElement("script");
                    script.type = "text/javascript"
                    if (typeof(callback) != "undefined") {
                        if (script.readyState) {
                            script.onreadystatechange = function() {
                                if (script.readyState == "loaded" || script.readyState == "complete") {
                                    script.onreadystatechange = null
                                    callback()
                                }
                            };
                        } else {
                            script.onload = function() {
                                callback()
                            }
                        }
                    };
                    if (isDev) {
                        var timpstring = new Date().getTime();
                        script.src = this.cdnUrl + url + "?" + timpstring
                        console.log(this.cdnUrl + url + "?" + timpstring + "安装成功")
                    } else {
                        script.src = this.cdnUrl + url.slice(0, -2) + 'min' + '.js'
                        SecurityPolicyViolationEvent
                    }
                    document.body.appendChild(script);
                },
                loadStyleSheet: function(url, isDev) {
                    var head = document.head || document.getElementsByTagName('head')[0]
                    var link = document.createElement('link')
                    link.type = 'text/css'
                    link.rel = 'stylesheet'
                    if (isDev) {
                        var timpstring = new Date().getTime()
                        link.href = url + "?" + timpstring
                    } else {
                        link.href = url.slice(0, -3) + 'min' + '.css'
                    }
                    head.appendChild(link)
                }
            }
        this.init()
    }
    window.Suckson = Suckson
})(window)