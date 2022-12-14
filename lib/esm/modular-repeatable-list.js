import React from "react";
import { useRepeatable } from ".";
function RepeatableList(_a) {
    var initialState = _a.initialState, newItem = _a.newItem, onChange = _a.onChange, Card = _a.Card, Layout = _a.Layout;
    var _b = useRepeatable({
        initialState: initialState || [],
        newItem: newItem,
        onChange: onChange,
    }), items = _b.items, addItem = _b.addItem;
    return (React.createElement(Layout, { addItem: addItem, Cards: function () { return (React.createElement("div", null,
            "asdjfkasdf",
            items.map(function (item) { return (React.createElement(Card, { key: item.id, item: item })); }))); } }));
}
export { RepeatableList };
