"use strict";

import Reflux from "reflux";

const LoadingActions = Reflux.createActions({
  loading: { asyncResult: true }
});

export default LoadingActions;