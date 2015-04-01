"use strict";

import React from "react";

import CardActions from "../actions/card_actions";

const CardItem = React.createClass({

  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render() {
    let item = this.props.item;
    let statusClass = item.completed ? "fa-check" : "fa-square-o";
    return (
      <div className="list-group-item item">
        {item.title}
        <i onClick={this.handleOnClick} className={("fa " + statusClass + " status pull-right")}></i>
      </div>
    );
  },

  handleOnClick(evt) {
    evt.preventDefault();

    CardActions.updateItem(this.props.item._id, {completed: !this.props.item.completed});
  }

});

export default CardItem;