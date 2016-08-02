import BaseListView from "./BaseListView";

export default class SuggestionListView extends BaseListView {
    init() {
        super.init();
        this.addStyleClass("suggestion-list-view");

    }

    $createNewItem(itemType = 0) {
        const $item = $(`<${this.getItemElementTag()}><span class="iconfont icon-location h3" /><span class="text" /><span class="district"></${this.getItemElementTag()}>`);
        return $item;
    }

    renderItem(item, $item) {
        super.renderItem(item, $item);
        $item.children(".district").text(this.getDistrictOfItem(item));
    }

    getDistrictOfItem(item) {
        if (item) {
            return item.district;
        }
        else {
            return null;
        }
    }

}
