import Layer from "sap/a/map/layer/Layer";

import CorUtil from "../../util/CorUtil";

export default class ExampleLayer extends Layer {

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

        this._redrawStartMarker()
    }

    setEndLocation(location) {
        const loc = L.latLng(location);
        this.setProperty("endLocation", loc);

        this._redrawEndMarker();
    }

    drawRoute(routes) {
        this.routeGroup.clearLayers();
        routes.steps.forEach((route) => {
            const start = CorUtil.getInstance().gcj02towgs84(route.start_location.lng, route.start_location.lat);
            const end = CorUtil.getInstance().gcj02towgs84(route.end_location.lng, route.end_location.lat);
            const polyline = L.polyline([ [ start[1], start[0] ], [ end[1], end [0] ] ]);
            this.routeGroup.addLayer(polyline);
        });
    }

    _redrawStartMarker() {
        if (!this.startMarker) {
            console.log(this.getStartLocation());
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
            this.container.addLayer(this.endMarker);
        }
        else {
            this.markerGroup.setLatLng(this.getEndLocation());
        }
    }
}
