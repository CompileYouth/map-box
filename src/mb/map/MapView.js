import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ExampleLayer from "./layer/ExampleLayer";

export default class MapView extends AdaptiveMapView {
    afterInit() {
        super.afterInit();
        this.addStyleClass("mb-map-view");
    }

    initLayers() {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);

        this.exampleLayer = new ExampleLayer({
            startLocation: [31.979, 118.755],
            endLocation: [32.04389, 118.77881]
        });
        this.addLayer(this.exampleLayer);

        this.exampleLayer.drawRoute();

        this.exampleLayer.fitBounds();
    }
}
