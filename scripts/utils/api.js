"use strict";

const api = {

  createCard(title) {
    return new Promise((resolve, reject) => {
      resolve({
        title,
        items: []
      });
    });
  }

};

export default api;