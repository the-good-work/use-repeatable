"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveButton = void 0;
var react_1 = __importDefault(require("react"));
function RemoveButton(_a) {
    var onClick = _a.onClick, children = _a.children, removeItem = _a.removeItem, index = _a.index, className = _a.className;
    return (react_1.default.createElement("button", { onClick: function () {
            if (onClick) {
                onClick();
            }
            removeItem(index);
        }, className: "".concat(className, " repeatable-list__remove-item-button") }, children));
}
exports.RemoveButton = RemoveButton;
