import View from "sap/a/view/View";

export default class POISearchView extends View {
    metadata = {
        properties: {
            keyword: {
                type: "string"
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

    _onkeydown(e) {
        if (e.keyCode === 13) {
            this._search();
        }
    }

    _onsearchBtnclick(e) {
        this._search();
    }

    // if result isn't null, get the first result
    _search() {
        const keyword = this.getKeyword();
        if (!(keyword === "" || keyword === null || keyword === undefined)) {
            this.fireSearch({
                keyword
            });
        }
    }

    _onclearBtnclick() {
        this.$searchInput.val("");
    }
}
