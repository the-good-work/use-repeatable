import React from "react";
export function AddButton(_a) {
    var onClick = _a.onClick, children = _a.children, addItem = _a.addItem, index = _a.index, newItem = _a.newItem, length = _a.length;
    return (React.createElement("button", { onClick: function () {
            if (onClick) {
                onClick();
            }
            if (newItem) {
                addItem(newItem, index || length - 1);
            }
            else {
                addItem();
            }
        }, className: "repeatable-list__add-item-button" }, children));
}
