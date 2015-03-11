"use strict";

import Handlebars from "handlebars";

export default Handlebars.compile(`
<div class="flex-container">
  {{#each cards}}
    <div class="panel panel-default">
      <div class="panel-heading">
        Some text
      </div>
      <div class="list-group">
        <div class="list-group-item">Stuff</div>
        <div class="list-group-item">Stuff</div>
      </div>
      <div class="panel-footer">
        Things
      </div>
    </div>
  {{/each}}
</div>`
);