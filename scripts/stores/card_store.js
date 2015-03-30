"use strict";

import Reflux from "reflux";

import CardActions from "../actions/card_actions";
import _find from "lodash/collection/find";

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

  onCreateCardCompleted(cards) {
    this.updateCards(cards);
  },

  onCreateCardItemCompleted(item) {
    let card = _find(this.cards, (c) => {
      return c._id === item.cardId;
    });
    if (card) {
      card.items.push(item);
    }
    this.trigger(this.cards);
  },

  updateCards(newCards) {
    this.cards = newCards;
    this.trigger(this.cards);
  }
});

export default CardStore;