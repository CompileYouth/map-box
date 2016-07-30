import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ServiceClient from "gd/service/ServiceClient";

import ExampleLayer from "./layer/ExampleLayer";
import SelectedLayer from "./layer/SelectedLayer";

export default class MapView extends AdaptiveMapView {
    metadata = {
        properties: {
            selectedPoi: { type: "object", bindable: true }
        },

        events: {
            mapClick: {
                parameters: {
                    location:  { type: "object" }
                }
            }
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

        this.selectedLayer = new SelectedLayer({
            "selectedPoi": "{/selectedPoi}"
        });
        this.addLayer(this.selectedLayer);

        this.exampleLayer = new ExampleLayer();
        this.addLayer(this.exampleLayer);
    }

    setSelectedPoi(selectedPoi) {
        this.setProperty("selectedPoi", selectedPoi);
        if (selectedPoi) {
            this.setCenterLocation(selectedPoi.location, 16);
        }
    }

    _map_click(e) {
        this.fireMapClick({
            location: e.latlng
        });
    }
}
