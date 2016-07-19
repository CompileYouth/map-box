import ManagedObject from "sap/ui/base/ManagedObject";
import View from "./View";

export default class ViewController extends ManagedObject {
    metadata = {
        properties: {
            viewOptions: {
                type: "object",
                defaultValue: {}
            }
        }
    }

    constructor(...args) {
        super(...args);
        this.afterInit();
    }

    afterInit() {
        this.view = this.createView(this.getViewOptions());

        if (this.view instanceof View) {
            this.initView();
        }
        else {
            throw new Error("createView(options) must return an instance of sap.a.view.View");
        }
    }

    init() {

    }

    getView() {
        return this.view;
    }

    createView(options) {
        throw new Error("createView(options) must br overide in the derived class");
    }

    initView() {

    }

}
