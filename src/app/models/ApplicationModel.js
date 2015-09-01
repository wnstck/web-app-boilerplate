// Application Model

'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    defaults: {
        layout: null   // String | States.layout.STATE
    },

    initialize: function() {
        console.log("ApplicationModel | initialize");
    }

});



