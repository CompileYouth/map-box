import ManagedObject from "sap/ui/base/ManagedObject";

export default class ApplicationController extends ManagedObject
{
    run()
    {
        console.log("The application is running now.");
    }
}
