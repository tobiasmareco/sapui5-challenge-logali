sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} Filter
     */
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("tobiasmareco.invoices.controller.MainView", {
        onInit() {
            const oJsonModel = new sap.ui.model.json.JSONModel();
            const oView = this.getView();
            oJsonModel.loadData("../model/json/selectionScreenMenu.json");
            oView.setModel(oJsonModel, "selectionScreen");

            const oStatusJsonModel = new sap.ui.model.json.JSONModel();;
            oStatusJsonModel.loadData('../model/json/status.json');
            oView.setModel(oStatusJsonModel, "status");
        },
        onFilter(oEvent) {
            const { shipName, CountryKey } = this.getView().getModel("selectionScreen").getData();
            let filterBy = [];
            if (shipName !== "") {
                filterBy.push(new Filter("ShipName", FilterOperator.Contains, shipName));
            }

            if (CountryKey !== "") {
                filterBy.push(new Filter("Country", FilterOperator.EQ, CountryKey));
            }
            const oList = this.getView().byId("invoicesList");
            const oBinding = oList.getBinding("items");

            oBinding.filter(filterBy)
        },
        onClearFilter(oEnvent) {
            const oModelSelectionScreen = this.getView().getModel("selectionScreen");
            oModelSelectionScreen.setProperty("/shipName", "");
            oModelSelectionScreen.setProperty("/CountryKey", "");

            const oList = this.getView().byId("invoicesList");
            const oBinding = oList.getBinding("items");

            oBinding.filter([])
        }
    });
});