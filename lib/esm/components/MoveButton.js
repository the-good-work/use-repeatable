import React from "react";
export function MoveButton(_a) {
    var onClick = _a.onClick, children = _a.children, moveItem = _a.moveItem, index = _a.index, direction = _a.direction, length = _a.length, className = _a.className;
    return (React.createElement("button", { onClick: function () {
            if (onClick) {
                onClick();
            }
            if (direction === "up") {
                moveItem(index, index - 1);
            }
            if (direction === "down") {
                moveItem(index, index + 1);
            }
            if (direction === "top") {
                moveItem(index, 0);
            }
            if (direction === "bottom") {
                moveItem(index, length - 1);
            }
        }, className: "".concat(className, " repeatable-list__move-item-").concat(direction, "-button") }, children));
}
