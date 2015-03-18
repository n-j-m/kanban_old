"use strict";

import Reflux from "reflux";

import CardActions from "../actions/card_actions";

const CardStore = Reflux.createStore({

  listenables: CardActions,

  onGetCardsCompleted(cards) {
    this.trigger({cards});
  },

  onGetCardCompleted(card) {
    this.trigger({card});
  },

  onCreateCardCompleted(cards) {
    this.trigger({cards});
  },

  onCreateCardItemCompleted(cards) {
    this.trigger({cards});
  }
});

export default CardStore;