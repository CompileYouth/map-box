import View from "../view/View";

export default class Application extends View {
    init() {
        super.init();
        this.addStyleClass("sap-a-app");
    }
}
