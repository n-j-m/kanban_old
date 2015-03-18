"use strict";

import React from "react";

import CardActions from "../actions/card_actions";

const AddCardControls = React.createClass({

  propTypes: {
    onCloseClick: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      disabled: true
    }
  },

  componentDidMount() {
    this.refs.cardInput.getDOMNode().focus();
  },

  render() {
    return (
      <div className="list-group-item">
        <input onKeyUp={this.handleKeyUp} ref="cardInput" className="form-control" placeholder="Add Card..." />
        <div className="edit-controls clearfix">
          <button onClick={this.handleSaveClick} ref="saveButton" className="btn btn-sm" disabled={this.state.disabled}>Save</button>
          <i onClick={this.props.onCloseClick} className="fa fa-close fa-2x"></i>
        </div>
      </div>
    );
  },

  handleKeyUp(evt) {
    if (evt.key === "Enter") {
      evt.preventDefault();
      this.save();
    }
    else {
      var cardInput = this.refs.cardInput.getDOMNode();
      var saveButton = this.refs.saveButton.getDOMNode();
      var disabled = saveButton.hasAttribute("disabled");
      if (disabled && cardInput.value.length) {
        this.setState({disabled: false});
      }
      else if (!disabled && !cardInput.value.length) {
        this.setState({disabled: true});
      }
    }
  },

  handleSaveClick(evt) {
    evt.preventDefault();
    
    this.save();
  },

  save() {
    const title = this.refs.cardInput.getDOMNode().value;

    CardActions.createCard(title);
  }

});

export default AddCardControls;