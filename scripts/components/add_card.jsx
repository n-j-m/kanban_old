"use strict";

import React from "react";

const AddCard = React.createClass({

  getInitialState() {
    return {
      active: false
    };
  },

  componentDidUpdate() {
    if (this.state.active) {
      // focus the input if it's visible
      this.refs.cardInput.getDOMNode().focus();
    }
  },

  render() {
    const active = this.state.active;

    let cls = "panel-heading" + (active ? " active" : "");

    let ctrl = active ? (
          <input
            ref="cardInput"
            onBlur={this.handleBlur}
            onKeyPress={this.handleKeyPress}
            className="form-control"
            type="text"
            placeholder="Add Card" />
        ) :
      (<div>Add Card <span className="fa fa-plus pull-right"></span></div>);

    return (
      <div className="panel add-card">
        <div className={cls} onClick={this.handleClick}>
          {ctrl}
        </div>
      </div>
    );
  },

  handleClick(evt) {
    evt.preventDefault();

    this.setState({active: true});
  },

  handleBlur(evt) {
    evt.preventDefault();

    this.setState({active: false});
  },

  handleKeyPress(evt) {
    if (evt.key === "Enter") {
      console.log("new card");
      this.setState({active: false});
    }
  }

});

export default AddCard;