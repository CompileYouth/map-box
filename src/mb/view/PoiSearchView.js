import View from "sap/a/view/View";

import SuggestionListView from "./SuggestionListView";

export default class POISearchView extends View {
    metadata = {
        properties: {
            selectedPoi: { type: "object", bindable: true },
            queryPoi: { type: "object", bindable: true }
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
        const $clearBtn = this.$(".clear-btn");
        const $searchBtn = this.$(".search-btn");

        this.$container.on("keydown", this._onkeydown.bind(this));
        this.$searchInput.on("input", this._oninput.bind(this));
        $searchBtn.on("click", this._onsearchBtnclick.bind(this));
        $clearBtn.on("click", this._onclearBtnclick.bind(this));

        this._initSuggestionListView();
        this._initWarningView();
    }

    afterInit() {
        super.afterInit();
    }

    _initSuggestionListView() {
        this.suggestionListView = new SuggestionListView("suggestion-list-view");
        this.addSubview(this.suggestionListView);
    }

    _initWarningView() {
        this.$container.append(`
            <div class="search-warning">
                <span class="arrow"></span>
                <div class="warning-container">
                    <span class="iconfont icon-warning"></span>
                    <span class="warning-text"></span>
                </div>
            </div>
        `);
    }

    setSelectedPoi(selectedPoi) {
        this.setProperty("selectedPoi", selectedPoi);
        if (selectedPoi) {
            this.$searchInput.val(selectedPoi.name);
            this.suggestionListView.hide();
        }
    }

    setQueryPoi(queryPoi) {
        this.setProperty("queryPoi", queryPoi);

        if (queryPoi) {
            this.$searchInput.val(queryPoi.name);
        }
    }

    showWarning(reason) {
        this.$(".warning-text").text(reason);
        this.$(".search-warning").addClass("active");

        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }

        this.timer = window.setTimeout(() => {
            this.$(".search-warning").removeClass("active");
        }, 3000);
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
        if (!(keyword.trim() === "" || keyword === null || keyword === undefined)) {
            this.fireSearch({
                keyword
            });
        }
        else {
            this.suggestionListView.hide();
        }
    }
}
