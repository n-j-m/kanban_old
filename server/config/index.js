"use strict";

const config = {
  apiVersion: "/v1",
  db: {
    development: "mongodb://localhost/kanban-dev",
    test: "mongodb://localhost/kanban-test",
    production: process.env.KANBAN_DB_URI
  }
}

export default {
  get(key) {
    return config[key];
  }
}