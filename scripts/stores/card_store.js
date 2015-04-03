"use strict";

import Reflux from "reflux";

import CardActions from "../actions/card_actions";

const CardStore = Reflux.createStore({

  listenables: CardActions,

  getInitialState() {
    this.cards = [];
    return this.cards;
  },

  onGetCardsCompleted(cards) {
    this.updateCards(cards);
  },

  onGetCardCompleted(card) {
    this.updateCards([card].concat(this.cards));
  },

  onCreateCardCompleted(card) {
    this.updateCards([card].concat(this.cards));
  },

  onCreateCardItemCompleted(card) {
    this.updateCards(this.cards.map((c) => {
      return c._id === card._id ? card : c;
    }));
  },

  onUpdateItemCompleted(item) {
    let card = this.cards.filter((c) => {
      return c._id === item.cardId;
    })[0];
    if (card) {
      console.log("card:", card);
      card.items = card.items.map((i) => {
        return i._id === item._id ? item : i;
      });

      this.updateCards(this.cards);
    }
  },

  updateCards(newCards) {
    this.cards = newCards;
    this.trigger(this.cards);
  }
});

export default CardStore;