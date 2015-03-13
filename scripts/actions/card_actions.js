"use strict";

import Reflux from "reflux";
import wire from "../utils/wire";
import api from "../utils/api";

const CardActions = Reflux.createActions({
  "createCard": {async: true}
});

wire(CardActions.createCard);
CardActions.createCard.listenAndPromise(api.createCard);

export default CardActions;