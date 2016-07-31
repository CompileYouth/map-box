import ViewController from "sap/a/view/ViewController";

import ODSearchView from "./ODSearchView";
import StartSearchViewController from "./StartSearchViewController";
import EndSearchViewController from "./EndSearchViewController";

export default class ODSearchViewController extends ViewController {
    init() {
        super.init();
    }

    afterInit() {
        super.afterInit();

        this._initControllers();
    }

    _initControllers() {
        this._initStartSearchViewController();
        this._initEndSearchViewController();
    }

    _initStartSearchViewController() {
        this.startSearchViewController = new StartSearchViewController();
        this.addChildViewController(this.startSearchViewController, this.view.$(".line-search-start"));
    }

    _initEndSearchViewController() {
        this.endSearchViewController = new EndSearchViewController();
        this.addChildViewController(this.endSearchViewController, this.view.$(".line-search-end"));
    }

    createView(options) {
        return new ODSearchView(options);
    }

    initView() {
        super.initView();

    }
}
