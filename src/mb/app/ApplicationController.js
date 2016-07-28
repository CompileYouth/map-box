import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "../../gd/service/ServiceClient";

import Application from "./Application";
import Model from "../model/Model";
import MapViewController from "../map/MapViewController";
import POISearchViewController from "../view/POISearchViewController";

export default class ApplicationController extends AdaptiveApplicationController {
    init() {
        super.init();


    }

    afterInit() {
        super.afterInit();

        this._initModel();

        this._initPOISearchViewController();
        this._initMapViewController();

        // const model = sap.ui.getCore().getModel();
        // const selectedPoiBinding = model.bindProperty("/selectedPoi");
        // selectedPoiBinding.attachChange(this._selectedPoiChanged.bind(this));
        //
        // const queryPoiBinding = model.bindProperty("/queryPoi");
        // queryPoiBinding.attachChange(this._queryPoiChanged.bind(this));
    }

    _initPOISearchViewController() {
        this.poiSearchViewController = new POISearchViewController("view-poi-search-view-controller");
        this.addChildViewController(this.poiSearchViewController);
    }

    _initMapViewController() {
        this.mapViewController = new MapViewController("map-view-controller");
        this.addChildViewController(this.mapViewController);
    }

    _initModel() {
        const model = new Model();
        sap.ui.getCore().setModel(model);

        this.setModel(model);
    }

    createView(options) {
        return new Application(options);
    }

    run() {
        setTimeout(() => {
            const serviceClient = ServiceClient.getInstance();

            serviceClient.attachReady((e) => {
                serviceClient.convertToGcj02([[31.979, 118.755], [32.04389, 118.77881]]).then((result) => {
                    this.mapViewController.searchRoute(result);
                }, (reason) => {});
            });
        });
    }

    // _selectedPoiChanged(e) {
    //     const model = sap.ui.getCore().getModel();
    //     const selectedPoi = model.getProperty("/selectedPoi");
    //     this.mapViewController.view.setCenterLocation(selectedPoi.location, 16);
    // }
    //
    // _queryPoiChanged(e) {
    //     const model = sap.ui.getCore().getModel();
    //     const queryPoi = model.getProperty("/queryPoi");
    //     this.poiSearchViewController.view.setKeyword(queryPoi.name);
    // }
}
