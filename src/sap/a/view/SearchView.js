import View from "./View";
import SuggestionListView from "./SuggestionListView";

export default class SearchView extends View {
    metadata = {
        properties: {
            poi: { type: "object", bindable: true },
            placeholder: { type: "string" }
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
        this.addStyleClass("search-view");

        this.$container.append(`
            <div class="input-box">
                <input type="search" class="search-input">
                <div class="clear-btn">
                    <span class="iconfont icon-delete"></span>
                </div>
            </div>
        `);

        this.$searchInput = this.$(".search-input");
        const $clearBtn = this.$(".clear-btn");

        this.$searchInput.on("input", this._oninput.bind(this));
        $clearBtn.on("click", this._onclearBtnclick.bind(this));

        this._initSuggestionListView();
        //this._initWarningView();
    }

    afterInit() {
        super.afterInit();
        this.setPlaceHolder(this.getPlaceholder());
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

    setPoi(poi) {
        this.setProperty("poi", poi);

        if (poi) {
            this.$searchInput.val(poi.name);
            this.suggestionListView.hide();
        }
    }

    setPlaceHolder(placeholder) {
        this.setProperty("placeholder", placeholder);

        if (placeholder) {
            this.$searchInput.attr("placeholder", placeholder);
        }
    }

    getKeyword() {
        return this.$searchInput.val();
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

    _oninput(e) {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }

        this.timer = window.setTimeout(() => {
            this._search();
        }, 300);

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
