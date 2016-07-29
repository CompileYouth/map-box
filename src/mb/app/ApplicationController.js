import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "../../gd/service/ServiceClient";

import Application from "./Application";
import Model from "../model/Model";
import MapViewController from "../map/MapViewController";
import POISearchViewController from "../view/POISearchViewController";
import ODSearchViewController from "../view/ODSearchViewController";

export default class ApplicationController extends AdaptiveApplicationController {
    init() {
        super.init();


    }

    afterInit() {
        super.afterInit();

        this._initModel();

        this._initControllers();
    }

    _initControllers() {
        this._initPOISearchViewController();
        this._initMapViewController();
        this._initODSearchViewController();
    }

    _initPOISearchViewController() {
        this.poiSearchViewController = new POISearchViewController("view-poi-search-view-controller");
        this.addChildViewController(this.poiSearchViewController);
    }

    _initMapViewController() {
        this.mapViewController = new MapViewController("map-view-controller");
        this.addChildViewController(this.mapViewController);
    }

    _initODSearchViewController() {
        this.odSearchViewController = new ODSearchViewController("view-od-search-view-controller");
        this.addChildViewController(this.odSearchViewController);
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

}
