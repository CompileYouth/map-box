import ManagedObject from "sap/ui/base/ManagedObject";

export default class Layer extends ManagedObject
{
    constructor(...args)
	{
		super(...args)
		this.afterInit();
	}

    init()
    {
        this.container = L.layerGroup();
    }

    afterInit()
    {

    }



    isVisible()
    {
        return this.getParent() !== null && this.getParent().map.hasLayer(this.container);
    }



    removeFromParent()
    {
        const parent = this.getParent();
        if (parent)
        {
            parent.removeLayer(this);
        }
    }
}
