/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-04 16:21:00
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-04 16:56:56
 */
const SERVERURL = 'http://mp.suckson.com/'
const request = axios.create({
  baseURL: SERVERURL
})
function creatError (code, msg){
  const err = new Error(msg)
  err.code = code
  return err
}
function handleRestquest (request) {
  return  new Promise(function(resolve, reject){
    request.then(function(resp) {
      console.log(resp)
      var data = resp.data
      if (!data) {
        return reject(creatError(400, 'no data'))
      }
      if (!data) {
        return reject(creatError(400, data.message))
      }
      resolve(data)
    }).catch(function(err) {
      var resp = err.response
      console.log(err)
      if (resp.status === 401) {
        reject(creatError(401, 'need auth'))
      }
    })
  })
}
function getAccess(url){
  return handleRestquest(request.get(`/js-sdk?url=${url} `))
}

window.onload = function () {
  const url = window.location.href
  getAccess(url).then(response => {
    alert(response)
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: '', // 必填，公众号的唯一标识
      timestamp: '', // 必填，生成签名的时间戳
      nonceStr: '', // 必填，生成签名的随机串
      signature: '',// 必填，签名
      jsApiList: [ 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
    });
    wx.onMenuShareAppMessage({
      title: '', // 分享标题
      desc: '', // 分享描述
      link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户点击了分享后执行的回调函数
      }
    });
    wx.onMenuShareTimeline({
       title: '$20在线中文课，免费体验！', // 分享标题
          link: 'https://www.koalaknow.com/VCharClassic.html?uid=', // 分享链接
          imgUrl: 'https://www.koalaknow.com/img/VcharImg/vcharlogo.png', // 分享图标
        success: function () {  // 用户确认分享后执行的回调函数 
        },
        cancel: function () { // 用户取消分享后执行的回调函数          
        }
    });
  })
}