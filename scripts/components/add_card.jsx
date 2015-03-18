"use strict";

import React from "react";

import AddCardPlaceholder from "./add_card_placeholder";
import AddCardControls from "./add_card_controls";

const AddCard = React.createClass({

  getInitialState() {
    return {
      active: false
    };
  },

  render() {
    let ctrl = this.state.active ?
      <AddCardControls onCloseClick={this.handleClose} /> :
      <AddCardPlaceholder onClick={this.handlePlaceholderClick} />
    return (
      <div className="panel add-card">
        <div className="list-group">
          {ctrl}
        </div>
      </div>
    );
  },

  handlePlaceholderClick(evt) {
    this.setState({active: true});
  },

  handleClose(evt) {
    this.setState({active: false});
  }

});

export default AddCard;