import AdaptiveApplication from "sap/a/app/Application";

import MapView from "../map/MapView";

export default class Application extends AdaptiveApplication
{
    init()
    {
        super.init();
        this.addStyleClass("mb-app");
        this._initMapView();
    }

    _initMapView()
    {
        this.mapView = new MapView("map-view", {
            defaultZoom: 10
        });
        this.addSubview(this.mapView);
    }
}
