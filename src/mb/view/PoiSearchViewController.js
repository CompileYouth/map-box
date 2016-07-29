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
            poi: "{/selectedPoi}"
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

        // If selectedPoi is the same with the item.
        const preItem = model.getProperty("/selectedPoi");
        if (preItem && preItem.name === item.name && preItem.location[0] === item.location[0] && preItem.location[1] === item.location[1]) {
            model.setProperty("/selectedPoi", null);
        }

        model.setProperty("/selectedPoi", {
            name: item.name,
            location: item.location
        });

    }
}
