import React from "react";
export var AddItemButton = function (_a) {
    var CustomComponent = _a.CustomComponent, addItem = _a.addItem;
    if (CustomComponent) {
        return (React.createElement(CustomComponent, { onClick: function (e) {
                addItem();
                e.preventDefault();
            } }));
    }
    else {
        return (React.createElement(Button, { onClick: function (e) {
                addItem();
                e.preventDefault();
            } }));
    }
};
function Button(_a) {
    var onClick = _a.onClick;
    return (React.createElement("button", { className: "repeatable-list__add-item-button", onClick: onClick }, "Add Item"));
}
