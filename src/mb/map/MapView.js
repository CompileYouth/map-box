import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ServiceClient from "gd/service/ServiceClient";

import ExampleLayer from "./layer/ExampleLayer";

export default class MapView extends AdaptiveMapView {
    metadata = {
        events: {
            mapclick: {}
        }
    }

    afterInit() {
        super.afterInit();
        this.addStyleClass("mb-map-view");

        this.map.on("click", this._map_click.bind(this));
    }

    initLayers() {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);

        this.exampleLayer = new ExampleLayer();
        this.addLayer(this.exampleLayer);
    }

    _map_click(e) {
        this.fireMapclick({
            location: {
                lat: e.latlng.lat,
                lng: e.latlng.lng
            }
        });
    }
}
