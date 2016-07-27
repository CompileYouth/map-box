import ViewController from "sap/a/view/ViewController";

import ServiceClient from "gd/service/ServiceClient";

import PoiSearchView from "./PoiSearchView";

export default class PoiSearchViewController extends ViewController {
    init() {
        super.init();
    }
    createView(options) {
        return new PoiSearchView(options);
    }
    initView() {
        super.initView();

        this.view.attachSearch(this._onsearch.bind(this));
    }

    _onsearch(e) {
        const keyword = e.getParameter("keyword");
        const serviceClient = ServiceClient.getInstance();
        serviceClient.searchPoiAutoComplete(keyword).then((res) => {
            const poi = res[0];
            const model = sap.ui.getCore().getModel();
            model.setProperty("/selectedPoi", {
                name: poi.name,
                locations: poi.location
            })
        }, (reason) => {});
    }
}
