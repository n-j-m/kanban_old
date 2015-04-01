"use strict";

const utils = {

  respond(res, defaultData) {
    return (err, data) => {
      if (err) res.status(500).send(err);
      else res.json(data || defaultData);
    }
  },

  respondOverride(res, dataResponder) {
    return (err, data) => {
      if (err) res.status(500).send(err);
      else dataResponder(data);
    }
  }

};

export default utils;