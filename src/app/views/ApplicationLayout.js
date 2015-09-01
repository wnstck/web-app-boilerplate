// Application Layout

'use strict';

var Marionette = require('marionette'),
    States = require('data/states'),
    DefaultLayout = require('views/DefaultLayout'),
    TestLayout = require('views/TestLayout'),
    ApplicationLayoutTemplate = require('templates/application-layout.html');

module.exports = Marionette.LayoutView.extend({

    template: ApplicationLayoutTemplate,

    regions: {
        state: '.state-region'
    },

    initialize: function() {
        console.log("ApplicationLayout | initialize");

        this.app = require('Application');

        this.listenTo(this.model, 'change:layout', this.onLayoutStateChange);
    },

    onLayoutStateChange: function(model, value) {
        console.log("ApplicationLayout | onLayoutStateChange");

        switch (value.state) {
            case States.layout.DEFAULT:
                this.getRegion('state').show(new DefaultLayout());
                break;
            case States.layout.TEST:
                this.getRegion('state').show(new TestLayout());
                break;
        }
    }

});