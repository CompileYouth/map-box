import ViewController from "sap/a/view/ViewController";

import ODSearchView from "./ODSearchView";

export default class ODSearchViewController extends ViewController {
    init() {
        super.init();
    }

    createView(options) {
        return new ODSearchView(options);
    }

    initView() {
        super.initView();

    }
}
