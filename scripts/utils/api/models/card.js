"use strict";

import {Model} from "native-backbone";
import _assign from "lodash/object/assign";

import ItemCollection from "./item_collection";

export default Model.extend({
  defaults: {
    title: "",
    items: new ItemCollection()
  },

  parse: function(res) {
    var items = {
      items: new ItemCollection(res.items)
    };

    return _assign(res, items);
  }
});