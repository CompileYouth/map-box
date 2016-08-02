import View from "sap/a/view/View";

export default class ODSearchView extends View {
    metadata = {
        properties: {
            type: { type: "string", defaultValue: "car" }
        },
        events: {
            searchRoute: {}
        }
    }

    init() {
        super.init();
        this.addStyleClass("mb-view-od-search-view");

        this._initLayout();
    }

    afterInit() {
        super.afterInit();

        this.setType(this.getType());
    }

    _initLayout() {
        this.$container.append(`
            <ul class="tabs">
                <li class="car" data-type="car"><i class="iconfont icon-car"></i>驾车</li>
                <li class="bus" data-type="bus"><i class="iconfont icon-bus"></i>公交</li>
                <li class="walking" data-type="walking"><i class="iconfont icon-people-walking"></i>步行</li>
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

        const $searchBtn = this.$(".line-search-submit button");
        $searchBtn.on("click", this._searchBtn_click.bind(this));
        this.$tab = this.$(".tabs");
        this.$tab.on("click", "li", this._tab_click.bind(this));
    }

    setType(type) {
        this.setProperty("type", type);
        if (type !== null) {
            this.$tab.children("li").removeClass("active");
            this.$tab.find(`.${type}`).addClass("active");
        }
    }

    _searchBtn_click(e) {
        this.fireSearchRoute();
    }

    _tab_click(e) {
        const type = $(e.currentTarget).attr("data-type");
        this.setType(type);
    }
}
