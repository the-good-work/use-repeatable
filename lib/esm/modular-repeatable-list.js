var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { css } from "@emotion/react";
import { useRepeatable } from ".";
var defaultStyles = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .repeatable-list__control-button-container {\n    display: flex;\n    flex-grow: 0;\n    gap: 3px;\n  }\n  .repeatable-list__remove-item-button {\n    width: 100px;\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 0;\n  }\n  .repeatable-list__reorder-item-button {\n    width: 30px;\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 0;\n  }\n\n  .repeatable-list__add-item-button {\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 10px auto;\n  }\n\n  .repeatable-list__card {\n    display: flex;\n    gap: 5px;\n  }\n\n  .repeatable-list__list-item {\n    display: flex;\n    flex-grow: 1;\n  }\n\n  .repeatable-list__drag-handle {\n    width: 30px;\n    height: 30px;\n    padding: 5px;\n    &:hover {\n      cursor: grab;\n    }\n  }\n\n  .repeatable-list__drag-handle-icon {\n    width: 100%;\n    height: 100%;\n  }\n"], ["\n  .repeatable-list__control-button-container {\n    display: flex;\n    flex-grow: 0;\n    gap: 3px;\n  }\n  .repeatable-list__remove-item-button {\n    width: 100px;\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 0;\n  }\n  .repeatable-list__reorder-item-button {\n    width: 30px;\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 0;\n  }\n\n  .repeatable-list__add-item-button {\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 10px auto;\n  }\n\n  .repeatable-list__card {\n    display: flex;\n    gap: 5px;\n  }\n\n  .repeatable-list__list-item {\n    display: flex;\n    flex-grow: 1;\n  }\n\n  .repeatable-list__drag-handle {\n    width: 30px;\n    height: 30px;\n    padding: 5px;\n    &:hover {\n      cursor: grab;\n    }\n  }\n\n  .repeatable-list__drag-handle-icon {\n    width: 100%;\n    height: 100%;\n  }\n"])));
function RepeatableList(_a) {
    var initialState = _a.initialState, newItem = _a.newItem, onChange = _a.onChange, Card = _a.Card, Layout = _a.Layout;
    var _b = useRepeatable({
        initialState: initialState || [],
        newItem: newItem,
        onChange: onChange,
    }), items = _b.items, addItem = _b.addItem, removeItem = _b.removeItem, moveItem = _b.moveItem, updateItem = _b.updateItem;
    return (_jsx("div", { children: _jsx(Layout, { Card: Card }) }));
}
export { RepeatableList };
var templateObject_1;
