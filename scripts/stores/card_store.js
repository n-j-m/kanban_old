"use strict";

import Reflux from "reflux";

import CardActions from "../actions/card_actions";
import _map from "lodash/collection/map";

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

  updateCards(newCards) {
    this.cards = newCards;
    this.trigger(this.cards);
  }
});

export default CardStore;