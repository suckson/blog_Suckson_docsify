/*
 * @Descripttion:
 * @version:
 * @Author: suckson
 * @Date: 2019-12-17 10:38:58
 * @LastEditors: suckson
 * @LastEditTime: 2019-12-17 11:10:57
 */
/* 2019-11-28 19:34:55 | 版权所有 火星科技 http://marsgis.cn */
function KeyDown() {
    return (!(
        112 == event.keyCode ||
        123 == event.keyCode ||
        (event.ctrlKey && 82 == event.keyCode) ||
        (event.ctrlKey && 78 == event.keyCode) ||
        (event.shiftKey && 121 == event.keyCode) ||
        (event.altKey && 115 == event.keyCode) ||
        ("A" == event.srcElement.tagName && event.shiftKey)
    ) || ((event.keyCode = 0), (event.returnValue = !1)));
}
(document.onkeydown = KeyDown),
(document.oncontextmenu = function() {
    event.returnValue = !1;
}),
(document.onselectstart = function() {
    event.returnValue = !1;
}),
(document.oncopy = function() {
    event.returnValue = !1;
});
var ConsoleManager = {
    onOpen: function() {
        try {
            window.open("about:blank", (target = "_self"));
        } catch (e) {
            var n = document.createElement("button");
            (n.onclick = function() {
                window.open("about:blank", (target = "_self"));
            }),
            n.click();
        }
    },
    onClose: function() {
        alert("Console is closed!!!!!");
    },
    init: function() {
        var e = this,
            n = document.createElement("div"),
            t = !1,
            o = !1;
        Object.defineProperty(n, "id", {
                get: function() {
                    t || (e.onOpen(), (t = !0)), (o = !0);
                }
            }),
            setInterval(function() {
                (o = !1),
                console.info(n),
                    console.clear(), !o && t && (e.onClose(), (t = !1));
            }, 200);
    }
};
ConsoleManager.init();