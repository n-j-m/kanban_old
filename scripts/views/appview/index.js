"use strict";

import Backbone from "../bb";
import Handlebars from "handlebars";

import template from "./app-template";

const fakeData = [1,1,1,1,1,1,1,1]

const AppView = Backbone.View.extend({
  initialize() {
    this.render();
  },

  render() {
    this.$el.html(template({cards: fakeData}));
  }
});

export default AppView;