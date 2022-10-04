var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useReducer } from "react";
function useRepeatable(_a) {
    var initialState = _a.initialState, newItem = _a.newItem;
    var fn = function (_state, action) {
        if (action.type === "add-item") {
            return __spreadArray(__spreadArray([], _state, true), [newItem], false);
        }
        return _state;
    };
    var _b = useReducer(fn, initialState || []), items = _b[0], updateItems = _b[1];
    var addItem = function () {
        updateItems({ type: "add-item" });
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
export { useRepeatable };
