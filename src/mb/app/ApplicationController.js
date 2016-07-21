import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "../../gd/service/ServiceClient";

import Application from "./Application";
import CorUtil from "../util/CorUtil";

export default class ApplicationController extends AdaptiveApplicationController {
    createView(options) {
        return new Application(options);
    }

    run() {
        setTimeout(() => {
            const serviceClient = ServiceClient.getInstance();
            serviceClient.attachReady((e) => {
                serviceClient.convertToGcj02([[31.979, 118.755], [32.04389, 118.77881]]).then((result) => {
                    this.view.mapView.searchRoute(result);
                }, (reason) => {});
            });
        });
    }
}
