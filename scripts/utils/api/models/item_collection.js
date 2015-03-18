"use strict";

import {Collection} from "native-backbone";

import Item from "./item";

const ItemCollection = Collection.extend({
  model: Item
});

if (typeof window !== "undefined")
  window.I = {Item, ItemCollection}

export default ItemCollection;