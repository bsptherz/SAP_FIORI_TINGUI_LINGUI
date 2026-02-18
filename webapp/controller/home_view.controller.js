sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], (Controller, MessageBox, Fragment) => {
    "use strict";

    return Controller.extend("app01.controller.home_view", {
        /*newLocal: "Routedashboard",*/
        onInit() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //oRouter.getRoute("Routedashboard").attachPatternMatched(this._onObjectMatched, this);
            //oRouter.getRoute("RouteDetails").attachPatternMatched(this._onObjectMatched, this);

            ["Routehome_view", "Routedashboard", "RouteDetails"].forEach((sRoute) => {
                oRouter.getRoute(sRoute).attachPatternMatched(this._onObjectMatched, this);
            });

            var oModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oModel, "oUserModel");
        },
        _onObjectMatched: function (oEvent) {
            var user_name = oEvent.getParameter("arguments").name;
            var pass_word = oEvent.getParameter("arguments").pass;
            this.getView().getModel("oUserModel").setProperty("/username", user_name);
            this.getView().getModel("oUserModel").setProperty("/password", pass_word);

        },
        onPressLogin: function () {

            let username = this.getView().byId("_IDGenInputUser").getValue();
            let password = this.getView().byId("_IDGenInputPass").getValue();

            if (username == '' || password == '') {
                MessageBox.error("Invalid Username/Password");
            }
            else {
                let oModel = this.getView().getModel();
                oModel.read("/businessPartnersSet", {
                    filters: [
                        new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.EQ, username),
                        new sap.ui.model.Filter("Supplier", sap.ui.model.FilterOperator.EQ, password)
                    ],
                    success: function (oData) {
                        if (oData.results.length > 0) {
                            MessageBox.success("Correct Credentials")

                            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                            oRouter.navTo("Routedashboard", {
                                name: username,
                                pass: password
                            });
                        }
                        else {
                            MessageBox.error("Invalid Username/Password")
                        }
                    }.bind(this),
                    error: function () {
                        MessageBox.error("Failed to Fetch data from oData Service");
                    }
                });
            }
        },
        onPressList: function () {

            /*     let username = this.getView().byId("_IDGenButton7").getText();
                let pasword = this.getView().byId("_IDGenText").getValue();  */

            let username = this.getView().byId("_IDGenButton4").getText();
            let password = this.getView().byId("_IDGenText").getText();

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteDetails", {
                name: username,
                pass: password
            });
        },
        profile_dropdown: function () {
            var oView = this.getView(),
                oButton = oView.byId("profile_button");

            if (!this._oMenuFragment) {
                this._oMenuFragment = Fragment.load({
                    id: oView.getId(),
                    name: "app01.view.profile_dropdown",
                    controller: this
                }).then(function (oMenu) {
                    oMenu.openBy(oButton);
                    return this._oMenuFragment;
                }.bind(this));
            } else {
                this._oMenuFragment.openBy(oButton);
            }
        },
        logout: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Routehome_view");

        }
    });
});