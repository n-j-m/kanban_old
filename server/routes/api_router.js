"use strict";

import {Router} from "express";
import config from "../config";
import cardsRouter from "./cards_router";

let versionedRouter = Router();

versionedRouter.use(config.get("apiVersion"), cardsRouter);

export default versionedRouter;