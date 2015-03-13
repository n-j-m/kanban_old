"use strict";

import React from "react";

const CardItem = React.createClass({

  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render() {
    let item = this.props.item;
    return (
      <a href="javascript:;" className="list-group-item">{item.title}</a>
    );
  }

});

export default CardItem;