import ViewController from "sap/a/view/ViewController";
import SearchView from "sap/a/view/SearchView";

import ServiceClient from "gd/service/ServiceClient";

export default class EndSearchViewController extends ViewController {
    init() {
        super.init();
    }

    afterInit() {
        super.afterInit();

        this.view.attachSearch(this._onsearch.bind(this));
        this.view.suggestionListView.attachItemClick(this._itemClick.bind(this))
    }

    createView(options) {
        const opt = $.extend({
            placeholder: "终：请输入终点"
        }, options);
        return new SearchView(opt);
    }

    initView() {
        super.initView();

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
        this.view.setPoi({
            name: item.name,
            location: item.location
        });

    }
}
