"use strict";

import LoadingActions from "../actions/loading_actions";

function wire(asyncAction) {
  asyncAction.preEmit = function() { LoadingActions.loading(); };
  asyncAction.completed.listen(LoadingActions.loading.completed);
  asyncAction.failed.listen(LoadingActions.loading.failed);
}

export default wire;