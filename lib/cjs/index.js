"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRepeatable = void 0;
var react_1 = require("react");
function useRepeatable(_a) {
    var initialState = _a.initialState, newItem = _a.newItem;
    var fn = function (_state, action) {
        if (action.type === "add-item") {
            return __spreadArray(__spreadArray([], _state, true), [newItem], false);
        }
        if (action.type === "remove-item") {
            if (action.n && Number(action.n) > -1) {
                if (action.n < _state.length) {
                    return _state.filter(function (_i, n) { return n !== action.n; });
                }
                else {
                    return _state.filter(function (_i, n, a) { return n < a.length - 1; });
                }
            }
            else {
                return _state.filter(function (_i, n, a) { return n < a.length - 1; });
            }
        }
        return _state;
    };
    var _b = (0, react_1.useReducer)(fn, initialState || []), items = _b[0], updateItems = _b[1];
    var addItem = function (item) {
        if (item) {
            updateItems({ type: "add-item", item: item });
        }
        else {
            updateItems({ type: "add-item" });
        }
    };
    var removeItem = function (n) {
        if (n === undefined && items.length > 0) {
            updateItems({ type: "pop-item" });
        }
        else if (n && n > -1 && items.length > n) {
            updateItems({ type: "remove-item", n: n });
        }
        else {
            // do nothing
        }
    };
    return { items: items, addItem: addItem, removeItem: removeItem };
}
exports.useRepeatable = useRepeatable;
