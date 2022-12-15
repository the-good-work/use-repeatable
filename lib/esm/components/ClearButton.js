import React from "react";
export function ClearButton(_a) {
    var onClick = _a.onClick, children = _a.children, removeAll = _a.removeAll, className = _a.className;
    return (React.createElement("button", { onClick: function () {
            if (onClick) {
                onClick();
            }
            removeAll();
        }, className: "".concat(className, " repeatable-list__clear-all-button") }, children));
}
