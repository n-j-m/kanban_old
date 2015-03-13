"use strict";

import alt from "../alt";

import CardActions from "../actions/card_actions";

class CardStore {

  constructor() {
    this.bindActions(CardActions);

    this.cards = [];
  },

  onCreate(title) {
    this.cards.
  }

}

export default alt.createStore(CardStore);