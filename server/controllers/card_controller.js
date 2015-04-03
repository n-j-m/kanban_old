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
    let card = new Card(req.body);
    card.save(utils.respond(res, card));
  },

  updateCard(req, res) {
    let cardId = req.params.cardId;

    Card.findOneAndUpdate({ _id: cardId }, req.body).
      populate("items").
      exec(utils.respond(res, null));
  },

  createCardItem(req, res) {
    let cardId = req.params.cardId;
    Card.findOne({ _id: cardId }, utils.respondOverride(res, (card) => {
      let item = new Item(_merge({cardId}, req.body));
      item.save(utils.respondOverride(res, (item) => {
        card.items.push(item);
        card.save(utils.respond(res, null));
      }));
    }));
  },

  getItem(req, res) {
    Item.findOne({ _id: req.params.id }, utils.respond(res, null));
  },

  updateItem(req, res) {
    let itemId = req.params.id;
    Item.findOne({ _id: itemId }, function(err, item) {
      Item.update({ _id: itemId }, req.body, utils.respond(res, item));
    });
  }

};

export default CardController;