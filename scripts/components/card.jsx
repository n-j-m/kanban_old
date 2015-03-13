"use strict";

import React from "react";

import CardItem from "./card_item";
import AddCardItem from "./add_card_item";

const Card = React.createClass({

  propTypes: {
    card: React.PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      card: { itmes: [] }
    };
  },

  render() {
    const card = this.props.card;
    const cardItems = cards.items.map((item, i) => {
      return <CardItem key={i} item={item} />
    });

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {card.heading}
        </div>
        <div className="list-group">
          {cardItems}
          <AddCardItem />
        </div>
        <div className="panel-footer">
          Things
        </div>
      </div>
    );
  }

})