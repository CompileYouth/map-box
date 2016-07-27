import AdaptiveApplication from "sap/a/app/Application";

import MapView from "../map/MapView";
import PoiSearchViewController from "../view/PoiSearchViewController";

export default class Application extends AdaptiveApplication {
    afterInit() {
        super.afterInit();
        this.addStyleClass("mb-app");

        this._initPoiSearchViewController();
        this._initMapView();
    }

    _initPoiSearchViewController() {
        this.poiSearchViewController = new PoiSearchViewController("view-poi-search-view");
        this.addSubview(this.poiSearchViewController.view);
    }

    _initMapView() {
        this.mapView = new MapView("map-view", {
            defaultZoom: 8
        });
        this.addSubview(this.mapView);
    }
}
