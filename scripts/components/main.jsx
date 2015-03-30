"use strict";

import React from "react";
import Reflux from "reflux";

import utils from "../utils";
import CardActions from "../actions/card_actions";
import CardStore from "../stores/card_store";

import AddCard from "./add_card";
import Card from "./card";

const Main = React.createClass({
  mixins: [Reflux.listenTo(CardStore, "onCardStoreChange")],

  onCardStoreChange(cards) {
    this.setState({
      cards: cards || []
    });
  },

  getInitialState() {
    return {
      cards: []
    }
  },

  componentWillMount() {
    CardActions.getCards();
  },

  componentDidMount() {
    utils.startResizer(this.getDOMNode());
  },

  render() {
    const cards = this.state.cards.map((card) => {
      return <Card key={card._id} card={card} />;
    });

    const style = {
      width: (260 * cards.length) + (10 * cards.length) + 280 /* AddCard width*/
    };

    return (
      <div className="flex-container" style={style}>
        {cards}
        <AddCard />
      </div>
    );
  }

});

export default Main;