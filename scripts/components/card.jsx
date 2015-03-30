"use strict";

import React from "react";

import CardItem from "./card_item";
import CardAddItem from "./card_add_item";

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
    const cardItems = card.items.map((item, i) => {
      return <CardItem key={i} item={item} />;
    });

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {card.title}
          <i className="fa fa-ellipsis-v pull-right card-settings"></i>
        </div>
        <div className="list-group items">
          {cardItems}
          <CardAddItem cardId={card._id} />
        </div>
        <div className="panel-footer">
          <span>Tester</span>
        </div>
      </div>
    );
  }

});

export default Card;