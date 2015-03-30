"use strict";

const config = {
  apiVersion: "/v1"
}

export default {
  get(key) {
    return config[key];
  }
}