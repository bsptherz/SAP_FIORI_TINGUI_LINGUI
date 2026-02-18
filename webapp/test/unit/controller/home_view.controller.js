/*global QUnit*/

sap.ui.define([
	"app01/controller/home_view.controller"
], function (Controller) {
	"use strict";

	QUnit.module("home_view Controller");

	QUnit.test("I should test the home_view controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
