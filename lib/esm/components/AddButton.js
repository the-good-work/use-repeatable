import React from "react";
export function AddButton(_a) {
    var onClick = _a.onClick, children = _a.children, addItem = _a.addItem;
    return (React.createElement("button", { onClick: function () {
            if (onClick) {
                onClick();
            }
            addItem();
        }, className: "repeatable-list__add-item-button" }, children));
}
