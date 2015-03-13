"use strict";

import Reflux from "reflux";

import LoadingActions from "../actions/loading_actions";

const LoadingStore = Reflux.createStore({

  listenables: LoadingActions,

  onLoading() {
    this.trigger(true);
  },

  onLoadingCompleted() {
    this.trigger(false);
  },

  onLoadingFailed() {
    this.trigger(false);
  }

});

export default LoadingStore;