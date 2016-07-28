import AdaptiveApplication from "sap/a/app/Application";

export default class Application extends AdaptiveApplication {
    afterInit() {
        super.afterInit();
        this.addStyleClass("mb-app");
    }
}
