"use strict";

import React from "react";

const CardItem = React.createClass({

  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render() {
    let item = this.props.item;
    let statusClass = item.get("completed") ? "fa-check" : "fa-square-o";
    return (
      <div className="list-group-item item">
        {item.get("title")}
        <i className={("fa " + statusClass + " status")}></i>
      </div>
    );
  }

});

export default CardItem;