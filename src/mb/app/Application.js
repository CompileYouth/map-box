import AdaptiveApplication from "sap/a/app/Application";

import MapViewController from "../map/MapViewController";
import PoiSearchViewController from "../view/PoiSearchViewController";

export default class Application extends AdaptiveApplication {
    afterInit() {
        super.afterInit();
        this.addStyleClass("mb-app");

        this._initPoiSearchViewController();
        this._initMapViewController();
    }

    _initPoiSearchViewController() {
        const poiSearchViewController = new PoiSearchViewController("view-poi-search-view-controller");
        this.poiSearchView = poiSearchViewController.view;
        this.addSubview(this.poiSearchView);
    }

    _initMapViewController() {
        const mapViewController = new MapViewController("map-view-controller");
        this.mapView = mapViewController.view;
        this.addSubview(this.mapView);
    }
}
