import AdaptiveMapView from "sap/a/map/MapView";

export default class MapView extends AdaptiveMapView {
    init() {
        super.init();
        this.addStyleClass("mb-map-view");
    }
}
