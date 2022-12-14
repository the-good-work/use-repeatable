"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatableList = void 0;
var react_1 = __importDefault(require("react"));
var _1 = require(".");
function RepeatableList(_a) {
    var initialState = _a.initialState, newItem = _a.newItem, onChange = _a.onChange, Card = _a.Card, Layout = _a.Layout;
    var _b = (0, _1.useRepeatable)({
        initialState: initialState || [],
        newItem: newItem,
        onChange: onChange,
    }), items = _b.items, addItem = _b.addItem;
    return (react_1.default.createElement(Layout, { addItem: addItem, Cards: function () { return (react_1.default.createElement("div", null,
            "asdjfkasdf",
            items.map(function (item) { return (react_1.default.createElement(Card, { key: item.id, item: item })); }))); } }));
}
exports.RepeatableList = RepeatableList;
