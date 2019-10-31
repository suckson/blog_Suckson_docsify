/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-10-30 10:55:21
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-30 23:09:47
 */
(function () {
  function install(hook) {
    var dom = Docsify.dom;
    hook.mounted(function (_) {
      var div = dom.create('div');
      div.id = 'gitalk-container';
      var main = dom.getNode('#main');
      div.style = "width: " + (main.clientWidth) + "px; margin: 0 auto 20px;";
      dom.appendTo(dom.find('.content'), div);
    });
    hook.doneEach(function (_) {
      var el = document.getElementById('gitalk-container');
      while (el.hasChildNodes()) {
        el.removeChild(el.firstChild);
      }
      // eslint-disable-next-line
      gitalk.render('gitalk-container');
    });
  } 
  $docsify.plugins = [].concat(install, $docsify.plugins);
  }());