"use strict";

// localStorage api impl
import {LocalStorage} from "./local-store";
import CardCollection from "./models/card_collection";

const LSCardCollection = CardCollection.extend({
  localStorage: new LocalStorage("kanban")
});

const _cards = new LSCardCollection();
_cards.fetch();

if (typeof window !== "undefined")
  window._cards = _cards;

const TheApi = {

  get(id) {
    if (id) {
      return Promise.resolve(_cards.get(id));
    }
    else {
      return Promise.resolve(_cards.toJSON());
    }
  },

  createCard(title) {
    return new Promise((resolve, reject) => {
      var card = _cards.create({title});
      card.save();
      resolve(_cards.toJSON());
    });
  },

  createCardItem(cardId, title) {
    console.log("cardId:", cardId);
    return new Promise((resolve, reject) => {
      let card = _cards.get(cardId);
      if (!card) {
        reject("Card not found");
      }
      else {
        let items = card.get("items");
        let item = items.create({title});
        item.save();
        resolve(_cards);
      }
    });
  },

  updateCardItem(cardId, itemId, itemModel) {
    return new Promise((resolve, reject) => {
      TheApi.get(cardId).
        then((card) => {
          let items = card.get("items");
          let item = items.get(itemId);
          if (item) {
            item.save(itemModel);
            resolve(_cards);
          }
          else {
            reject("Invalid item");
          }
        }).
        catch(reject);
    });
  }

};

export default TheApi;