"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveButton = void 0;
var react_1 = __importDefault(require("react"));
function MoveButton(_a) {
    var onClick = _a.onClick, children = _a.children, moveItem = _a.moveItem, index = _a.index, direction = _a.direction, length = _a.length, className = _a.className;
    return (react_1.default.createElement("button", { onClick: function () {
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
exports.MoveButton = MoveButton;
