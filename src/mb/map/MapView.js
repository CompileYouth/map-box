import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ExampleLayer from "./layer/ExampleLayer";
import CorUtil from "../util/CorUtil";

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

        this.exampleLayer = new ExampleLayer();
        this.addLayer(this.exampleLayer);
    }

    searchRoute(startLocation, endLocation) {
        const start = CorUtil.getInstance().gcj02towgs84(startLocation[0], startLocation[1]);
        const end = CorUtil.getInstance().gcj02towgs84(endLocation[0], endLocation[1]);

        this.exampleLayer.applySettings({
            startLocation: [start[1], start[0]],
            endLocation: [end[1], end[0]]
        });
        const driving= new AMap.Driving();
        driving.search(startLocation, endLocation, (status, result) => {
            this.exampleLayer.drawRoute(result.routes[0]);
            this.exampleLayer.fitBounds();
        });

    }
}
