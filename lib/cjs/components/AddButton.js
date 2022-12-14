"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddButton = void 0;
var react_1 = __importDefault(require("react"));
function AddButton(_a) {
    var onClick = _a.onClick, children = _a.children, addItem = _a.addItem;
    return (react_1.default.createElement("button", { onClick: function () {
            if (onClick) {
                onClick();
            }
            addItem();
        }, className: "repeatable-list__add-item-button" }, children));
}
exports.AddButton = AddButton;
