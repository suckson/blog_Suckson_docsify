/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-18 18:29:41
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-18 22:35:41
 */
var $appid,$timestamp,$noncestr,$signature
//获取当前页面的url
var linkUrl = window.location.href.split('#')[0]
$.ajax({
    type : "GET",
    url : "http://mp.suckson.com/js-sdk?url=" + linkUrl,
    cache : false,
    async : false,
    success : function(msg) {
        var data = msg;
        console.log(data);
        if(data.success == true){
            $appid = data.data.appId;  // appid
            $timestamp = data.data.timestamp;   // timestamp
            $noncestr = data.data.nonceStr; // noncestr
            $signature = data.data.signature;  // signature
            //**配置微信信息**
            wx.config ({
                debug : false,
                appId : $appid,
                timestamp : $timestamp,
                nonceStr : $noncestr,
                signature : $signature,
                jsApiList : [
                    // 所有要调用的 API 都要加到这个列表中
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone'
                ]
            });

        }

    },
    error : function(msg){
			alert(msg)
    }
});
$(function(){
	wx.ready (function () {
		// 微信分享的数据
		var shareData = {
				"imgUrl" : "http://suckson.com/public/img/aaa.jpg",
				"link" :  window.location.href,
				"desc" : '想你时你在天边，想你时你在眼前， 想你时你在脑海 ，想你时你在心田',
				"title" : document.title,
				success : function () {
						// 分享成功可以做相应的数据处理
						alert(122)
				}
		};
		//分享微信朋友圈
		wx.onMenuShareTimeline (shareData);
		//分享给朋友
		wx.onMenuShareAppMessage(shareData);
		//分享到qq
		wx.onMenuShareQQ (shareData);
		//分享到微博
		wx.onMenuShareWeibo (shareData);
		//分享到qq空间
		wx.onMenuShareQZone(shareData);
	});
})