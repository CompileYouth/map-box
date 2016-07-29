import ViewController from "sap/a/view/ViewController";

import ServiceClient from "gd/service/ServiceClient";

import MapView from "./MapView";

export default class MapViewController extends ViewController {
    init() {
        super.init();
    }

    afterInit() {
        super.afterInit();

        this.view.attachMapClick(this._map_click.bind(this));
    }

    createView(options) {
        const opt = $.extend({
            "selectedPoi": "{/selectedPoi}",
            "queryPoi": "{/queryPoi}"
        }, options);
        return new MapView(opt);
    }

    initView() {
        super.initView();
    }

    searchRoute(locations) {
        const serviceClient = ServiceClient.getInstance();
        const start = serviceClient.convertToWgs84(locations[0].lat, locations[0].lng);
        const end = serviceClient.convertToWgs84(locations[1].lat, locations[1].lng);
        this.view.exampleLayer.applySettings({
            startLocation: L.latLng(start),
            endLocation: L.latLng(end)
        });
        this.view.exampleLayer.fitBounds();

        serviceClient.searchDrivingRoute(locations).then((result) => {
            this.view.exampleLayer.drawRoute(result);
        });
    }

    _map_click(e) {
        const serviceClient = ServiceClient.getInstance();
        const latlng = e.getParameter("location");
        const lat = latlng.lat;
        const lng = latlng.lng;

        serviceClient.getAddressByLatlng(lat,lng).then((res) => {
            const model = sap.ui.getCore().getModel();
            model.setProperty("/queryPoi", {
                name: res,
                location: [lat, lng]
            })
        });
    }
}
