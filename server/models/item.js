"use strict";

import mongoose from "mongoose";

let ItemSchema = mongoose.Schema({
  title: String,
  completed: {type: Boolean, default: false},
  cardId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model("Item", ItemSchema);