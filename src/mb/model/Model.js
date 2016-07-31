import SAPModel from "sap/a/model/Model";

export default class Model extends SAPModel {
    constructor(...args) {
        super({
            selectedPoi: null,
            queryPoi: null,
            originPoi: null,
            destPoi: null
        });
    }

    init() {
        super.init();
    }

}
