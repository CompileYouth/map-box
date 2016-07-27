import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ServiceClient from "gd/service/ServiceClient";

import ExampleLayer from "./layer/ExampleLayer";

export default class MapView extends AdaptiveMapView {
    afterInit() {
        super.afterInit();
        this.addStyleClass("mb-map-view");

        this.map.on("click", this._mapclick.bind(this));
    }

    initLayers() {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);

        this.exampleLayer = new ExampleLayer();
        this.addLayer(this.exampleLayer);
    }

    searchRoute(locations) {
        const serviceClient = ServiceClient.getInstance();
        const start = serviceClient.convertToWgs84(locations[0].lat, locations[0].lng);
        const end = serviceClient.convertToWgs84(locations[1].lat, locations[1].lng);
        this.exampleLayer.applySettings({
            startLocation: L.latLng(start),
            endLocation: L.latLng(end)
        });
        this.exampleLayer.fitBounds();

        serviceClient.searchDrivingRoute(locations).then((result) => {
            this.exampleLayer.drawRoute(result);
        }, (reason) => {});
    }

    _mapclick(e) {
        console.log(e.latlng);
    }
}
