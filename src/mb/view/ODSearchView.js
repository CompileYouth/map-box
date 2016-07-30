import View from "sap/a/view/View";

export default class ODSearchView extends View {
    metadata = {
        properties: {
            type: { type: "string" }
        }
    }

    init() {
        super.init();
        this.addStyleClass("mb-view-od-search-view");

        this._initLayout();
    }

    afterInit() {
        super.afterInit();

    }

    _initLayout() {
        this.$container.append(`

        `);
    }
}
