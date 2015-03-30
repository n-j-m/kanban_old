"use strict";

import {Router} from "express";

import CardController from "../controllers/card_controller";

let router = Router();

let cardsRoute = router.route("/cards");

cardsRoute.
  get(CardController.getCards).
  post(CardController.createCard);

let cardRoute = router.route("/cards/:id");

cardRoute.
  get(CardController.getCard).
  put(CardController.updateCard);

let itemsRoute = router.route("/cards/:cardId/items");

itemsRoute.
  get(CardController.getCardItems).
  post(CardController.createCardItem);

let itemRoute = router.route("/items/:id");

itemRoute.
  get(CardController.getItem).
  put(CardController.updateItem);

export default router;