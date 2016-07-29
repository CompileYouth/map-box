import ViewController from "sap/a/view/ViewController";

import ServiceClient from "gd/service/ServiceClient";

import POISearchView from "./POISearchView";

export default class POISearchViewController extends ViewController {
    init() {
        super.init();
    }

    afterInit() {
        super.afterInit();

        this.view.suggestionListView.attachItemClick(this._itemClick.bind(this))
    }

    createView(options) {
        const opt = $.extend({
            selectedPoi: "{/selectedPoi}",
            queryPoi: "{/queryPoi}"
        }, options);
        return new POISearchView(opt);
    }
    initView() {
        super.initView();

        this.view.attachSearch(this._onsearch.bind(this));
    }

    _onsearch(e) {
        const keyword = e.getParameter("keyword");
        const serviceClient = ServiceClient.getInstance();
        serviceClient.searchPoiAutoComplete(keyword).then((res) => {
            const pois = res;
            this.view.suggestionListView.setItems(pois);
            this.view.suggestionListView.show();
        });
    }

    _itemClick(e) {
        const item = e.getParameter("item");
        const model = sap.ui.getCore().getModel();

        if (!item || !item.location || Number.isNaN(item.location[0]) || Number.isNaN(item.location[1])) {
            this.view.showWarning("无法查询此地址");
            return;
        }

        const preItem = model.getProperty("/selectedPoi");
        //model.setProperty("/selectedPoi", null);
        model.forceSetProperty("/selectedPoi", {
            name: item.name,
            location: item.location
        });

    }
}
