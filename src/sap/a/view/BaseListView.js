import View from "./View";

export default class BaseListView extends View {
    metadata = {
        properties: {
            items: { type: "object", bindable: true, defaultValue: [] }
        },
        events: {
            itemClick: {
                parameters: { item: "object" }
            }
        }
    };

    afterInit() {
        super.afterInit();
        this._$itemTemplates = [];
        this.addStyleClass("sap-a-list-view");
        this.$container.on("mousedown", this.getItemElementTag(), this._onclick.bind(this));
    }

    getElementTag() {
        return "ul";
    }

    getItemElementTag() {
        return "li";
    }

    setItems(value = null) {
        if (value === null) {
            value = [];
        }
        this.setProperty("items", value);
        this.$deleteAllItems();
        value.forEach(item => {
            this.$appendItem(item);
        });
    }

    getTypeOfItem(item) {
        return 0;
    }

    getIdOfItem(item) {
        if (item) {
            return item.id;
        }
        else {
            return null;
        }
    }
    getTextOfItem(item) {
        if (item) {
            return item.name;
        }
        else {
            return null;
        }
    }

    removeAllItems() {
        const items = this.getItems();
        items.splice(0);
        this.setItems(items);
    }

    $deleteAllItems() {
        this.$container.children(this.getItemElementTag()).remove();
    }

    addItems(items) {
        if (items && items.length) {
            items.forEach(item => {
                this.addItem(item);
            });
        }
    }

    addItem(item) {
        this.getItems().push(item);
        this.$appendItem(item);
    }

    $appendItem(item) {
        const itemType = this.getTypeOfItem(item);
        const $item = this.$createItem(itemType);
        this.renderItem(item, $item);
        this.$container.append($item);
    }

    renderItem(item, $item) {
        $item.data("item", item);
        $item.attr("id", "i-" + this.getIdOfItem(item));
        $item.children(".text").text(this.getTextOfItem(item));
    }

    $createItem(itemType = 0) {
        if (!this._$itemTemplates[itemType]) {
            this._$itemTemplates[itemType] = this.$createNewItem(itemType);
        }
        return this._$itemTemplates[itemType].clone();
    }

    $createNewItem(itemType = 0) {
        const $item = $(`<${this.getItemElementTag()}><span class="text"/></${this.getItemElementTag()}>`);
        return $item;
    }

    $getItem(item) {
        const id = this.getIdOfItem(item);
        return this.$container.children("#i-" + id);
    }

    _onclick(e) {
        const $item = $(e.currentTarget);
        const item = $item.data("item");
        this.fireItemClick({ item });
    }
}
