"use strict";
/* global $ */

function on_resize(c,t){window.onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};

function resizer(el) {
  return function() {
  };
}

const TheUtils = {

  startResizer(el) {
    on_resize(function() {
      var navBarHeight = $(".navbar").outerHeight();
      $(el).height($(window).height() - navBarHeight - 10);
    })();
  }

};

export default TheUtils;