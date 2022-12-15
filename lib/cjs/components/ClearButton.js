"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearButton = void 0;
var react_1 = __importDefault(require("react"));
function ClearButton(_a) {
    var onClick = _a.onClick, children = _a.children, removeAll = _a.removeAll, className = _a.className;
    return (react_1.default.createElement("button", { onClick: function () {
            if (onClick) {
                onClick();
            }
            removeAll();
        }, className: "".concat(className, " repeatable-list__clear-all-button") }, children));
}
exports.ClearButton = ClearButton;
