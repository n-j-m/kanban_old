"use strict";

import React from "react";

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
        <i className={("fa " + statusClass + " status pull-right")}></i>
      </div>
    );
  }

});

export default CardItem;