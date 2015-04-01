"use strict";

import mongoose from "mongoose";

let ItemSchema = mongoose.Schema({
  title: String,
  completed: Boolean,
  card: {type: mongoose.Schema.Types.ObjectId, ref: "Card"}
});

export default mongoose.model("Item", ItemSchema);