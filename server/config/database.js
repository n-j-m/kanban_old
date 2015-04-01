"use strict";

import config from "../config";
import mongoose from "mongoose";

function noop() {}

const DBUtils = {

  initialize(environment, connectCallback) {
    var constr = config.get("db")[environment];

    mongoose.connect(constr, connectCallback || noop);
  },

  wipa_da_data(req, res, next) {
    try {
      if (mongoose.connection.db) {
        for (var i in mongoose.connection.collections) {
          mongoose.connection.collections[i].remove();
        }
      }
      res.send("Data wiped");
    } catch (ex) {
      res.status(500).send(err);
    }
  }

}



export default DBUtils;