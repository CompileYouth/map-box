import View from "../view/View";

export default class MapView extends View {
    metadata = {
		properties: {
			defaultCenterLocation: {
				type: "object",
                defaultValue: [ 32.04389, 118.77881 ]
			},
			defaultZoom: {
				type: "int",
				defaultValue: 15
			},
			minZoom: {
				type: "int",
				defaultValue: 11
			},
			maxZoom: {
				type: "int",
				defaultValue: 17
			},
			allowZoom: {
				type: "boolean",
				defaultValue: true
			},
			allowDrag: {
				type: "boolean",
				defaultValue: true
			}
		}
    };

    init() {
        super.init();
        this.addStyleClass("sap-a-map-view");
        this._initMap();

        this.attachAddedToParent(() => {
			setTimeout(() => {
				this.invalidateSize();
			});
		});
    }

    _initMap() {
        const options = {
            zoomControl: false,
			attributionControl: false,
			center: this.getDefaultCenterLocation(),
			zoom: this.getDefaultZoom(),
			minZoom: this.getMinZoom(),
			maxZoom: this.getMaxZoom(),
			dragging: this.getAllowDrag(),
			scrollWheelZoom: this.getAllowZoom(),
			doubleClickZoom: this.getAllowZoom()
        };
        this.map = L.map(this.$element[0], options);
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map);
    }

    invalidateSize(...args) {
        this.map.invalidateSize(...args);
    }
}
