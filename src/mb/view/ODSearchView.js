import View from "sap/a/view/View";

export default class ODSearchView extends View {
    metadata = {
        properties: {
            type: { type: "string" }
        }
    }

    init() {
        super.init();
        this.addStyleClass("mb-view-od-search-view");

        this._initLayout();
    }

    afterInit() {
        super.afterInit();

    }

    _initLayout() {
        this.$container.append(`
            <ul class="tabs">
                <li class="car"><i class="iconfont icon-car"></i>驾车</li>
                <li class="bus"><i class="iconfont icon-bus"></i>公交</li>
                <li class="walking"><i class="iconfont icon-people-walking"></i>步行</li>
            </ul>
            <div class="line-search">
                <div class="line-search-left">
                    <i class="iconfont icon-change h3"></i>
                </div>
                <div class="line-search-form">
                    <div class="line-search-start"></div>
                    <div class="line-search-end"></div>
                </div>
            </div>
            <div class="line-search-submit">
                <button>查询路线</button>
            </div>
        `);
    }
}
