import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "../../gd/service/ServiceClient";

import Application from "./Application";

export default class ApplicationController extends AdaptiveApplicationController {
    init() {
        super.init();
        this._initModel();
    }

    afterInit() {
        super.afterInit();

        const selectedPoiBinding = this.model.bindProperty("/selectedPoi");
        selectedPoiBinding.attachChange(this._selectedPoiChanged.bind(this));

        const queryPoiBinding = this.model.bindProperty("/queryPoi");
        queryPoiBinding.attachChange(this._queryPoiChanged.bind(this))
    }

    _initModel() {
        this.model = new sap.ui.model.json.JSONModel({
            selectedPoi: null,
            queryPoi: null
        });
        sap.ui.getCore().setModel(this.model);
    }

    createView(options) {
        return new Application(options);
    }

    run() {
        setTimeout(() => {
            const serviceClient = ServiceClient.getInstance();

            serviceClient.attachReady((e) => {
                serviceClient.convertToGcj02([[31.979, 118.755], [32.04389, 118.77881]]).then((result) => {
                    this.view.mapView.searchRoute(result);
                }, (reason) => {});
            });
        });
    }

    _selectedPoiChanged(e) {
        const selectedPoi = this.model.getProperty("/selectedPoi");
        console.log(selectedPoi);
        this.view.mapView.setCenterLocation(selectedPoi.locations, 16);
    }

    _queryPoiChanged(e) {

    }
}
