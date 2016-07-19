import AdaptiveApplication from "sap/a/app/Application";

export default class Application extends AdaptiveApplication {
    init() {
        super.init();
        this.addStyleClass("sap-mb-app-application");
    }
}
