"use strict";

import request from "superagent";

const apiRoot = "/api/v1";

function respond(req) {
  return new Promise((resolve, reject) => {
    req.on("error", reject).
      end((err, res) => {
        if (err) reject(err);
        else resolve(res.body)
      })
  })
}

function makeUrl(path) {
  return `${apiRoot}${path}`
}

function get(path) {
  return respond(request.get(makeUrl(path)))
}

function post(path, data) {
  let req = request.post(makeUrl(path));
  if (data)
    req = req.send(data)

  return respond(req)
}

function put(path, data) {
  let req = request.put(makeUrl(path))
  if (data)
    req = req.send(data)

  return respond(req)
}

function del(path) {
  return respond(request.del(makeUrl(path)))
}

const TheAPI = {

  getCards() {
    return get("/cards")
  },

  getCard(id) {
    return get(`/cards/${id}`)
  },

  createCard(title) {
    return post("/cards", {title})
  },

  createCardItem(cardId, itemModel) {
    return post(`/cards/${cardId}/items`, itemModel)
  },

  updateItem(itemId, itemModel) {
    return put(`/items/${itemId}`, itemModel)
  }

}

export default TheAPI;