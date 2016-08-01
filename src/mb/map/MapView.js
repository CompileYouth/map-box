import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ServiceClient from "gd/service/ServiceClient";

import ExampleLayer from "./layer/ExampleLayer";
import SelectedLayer from "./layer/SelectedLayer";
import RouteLayer from "./layer/RouteLayer";

export default class MapView extends AdaptiveMapView {
    metadata = {
        properties: {
            selectedPoi: { type: "object", bindable: true },
            odPoi: { type: "object", bindable: true }
        },

        events: {
            mapClick: {
                parameters: {
                    location:  { type: "object" }
                }
            },
            searchRoute: {}
        }
    }

    afterInit() {
        super.afterInit();
        this.addStyleClass("mb-map-view");

        this.map.on("click", this._onmapClick.bind(this));
    }

    initLayers() {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);

        this.selectedLayer = new SelectedLayer({
            "selectedPoi": "{/selectedPoi}"
        });
        this.addLayer(this.selectedLayer);

        this.routeLayer = new RouteLayer();
        this.addLayer(this.routeLayer);
    }

    setSelectedPoi(selectedPoi) {
        this.setProperty("selectedPoi", selectedPoi);
        if (selectedPoi) {
            this.setCenterLocation(selectedPoi.location, 16);
        }
    }

    setOdPoi(odPoi) {
        this.setProperty("odPoi", odPoi);
        this.fireSearchRoute();
    }

    _onmapClick(e) {
        this.fireMapClick({
            location: e.latlng
        });
    }
}
