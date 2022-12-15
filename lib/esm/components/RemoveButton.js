import React from "react";
export function RemoveButton(_a) {
    var onClick = _a.onClick, children = _a.children, removeItem = _a.removeItem, index = _a.index;
    return (React.createElement("button", { onClick: function () {
            if (onClick) {
                onClick();
            }
            removeItem(index);
        }, className: "repeatable-remove-item-button" }, children));
}
