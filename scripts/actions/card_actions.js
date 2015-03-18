"use strict";

import Reflux from "reflux";
import wire from "../utils/wire";
import api from "../utils/api";

const CardActions = Reflux.createActions({
  "getCards": {asyncResult: true},
  "getCard": {asyncResult: true},
  "createCard": {asyncResult: true},
  "createCardItem": {asyncResult: true},
  "updateCardItem": {asyncResult: true}
});

wire(CardActions.createCard);
CardActions.createCard.listenAndPromise(api.createCard);

wire(CardActions.getCards);
CardActions.getCards.listenAndPromise(api.get);

wire(CardActions.getCard);
CardActions.getCard.listenAndPromise(api.get);

wire(CardActions.createCardItem);
CardActions.createCardItem.listenAndPromise(api.createCardItem);

wire(CardActions.updateCardItem);
CardActions.updateCardItem.listenAndPromise(api.updateCardItem);

export default CardActions;