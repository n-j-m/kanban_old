"use strict";

var config = require("../server/config");
var mongoose = require("mongoose");

process.env.NODE_ENV = "test";

function noop() {}

beforeEach(function(done) {

  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove();
    }
    done()
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.get("db").test, function(err) {
      if (err) throw err;
      return clearDB();
    })
  }
  else {
    return clearDB();
  }

});

afterEach(function(done) {
  mongoose.disconnect();
  done();
});

function makeArgs(origArgs) {
  var args = [];
  for (var i = 0, l = origArgs.length; i < l; i++) {
    args.push(origArgs[i]);
  }
  return args;
}

var utils = {

  mockMiddleware: function mockMiddleware(options) {
    return {
      req: {
        params: options.params || {},
        body: options.body || {},
        query: options.query || {}
      },
      res: {
        status: function() {
          return this;
        },
        send: function() {
          var args = makeArgs(arguments);
          if (options.send) {
            options.send.apply(null, args);
          }
          return this;
        },
        json: function() {
          var args = makeArgs(arguments);
          if (options.json) {
            options.json.apply(null, args);
          }
          return this;
        }
      }
    };
  }

};

module.exports = utils;