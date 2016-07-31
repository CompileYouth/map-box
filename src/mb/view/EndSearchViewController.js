import ViewController from "sap/a/view/ViewController";
import SearchView from "sap/a/view/SearchView";

export default class EndSearchViewController extends ViewController {
    init() {
        super.init();
    }

    afterInit() {
        super.afterInit();

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
}
