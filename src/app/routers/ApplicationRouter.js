// Application Router

'use strict';

var Marionette = require('marionette');

module.exports = Marionette.AppRouter.extend({

    appRoutes: {
        'test(/)':      'onTest',
		'*path':        'onDefault'
    }

    /*
    execute: function(callback, args) {		
		console.log("ApplicationRouter | execute");
    }
    */

});