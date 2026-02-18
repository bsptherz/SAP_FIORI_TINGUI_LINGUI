/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["app01/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
