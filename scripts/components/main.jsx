"use strict";

import React from "react";

import utils from "../utils";

import AddCard from "./add_card";

const Main = React.createClass({

  getInitialState() {
    return {
      cards: []
    }
  },

  componentDidMount() {
    utils.startResizer(this.getDOMNode());
  },

  render() {
    const cards = this.state.cards.map((card, i) => {
      return <Card key={i} card={card} />
    });

    const style = {
      width: (200 * cards.length) + (10 * cards.length) + 220 /* AddCard width*/
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