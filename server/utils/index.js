"use strict";

const utils = {

  respond(res, defaultData) {
    return (err, data) => {
      if (err) res.status(500).send(err);
      else res.json(data || defaultData);
    }
  },

  respondOverride(res, data) {
    return (err) => {
      if (err) res.status(500).send(err);
      else res.json(data);
    }
  }

};

export default utils;