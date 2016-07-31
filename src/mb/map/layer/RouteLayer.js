import Layer from "sap/a/map/layer/Layer";

import ServiceClient from "gd/service/ServiceClient";

export default class ExampleLayer extends Layer {

    metadata = {
        properties: {
            originPoi: { type: "object" },
            destPoi: { type: "object" }
        }
    };

    init() {
        super.init();

        this.markerGroup = L.featureGroup();
        this.container.addLayer(this.markerGroup);

        this.routeGroup = L.featureGroup();
        this.container.addLayer(this.routeGroup);
    }

    afterInit() {
        super.afterInit();
    }

    setOriginPoi(originPoi) {
        this.setProperty("originPoi", originPoi);

        this._redrawStartMarker()
    }

    setDestPoi(destPoi) {
        this.setProperty("destPoi", destPoi);

        this._redrawEndMarker();
    }

    drawRoute(routes) {
        this.routeGroup.clearLayers();

        const serviceClient = ServiceClient.getInstance();
        const latlngs = routes.steps.map((step) => {
            return step.path.map((p) => {
                return serviceClient.convertToWgs84(p.lat, p.lng);
            });
        });

        const mutiPolyline = L.multiPolyline(latlngs);
        this.routeGroup.addLayer(mutiPolyline);
    }

    _redrawStartMarker() {
        if (!this.startMarker) {
            this.startMarker = L.circleMarker(L.latlng(this.getOriginPoi().location), {
                color: "green",
                opacity: 0.8,
                fillColor: "green",
                fillOpacity: 0.8
            });
            this.startMarker.setRadius(10);

            this.markerGroup.addLayer(this.startMarker);
        }
        else {
            this.startMarker.setLatLng(L.latlng(this.getOriginPoi().location));
        }
    }

    _redrawEndMarker() {
        if (!this.endMarker) {
            this.endMarker = L.circleMarker(L.latlng(this.getDestPoi().location), {
                color: "red",
                opacity: 0.8,
                fillColor: "red",
                fillOpacity: 0.8
            });
            this.endMarker.setRadius(10);
            this.container.addLayer(this.endMarker);
        }
        else {
            this.markerGroup.setLatLng(L.latlng(this.getDestPoi().location));
        }
    }
}
