"use strict";

import React from "react";

const AddCardPlaceholder = React.createClass({

  render() {
    return (
      <div onClick={this.props.onClick} className="list-group-item">
        <span className="placeholder">Add Card...</span>
      </div>
    );
  }

});

export default AddCardPlaceholder;