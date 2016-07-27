import ViewController from "sap/a/view/ViewController";
import MapView from "./MapView";

export default class MapViewController extends ViewController {
    init() {
        super.init();
    }

    afterInit() {
        super.afterInit();

        console.log(this.view);
    }

    createView(options) {
        return new MapView(options);
    }
    initView() {
        super.initView();

    }
}
