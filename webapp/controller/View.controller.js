sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * 
     * @param {sap.ui.core.mvc.Controller} Controller 
     * @param {sap.ui.model.json.JSONModel} JSONModel
     * @returns 
     */
    (Controller, JSONModel) => {
        "use strict";
        let oDataSimulator = [];
        const MODEL_PATH = '../model/JSON/';
        return Controller.extend("tobiasmareco.form.controller.View", {
            onInit() {
                // LOAD TYPE DOCUMENT.
                const oJModelTypeDoc = new JSONModel();
                oJModelTypeDoc.loadData(`${MODEL_PATH}typeDocumentData.json`);
                this.getView().setModel(oJModelTypeDoc, 'mDocumentType');
                // LOAD PLACE BIRTH
                // LOAD NACIONALITY - COUNTRY
                const oJModelCountries = new JSONModel();
                oJModelCountries.loadData(`${MODEL_PATH}countriesData.json`);
                this.getView().setModel(oJModelCountries, 'mCountries');
                // LOAD GENRE
                const oJModelGenres = new JSONModel();
                oJModelGenres.loadData(`${MODEL_PATH}genreData.json`);
                this.getView().setModel(oJModelGenres, 'mGenres');
                //LOAD CIVIL STATUS
                const OJModelCivilStat = new JSONModel();
                OJModelCivilStat.loadData(`${MODEL_PATH}civilStatusData.json`);
                this.getView().setModel(OJModelCivilStat, 'mCivilStatus');

                const FORM_REGISTER_DATA = new JSONModel();
                FORM_REGISTER_DATA.loadData(`${MODEL_PATH}formRegisterData.json`);
                this.getView().setModel(FORM_REGISTER_DATA, 'formDataRegister');
                
            },
            saveDataRegister() {
                const data = this.getView().getModel('formDataRegister').getData();
                console.log(data)
            }
        });
    });
