import ViewController from "sap/a/view/ViewController";

import ServiceClient from "gd/service/ServiceClient";

import MapView from "./MapView";

export default class MapViewController extends ViewController {
    init() {
        super.init();
    }

    afterInit() {
        super.afterInit();

        this.view.map.on("click", this._mapclick.bind(this));
    }

    createView(options) {
        return new MapView(options);
    }

    initView() {
        super.initView();
    }

    _mapclick(e) {
        const serviceClient = ServiceClient.getInstance();
        const latlng = e.latlng;
        const lat = latlng.lat;
        const lng = latlng.lng;

        serviceClient.getAddressByLatlng(lat,lng).then((res) => {
            const model = sap.ui.getCore().getModel();
            model.setProperty("/queryPoi", {
                name: res,
                locations: [lat, lng]
            })
        }, (reason) => {});
    }
}
