var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useReducer } from "react";
import { nanoid } from "nanoid";
import _ from "lodash";
var resetIndex = function (a) {
    return __assign(__assign({}, a), { id: nanoid() });
};
function useRepeatable(_a) {
    var initialState = _a.initialState, newItem = _a.newItem, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b;
    var fn = function (_state, action) {
        if (action.type === "update-item") {
            if (action.n < 0 || action.n > _state.length - 1) {
                throw new Error("Invalid index");
            }
            if (!action.item) {
                throw new Error("Item must be provided");
            }
            var __state = __spreadArray([], _state, true);
            __state[action.n] = __assign(__assign({}, action.item), { id: __state[action.n].id });
            return __state;
        }
        if (action.type === "add-item") {
            var newId = nanoid();
            if (action.item !== undefined) {
                if (action.n && !(action.n < 0 || action.n > _state.length)) {
                    var __state = __spreadArray([], _state, true);
                    __state.splice(action.n, 0, __assign(__assign({}, action.item), { id: newId }));
                    return __state;
                }
                return __spreadArray(__spreadArray([], _state, true), [__assign(__assign({}, action.item), { id: newId })], false);
            }
            return __spreadArray(__spreadArray([], _state, true), [__assign(__assign({}, newItem), { id: newId })], false);
        }
        if (action.type === "remove-item") {
            if (action.n !== undefined && Number(action.n) > -1) {
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
        if (action.type === "remove-all") {
            return [];
        }
        if (action.type === "move-item") {
            if (_state.length === 1) {
                return _state;
            }
            if (action.from < _state.length) {
                var moveItem_1 = _.cloneDeep(_state[action.from]);
                var targetIndex = Math.max(0, Math.min(_state.length - 1, action.to));
                var __state = _state.filter(function (_, n) { return n !== action.from; });
                __state.splice(targetIndex, 0, moveItem_1);
                return __state;
            }
            else {
                return _state;
            }
        }
        return _state;
    };
    var _c = useReducer(fn, initialState ? initialState.map(resetIndex) : []), items = _c[0], updateItems = _c[1];
    useEffect(function () {
        onChange(items);
    }, [items]);
    var addItem = function (item, n) {
        if (item) {
            var itemWithTempId = __assign(__assign({}, item), { id: "" });
            updateItems({ type: "add-item", item: itemWithTempId, n: n });
        }
        else {
            updateItems({ type: "add-item" });
        }
    };
    var removeItem = function (n) {
        if (n === undefined && items.length > 0) {
            updateItems({ type: "remove-item", n: items.length - 1 });
        }
        else if (n !== undefined && n > -1 && items.length > n) {
            updateItems({ type: "remove-item", n: n });
        }
        else {
            // do nothing
        }
    };
    var moveItem = function (from, to) {
        updateItems({ type: "move-item", from: from, to: to });
    };
    var updateItem = function (n, item) {
        updateItems({ type: "update-item", n: n, item: item });
    };
    var removeAll = function () {
        updateItems({ type: "remove-all" });
    };
    return { items: items, addItem: addItem, removeItem: removeItem, moveItem: moveItem, updateItem: updateItem, removeAll: removeAll };
}
export { useRepeatable };