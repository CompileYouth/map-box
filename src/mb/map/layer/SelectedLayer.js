import Layer from "sap/a/map/layer/Layer";

export default class SelectedLayer extends Layer {
    metadata = {
        properties: {
            selectedPoi: { type: "string", bindable: true }
        }
    }

    init() {
        super.init();

        this.markerGroup = L.featureGroup();
        this.container.addLayer(this.markerGroup);
    }

    afterInit() {
        super.afterInit();

    }

    setSelectedPoi(selectedPoi) {
        this.setProperty("selectedPoi", selectedPoi);

        if (selectedPoi) {
            this.markerGroup.clearLayers();

            const marker = L.marker(selectedPoi.location, {
                icon: L.icon({
                    iconUrl: require("mb/resource/images/blankpoi.png"),
                    iconSize: [19, 32]
                })
            });
            this.markerGroup.addLayer(marker);
        }
    }

}
