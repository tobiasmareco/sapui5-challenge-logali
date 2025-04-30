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
        let oDataSimulator = {
            users: []
        };
        function checkIsEmpty(obj) {
            for (const [key, value] of Object.entries(obj)) {
                if (value == "") {
                    return true;
                }
                return false;
            }
        }
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

                const SHOW_LIST_USERS = new JSONModel();
                SHOW_LIST_USERS.setData(oDataSimulator);
                this.getView().setModel(SHOW_LIST_USERS, 'oDataSimulator');

                console.log(this.getView().getModel('mCivilStatus').getData());
            },
            saveDataRegister() {
                const data = this.getView().getModel('formDataRegister').getData();

                const isEmpty = checkIsEmpty(data);
                console.log(isEmpty);
                if (isEmpty) {
                    return;
                }

                oDataSimulator.users.push(data);
                console.log(oDataSimulator);
                const NEW_LIST_USERS = new JSONModel();
                NEW_LIST_USERS.setData(oDataSimulator);
                this.getView().setModel(NEW_LIST_USERS, 'oDataSimulator');
            },
            onChangeSelectNationality(e) {
                const { Nationality } = this.getView().getModel('formDataRegister').getData();
                const { Nations } = this.getView().getModel('mCountries').getData();
                Nations?.forEach(nation => {
                    if (nation?.key == Nationality) {
                        console.log(nation)
                        const oJModelPlaceBirth = new JSONModel();
                        oJModelPlaceBirth.setData(nation);
                        this.getView().setModel(oJModelPlaceBirth, 'mPlaceBirth');
                    }
                });
            },
            onChangeSelectCountry(e) {
                const { Country } = this.getView().getModel('formDataRegister').getData();
                const { Nations } = this.getView().getModel('mCountries').getData();
                Nations?.forEach(nation => {
                    if (nation?.key == Country) {
                        console.log(nation)
                        const oJModelProvince = new JSONModel();
                        oJModelProvince.setData(nation);
                        this.getView().setModel(oJModelProvince, 'mAddress');
                    }
                });
            },
            clearDataRegister() {
                const CLEAR_FORM = new JSONModel();
                CLEAR_FORM.setData({});
                this.getView().setModel(CLEAR_FORM, 'formDataRegister');
            }
        });
    });
