import View from "sap/a/view/View";

export default class PoiSearchView extends View {
    metadata = {
        properties: {
            keyword: {
                type: "string"
            },
            selectedPoi: {
                type: "object", bindable: true
            },
            queryPoi: {
                type: "object", bindable: true
            }
        },
        events: {
            search: {
                parameters: {
                    keyword: "string"
                }
            }
        }
    }

    init() {
        super.init();
        this.addStyleClass("mb-view-poi-search-view");

        this.$element.append(`
            <div class="input-box">
                <input type="search" class="search-input" placeholder="搜索位置、公交站、地铁站">
                <div class="clear-btn">
                    <span class="iconfont icon-clear"></span>
                </div>
                <div class="search-btn">
                    <span class="iconfont icon-search"></span>
                </div>
            </div>
        `);

        this.$searchInput = this.$(".search-input");
        this.$clearBtn = this.$(".clear-btn");
        this.$searchBtn = this.$(".search-btn");

        this.$container.on("keydown", this._onkeydown.bind(this));
        this.$searchBtn.on("click", this._onsearchBtnclick.bind(this));
        this.$clearBtn.on("click", this._onclearBtnclick.bind(this));
    }

    afterInit() {
        super.afterInit();
    }

    getKeyword() {
        return this.$searchInput.val();
    }

    setKeyword(keyword) {
        this.$searchInput.val(keyword);
    }

    setSelectedPoi(selectedPoi) {
        this.setProperty("selectedPoi", selectedPoi);
    }

    setQueryPoi(queryPoi) {
        this.setProperty("queryPoi", queryPoi);
    }

    // if result isn't null, get the first result
    search() {
        const keyword = this.getKeyword();
        if (!(keyword === "" || keyword === null || keyword === undefined)) {
            this.fireSearch({
                keyword
            });
        }
    }

    _onkeydown(e) {
        if (e.keyCode === 13) {
            this.search();
        }
    }

    _onsearchBtnclick(e) {
        this.search();
    }

    _onclearBtnclick() {
        this.$searchInput.val("");
    }
}
