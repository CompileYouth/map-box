import ManagedObject from "sap/ui/base/ManagedObject";

import View from "./View";

export default class ViewController extends ManagedObject {
    metadata = {
        properties: {
            viewOptions: { type: "object" }
        },
        aggregations: {
			childViewControllers: {
				type: "sap.a.view.ViewController"
			}
		}
    };

    constructor(...args) {
        super(...args);
        this.afterInit();
    }

    init() {

    }

    afterInit() {
        this.view = this.createView(this.getViewOptions());
        if (this.view instanceof View) {
            this.initView();
        }
        else {
            throw new Error("createView(options) must return an instance of sap.a.view.View.");
        }
    }

    getView() {
        return this.view;
    }

    createView(options) {
        throw new Error("createView(options) must be override in the derived class.");
    }

    initView() {

    }

    addChildViewController(childViewController, $container) {
        this.addAggregation("childViewControllers", childViewController);
        this.view.addSubview(childViewController.view, $container);
        return this;
    }

    removeChildViewController(childViewController, neverUseAgain) {
        const result = this.removeAggregation("childViewControllers", childViewController);
        if (result) {
            this.view.removeSubview(childViewController, neverUseAgain);
        }
        return result;
    }

    removeAllChildViewController(neverUseAgain) {
        while (this.getChildViewControllers().length > 0) {
            this.removeChildViewController(this.getChildViewControllers()[0], neverUseAgain);
        }
    }
}
