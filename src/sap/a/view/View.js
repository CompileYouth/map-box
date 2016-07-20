import ManagedObject from "sap/ui/base/ManagedObject";

export default class View extends ManagedObject
{
    metadata = {
		aggregations: {
			subviews: {
				type: "sap.a.view.View"
			}
		},
        events: {
			addedToParent: { }
		}
    };

    constructor(...args)
    {
        super(...args);
        this.afterInit();
    }

    afterInit()
    {

    }

    init()
	{
        this.$element = $(`<${this.getElementTag()}/>`);
        if (this.id !== null)
        {
            this.$element.attr("id", this.getId());
        }
        this.$container = this.$element;
	}

    getElementTag()
    {
        return "div";
    }



    addStyleClass(...args)
    {
        this.$element.addClass(...args);
    }

    removeStyleClass(...args)
    {
        this.$element.removeClass(...args);
    }

    toggleStyleClass(...args)
    {
        this.$element.toggleClass(...args);
    }

    show(...args)
	{
		this.$element.show(...args);
	}

	hide(...args)
	{
		this.$element.hide(...args);
	}

    toggle(...args)
    {
        this.$element.toggle(...args);
    }




    placeAt(target)
    {
        const $target = (target instanceof jQuery ? target : $(target));
        $target.append(this.$element);
    }



    $(...args)
    {
        return this.$element.find(...args);
    }



    addSubview(subview, $container = this.$container)
    {
        if (subview.getParent())
        {
            subview.removeFromParent();
        }
        this.addAggregation("subviews", subview);
        subview.placeAt($container);
        subview.fireAddedToParent();
        return this;
    }

    removeSubview(subview, neverUseAgain = false)
    {
        const result = this.removeAggregation("subviews", subview);
        if (result)
        {
            if (neverUseAgain)
            {
                subview.$element.remove();
            }
            else
            {
                subview.$element.detach();
            }
        }
        return result;
    }

    removeAllSubviews(neverUseAgain = false)
    {
        while (this.getSubviews().length > 0)
        {
            this.removeSubview(this.getSubviews()[0], neverUseAgain);
        }
    }

    removeFromParent()
    {
        if (this.getParent())
        {
            this.getParent().removeSubview(this);
        }
    }






	toString()
	{
		return `${this.getMetadata().getName()}[${this.getId()}]`;
	}
}
