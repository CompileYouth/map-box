import View from "sap/a/view/View";

import SuggestionListView from "./SuggestionListView";

export default class POISearchView extends View {
    metadata = {
        properties: {
            poi: {
                type: "object",
                bindable: true
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
        this.timer = null;
        this.$searchInput.on("input", this._oninput.bind(this));
        this.$searchBtn.on("click", this._onsearchBtnclick.bind(this));
        this.$clearBtn.on("click", this._onclearBtnclick.bind(this));

        this._initSuggestionListView();
    }

    afterInit() {
        super.afterInit();
    }

    _initSuggestionListView() {
        this.suggestionListView = new SuggestionListView("suggestion-list-view");
        this.addSubview(this.suggestionListView);
    }

    setPoi(poi) {
        this.setProperty("poi", poi);
        if (poi) {
            this.$searchInput.val(poi.name);
            this.suggestionListView.hide();
        }
    }

    getKeyword() {
        return this.$searchInput.val();
    }

    _onkeydown(e) {
        if (e.keyCode === 13) {
            this._search();
        }
    }

    _oninput(e) {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }

        this.timer = window.setTimeout(() => {
            this._search();
        }, 300);

    }

    _onsearchBtnclick(e) {
        this._search();
    }

    _onclearBtnclick() {
        this.$searchInput.val("");
        this.suggestionListView.hide();
    }

    _search() {
        const keyword = this.getKeyword();
        if (!(keyword === "" || keyword === null || keyword === undefined)) {
            this.fireSearch({
                keyword
            });
        }
        else {
            this.suggestionListView.hide();
        }
    }
}
