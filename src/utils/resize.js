(function (doc, win) {
  var docEl = doc.documentElement,
// orientationchange 当设备的方向变化（设备横向持或纵向）此事件被触发
//判断窗口有没有orientationchange这个方法，有就赋值给一个变量，没有就返回resize方法。
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
//clientWidth:对象内容的可视区的宽度,不包滚动条等边线
      if (!clientWidth) return;
//把document的fontSize大小设置成跟窗口成一定比例的大小

      docEl.style.fontSize = clientWidth * 0.0625 + 'px';

    };

  if (!doc.addEventListener) return; //DOMContentLoaded是firefox下特有的Event, 当所有DOM解析完以后会触发这个事件。
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

