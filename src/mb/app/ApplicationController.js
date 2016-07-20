import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import Application from "./Application";

export default class ApplicationController extends AdaptiveApplicationController
{
    createView(options)
    {
        return new Application(options);
    }

    run()
    {

    }
}
