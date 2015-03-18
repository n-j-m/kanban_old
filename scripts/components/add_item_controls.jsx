"use strict";

import React from "react";

const AddItemControls = React.createClass({

  propTypes: {
    onCloseClick: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      disabled: true
    };
  },

  componentDidMount() {
    this.refs.itemInput.getDOMNode().focus();
  },

  render() {
    return(
      <div className="list-group-item item-controls">
        <div className="input-group">
          <input onKeyUp={this.handleKeyUp} ref="itemInput" className="form-control entry" placeholder="Add item..." />
          <span className="input-group-btn">
            <button  ref="saveButton" onClick={this.handleSave} className="btn btn-default" disabled={this.state.disabled}>
              <i className="fa fa-check"></i>
            </button>
            <button onClick={this.props.onCloseClick} className="btn btn-default">
              <i className="fa fa-close"></i>
            </button>
          </span>
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
      const itemInput = this.refs.itemInput.getDOMNode();
      const saveButton = this.refs.saveButton.getDOMNode();
      
      if (this.state.disabled && itemInput.value.length) {
        this.setState({disabled: false});
      }
      else if(!this.state.disabled && !itemInput.value.length) {
        this.setState({disabled: true});
      }
    }
  },

  handleSave(evt) {
    this.save();
  },

  save() {
    this.props.onSave({
      title: this.refs.itemInput.getDOMNode().value
    });
  }

});

export default AddItemControls;