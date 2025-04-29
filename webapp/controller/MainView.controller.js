sap.ui.define([
    "sap/ui/core/mvc/Controller"
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
], (Controller) => {
    "use strict";

    return Controller.extend("tobiasmareco.invoices.controller.MainView", {
        onInit() {
            const oJsonModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJsonModel.loadData("../model/json/selectionScreenMenu.json");
            oView.setModel(oJsonModel,"selectionScreen");

            const oStatusJsonModel = new sap.ui.model.json.JSONModel();;
            oStatusJsonModel.loadData('../model/json/status.json');
            oView.setModel(oStatusJsonModel,"status");
        },
        onFilter(oEvent){

        },
        onClearFilter(oEnvent){
            const oModelSelectionScreen = this.getView().getModel("selectionScreen");
            oModelSelectionScreen.setProperty("/CountryKey","");
            oModelSelectionScreen.setProperty("/shipName","");
        }
    });
});