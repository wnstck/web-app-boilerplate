// Default Layout

'use strict';

var Marionette = require('marionette'),
    States = require('data/states'),
    DefaultLayoutTemplate = require('templates/default-layout.html');

module.exports = Marionette.LayoutView.extend({

    template: DefaultLayoutTemplate,

    className: 'default-layout state-layout',

    ui: {
        button: 'button.change-layout'
    },

    events: {
        'click @ui.button': 'onButtonClick'
    },

    initialize: function() {
        console.log("DefaultLayout | initialize");

        this.app = require('Application');

        this.app.router.navigate('/', { trigger: false });
    },

    //-- ui events

    onButtonClick: function() {
        this.app.model.set('layout', { state: States.layout.TEST });
    }

});