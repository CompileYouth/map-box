import ManagedObject from "sap/ui/base/ManagedObject";

let __instance__ = null;

export default class ServiceClient extends ManagedObject {
    constructor() {
        super();

        __instance__ = this;
    }

    static getInstance() {
        if (__instance__ === null)
        {
            __instance__ = new ServiceClient();
        }
        return __instance__;
    }
}
