"use strict";

import Reflux from "reflux";
import wire from "../utils/wire";
import api from "../utils/api";

const CardActions = Reflux.createActions({
  "getCards": {asyncResult: true},
  "getCard": {asyncResult: true},
  "createCard": {asyncResult: true},
  "createCardItem": {asyncResult: true},
  "updateItem": {asyncResult: true}
});

wire(CardActions.createCard);
CardActions.createCard.listenAndPromise(api.createCard);

wire(CardActions.getCards);
CardActions.getCards.listenAndPromise(api.getCards);

wire(CardActions.getCard);
CardActions.getCard.listenAndPromise(api.getCard);

wire(CardActions.createCardItem);
CardActions.createCardItem.listenAndPromise(api.createCardItem);

wire(CardActions.updateItem);
CardActions.updateItem.listenAndPromise(api.updateItem);

export default CardActions;