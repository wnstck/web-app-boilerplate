// Application Router Controller

'use strict';

var Marionette = require('marionette'),
    States = require('data/states');

module.exports = Marionette.Controller.extend({

	onDefault: function() {
		console.log("<<< ROUTE: default >>>");

		// !! FIX
		var app = require('Application');
        app.model.set('layout', { state: States.layout.DEFAULT });
	},

	onTest: function() {
		console.log("<<< ROUTE: /test >>>");

		// !! FIX
		var app = require('Application');
        app.model.set('layout', { state: States.layout.TEST });
	},

});