import Layer from "sap/a/map/layer/Layer";

import ServiceClient from "gd/service/ServiceClient";

export default class RouteLayer extends Layer {

    metadata = {
        properties: {
            startLocation: { type: "any" },
            endLocation: { type: "any" }
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

    setStartLocation(location) {
        const loc = L.latLng(location);
        this.setProperty("startLocation", loc);

        this._redrawStartMarker();
    }

    setEndLocation(location) {
        const loc = L.latLng(location);
        this.setProperty("endLocation", loc);

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
            this.startMarker = L.circleMarker(this.getStartLocation(), {
                color: "green",
                opacity: 0.8,
                fillColor: "green",
                fillOpacity: 0.8
            });
            this.startMarker.setRadius(10);

            this.markerGroup.addLayer(this.startMarker);
        }
        else {
            this.startMarker.setLatLng(this.getStartLocation());
        }
    }

    _redrawEndMarker() {
        if (!this.endMarker) {
            this.endMarker = L.circleMarker(this.getEndLocation(), {
                color: "red",
                opacity: 0.8,
                fillColor: "red",
                fillOpacity: 0.8
            });
            this.endMarker.setRadius(10);
            this.markerGroup.addLayer(this.endMarker);
        }
        else {
            this.endMarker.setLatLng(this.getEndLocation());
        }
    }
}
