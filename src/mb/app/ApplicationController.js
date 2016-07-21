import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import Application from "./Application";
import CorUtil from "../util/CorUtil";

export default class ApplicationController extends AdaptiveApplicationController {
    createView(options) {
        return new Application(options);
    }

    run() {
        AMap.convertFrom([[118.755, 31.979], [118.77881, 32.04389]], "gps", (status,result) => {
            if (status === "complete") {
                const locations = result.locations;
                this.view.mapView.searchRoute([locations[0].lng, locations[0].lat], [locations[1].lng, locations[1].lat]);
            }
        });
    }
}
