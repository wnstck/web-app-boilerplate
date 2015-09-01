var assert = require("assert"),
	ApplicationModel = require('../src/app/models/ApplicationModel');

describe('ApplicationModel', function() {
	
	beforeEach(function() {
		model = new ApplicationModel();
	});

	describe('default values', function() {
		it('should default with a null layout property', function() {
			assert.equal(null, model.get('layout'));
		});
	});

	describe('layout change', function() {
		it('should set layout when changed', function() {
			model.set('layout', 'newLayout');
			assert.equal('newLayout', model.get('layout'));
		});
	});

});