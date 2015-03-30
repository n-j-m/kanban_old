"use strict";

import mongoose from "mongoose";
import Item from "./item";

let CardSchema = mongoose.Schema({
  title: String,
  items: [Item.schema]
});

export default mongoose.model("Card", CardSchema);