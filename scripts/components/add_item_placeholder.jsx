"use strict";

import React from "react";

const AddItemPlaceholder = React.createClass({

  render() {
    return (
      <div onClick={this.props.onClick} className="list-group-item item">
        <span className="placeholder">Add Item...</span>
      </div>
    );
  }

});

export default AddItemPlaceholder;