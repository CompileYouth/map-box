import ViewController from "sap/a/view/ViewController";
import SearchView from "sap/a/view/SearchView";

export default class StartSearchViewController extends ViewController {
    init() {
        super.init();
    }

    afterInit() {
        super.afterInit();

    }

    createView(options) {
        const opt = $.extend({
            placeholder: "起：请输入起点"
        }, options);
        return new SearchView(opt);
    }

    initView() {
        super.initView();

    }
}
