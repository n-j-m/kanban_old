"use strict";

import {Model} from "native-backbone";

export default Model.extend({
  defaults: {
    title: "",
    completed: false
  }
});