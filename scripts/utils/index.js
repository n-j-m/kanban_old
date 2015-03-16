"use strict";

function on_resize(c,t){window.onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};

const TheUtils = {

  startResizer(el) {
    on_resize(function() {
      var navBarHeight = 50;
      var newHeight = window.innerHeight - navBarHeight - 10;
      console.log("h:", newHeight);
      el.clientHeight = newHeight;
    })();
  }

};

export default TheUtils;