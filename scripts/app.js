"use strict";

import $ from "jquery";

function resize() {
  let board = $(".flex-container");
  const headerHeight = $(".navbar").outerHeight();
  board.height($(window).height() - 10 - headerHeight);
}
$(() => {
  $(window).resize(resize);
  resize();
});