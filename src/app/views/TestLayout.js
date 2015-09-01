// Test Layout

'use strict';

var Marionette = require('marionette'),
    States = require('data/states'),
    TestLayoutTemplate = require('templates/test-layout.html');

module.exports = Marionette.LayoutView.extend({

    template: TestLayoutTemplate,

    className: 'test-layout state-layout',

    ui: {
        button: 'button.change-layout'
    },

    events: {
        'click @ui.button': 'onButtonClick'
    },

    initialize: function() {
        console.log("TestLayout | initialize");

        this.app = require('Application');

        this.app.router.navigate('test', { trigger: false });
    },

    //-- ui events

    onButtonClick: function() {
        this.app.model.set('layout', { state: States.layout.DEFAULT });
    }

});