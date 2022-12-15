import React from "react";
export function AddButton(_a) {
    var onClick = _a.onClick, children = _a.children, addItem = _a.addItem, index = _a.index, newItem = _a.newItem, className = _a.className;
    return (React.createElement("button", { onClick: function () {
            if (onClick) {
                onClick();
            }
            addItem(newItem, index);
        }, className: "".concat(className, " repeatable-list__add-item-button") }, children));
}
