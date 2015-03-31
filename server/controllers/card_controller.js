"use strict";

import Card from "../models/card";
import Item from "../models/item";
import utils from "../utils";
import _merge from "lodash/object/merge"

const CardController = {

  getCards(req, res) {
    Card.find({}).
      populate("items").
      exec(utils.respond(res, []))
  },

  getCard(req, res) {
    Card.findOne({_id: req.params.id}).
      populate("items").
      exec(utils.respond(res, null));
  },

  createCard(req, res) {
    console.log("createCard:", req.originalUrl);
    let card = new Card(req.body);
    card.save(utils.respond(res, card));
  },

  updateCard(req, res) {
    let cardId = req.params.cardId;

    Card.findOneAndUpdate({ _id: cardId }, req.body).
      populate("items").
      exec(utils.respond(res, null));
  },

  getCardItems(req, res) {
    let cardId = req.params.cardId;

    Item.find({cardId}, utils.respond(res, []));
  },

  createCardItem(req, res) {
    let cardId = req.params.cardId;
    Card.findOne({ _id: cardId }, (err, card) => {
      if (err) return res.status(500).send(err);

      let item = new Item(req.body);
      card.items.push(item);

      card.save(utils.respondOverride(res, item));
    });
  },

  getItem(req, res) {
    Item.findOne({ _id: req.params.id }, utils.respond(res, null));
  },

  updateItem(req, res) {
    let itemId = req.params.itemId;

    Item.findOneAndUpdate({ _id: itemId }, req.body, utils.respond(res, null));
  }

};

export default CardController;