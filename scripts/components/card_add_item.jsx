"use strict";

import React from "react";

import AddItemControls from "./add_item_controls";
import AddItemPlaceholder from "./add_item_placeholder";
import CardActions from "../actions/card_actions";

const CardAddItem = React.createClass({

  propTypes: {
    cardId: React.PropTypes.any.isRequired
  },

  getInitialState() {
    return {
      active: false
    };
  },

  render() {
    let ctrl = this.state.active ?
      <AddItemControls onCloseClick={this.handleCloseClick} onSave={this.handleSave} /> :
      <AddItemPlaceholder onClick={this.handlePlaceholderClick} />;
    return (
      ctrl
    );
  },

  handlePlaceholderClick(evt) {
    this.setState({active: true});
  },

  handleCloseClick(evt) {
    this.setState({active: false});
  },

  handleSave(item) {
    CardActions.createCardItem(this.props.cardId, item);
  }

});

export default CardAddItem;