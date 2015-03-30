"use strict";

import mongoose from "mongoose";

let ItemSchema = mongoose.Schema({
  title: String,
  completed: Boolean
});

export default mongoose.model("Item", ItemSchema);