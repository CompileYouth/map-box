import ViewController from "sap/a/view/ViewController";

import ServiceClient from "gd/service/ServiceClient";

import POISearchView from "./POISearchView";

export default class POISearchViewController extends ViewController {
    init() {
        super.init();
    }
    createView(options) {
        return new POISearchView(options);
    }
    initView() {
        super.initView();

        this.view.attachSearch(this._onsearch.bind(this));
    }

    _onsearch(e) {
        const keyword = e.getParameter("keyword");
        const serviceClient = ServiceClient.getInstance();
        serviceClient.searchPoiAutoComplete(keyword).then((res) => {
            console.log(res);
            const poi = res[0];
            const model = sap.ui.getCore().getModel();
            model.setProperty("/selectedPoi", {
                name: poi.name,
                location: poi.location
            });
        }, (reason) => {});
    }
}
