// Application

'use strict';

var Backbone = require('backbone'),
    Marionette = require('marionette'),
    Config = require('data/config'),
    ApplicationModel = require('models/ApplicationModel'),
    ApplicationLayout = require('views/ApplicationLayout'),
    ApplicationRouter = require('routers/ApplicationRouter'),
    ApplicationRouterController = require('routers/ApplicationRouterController');

var Application = Marionette.Application.extend({

    events:    require('data/events'),

    onStart: function() {
        console.log("Application | onStart | version: " + Config.app.version);

        this.model = new ApplicationModel();

        this.layout = new ApplicationLayout({ 
            el: "#application",
            model: this.model
        }).render();

        this.router = new ApplicationRouter({ 
            controller: new ApplicationRouterController() 
        });

        Backbone.history.start({ pushState: true, root: '/' });
    }

});

module.exports = new Application();


