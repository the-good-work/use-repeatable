"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemButton = void 0;
var react_1 = __importDefault(require("react"));
var AddItemButton = function (_a) {
    var CustomComponent = _a.CustomComponent, addItem = _a.addItem;
    if (CustomComponent) {
        return (react_1.default.createElement(CustomComponent, { onClick: function (e) {
                addItem();
                e.preventDefault();
            } }));
    }
    else {
        return (react_1.default.createElement(Button, { onClick: function (e) {
                addItem();
                e.preventDefault();
            } }));
    }
};
exports.AddItemButton = AddItemButton;
function Button(_a) {
    var onClick = _a.onClick;
    return (react_1.default.createElement("button", { className: "repeatable-list__add-item-button", onClick: onClick }, "Add Item"));
}
