import View from "../view/View";

export default class Application extends View
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("sap-a-app");
    }
}
