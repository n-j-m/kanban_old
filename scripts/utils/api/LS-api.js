"use strict";

// localStorage api impl
import bbls from "backbone.localstorage";
import Backbone from "native-backbone";

Backbone.LocalStorage = bbls;

const Card = Backbone.Model.extend({
  defaults: {
    title: ""
  }
});
const CardsCollection = Backbone.Collection.extend({
  model: Card,
  localStorage: Backbone.LocalStorage("kanban")
});

let cards = new CardsCollection();

const TheAPI = {

  createCard(title) {
    return new Promise((resolve, reject) {
      var card = cards.create({title});
      card.save();
      resolve(card.toJSON());
    });
  }

};

export default TheAPI;