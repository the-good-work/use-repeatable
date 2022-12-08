var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { css } from "@emotion/react";
import { useRepeatable } from ".";
import { DndContext, useSensor, useSensors, KeyboardSensor, PointerSensor, closestCenter, } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable, } from "@dnd-kit/sortable";
import { AddItemButton } from "./components/AddItemButton";
import { ChevronDownIcon, ChevronUpIcon, Cross1Icon, DragHandleHorizontalIcon, } from "@radix-ui/react-icons";
var defaultStyles = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .repeatable-list__control-button-container {\n    display: flex;\n    flex-grow: 0;\n    gap: 3px;\n  }\n  .repeatable-list__remove-item-button {\n    width: 100px;\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 0;\n  }\n  .repeatable-list__reorder-item-button {\n    width: 30px;\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 0;\n  }\n\n  .repeatable-list__add-item-button {\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 10px auto;\n  }\n\n  .repeatable-list__card {\n    display: flex;\n    gap: 5px;\n  }\n\n  .repeatable-list__list-item {\n    display: flex;\n    flex-grow: 1;\n  }\n\n  .repeatable-list__drag-handle {\n    width: 30px;\n    height: 30px;\n    padding: 5px;\n    &:hover {\n      cursor: grab;\n    }\n  }\n\n  .repeatable-list__drag-handle-icon {\n    width: 100%;\n    height: 100%;\n  }\n"], ["\n  .repeatable-list__control-button-container {\n    display: flex;\n    flex-grow: 0;\n    gap: 3px;\n  }\n  .repeatable-list__remove-item-button {\n    width: 100px;\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 0;\n  }\n  .repeatable-list__reorder-item-button {\n    width: 30px;\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 0;\n  }\n\n  .repeatable-list__add-item-button {\n    height: 30px;\n    padding: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin: 10px auto;\n  }\n\n  .repeatable-list__card {\n    display: flex;\n    gap: 5px;\n  }\n\n  .repeatable-list__list-item {\n    display: flex;\n    flex-grow: 1;\n  }\n\n  .repeatable-list__drag-handle {\n    width: 30px;\n    height: 30px;\n    padding: 5px;\n    &:hover {\n      cursor: grab;\n    }\n  }\n\n  .repeatable-list__drag-handle-icon {\n    width: 100%;\n    height: 100%;\n  }\n"])));
var RepeatableList = function (props) {
    var initialState = props.initialState, listItem = props.listItem, onChange = props.onChange, newItem = props.newItem, AddItemComponent = props.AddItemComponent, RemoveItemComponent = props.RemoveItemComponent, ReorderItemDownComponent = props.ReorderItemDownComponent, ReorderItemUpComponent = props.ReorderItemUpComponent, DragHandleComponent = props.DragHandleComponent, composeInnerComponents = props.composeInnerComponents, composeOuterComponents = props.composeOuterComponents, draggable = props.draggable;
    var _a = useRepeatable({
        initialState: initialState || [],
        newItem: newItem,
        onChange: onChange,
    }), items = _a.items, addItem = _a.addItem, removeItem = _a.removeItem, moveItem = _a.moveItem, updateItem = _a.updateItem;
    function handleDragEnd(event) {
        var active = event.active, over = event.over;
        if (over === null) {
            return;
        }
        if (active.id !== over.id) {
            var fromIndex = items.findIndex(function (i) { return i.id === active.id; });
            var toIndex = items.findIndex(function (i) { return i.id === over.id; });
            moveItem(fromIndex, toIndex);
        }
    }
    var sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
    if (composeOuterComponents) {
        return (_jsx("div", __assign({ className: "repeatable-list__wrapper", css: defaultStyles }, { children: composeOuterComponents({
                repeatable: { items: items, addItem: addItem, removeItem: removeItem, moveItem: moveItem, updateItem: updateItem },
                AddItemButton: AddItemButton({
                    CustomComponent: AddItemComponent,
                    addItem: addItem,
                }),
                InnerComponents: (_jsx(DndContext, __assign({ sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd }, { children: _jsx(SortableContext, __assign({ items: items, strategy: verticalListSortingStrategy }, { children: items.map(function (item, n) {
                            return (_jsx(SortableCard, { composeInnerComponents: composeInnerComponents, AddItemComponent: AddItemComponent, RemoveItemComponent: RemoveItemComponent, ReorderItemUpComponent: ReorderItemUpComponent, ReorderItemDownComponent: ReorderItemDownComponent, DragHandleComponent: DragHandleComponent, item: item, items: items, n: n, addItem: addItem, removeItem: removeItem, updateItem: function (i) {
                                    updateItem(n, i);
                                }, moveItem: moveItem, listItem: listItem, showReorderButtons: props.showReorderButtons, draggable: draggable, repeatable: {
                                    items: items,
                                    addItem: addItem,
                                    removeItem: removeItem,
                                    moveItem: moveItem,
                                    updateItem: updateItem,
                                } }, item.id));
                        }) })) }))),
            }) })));
    }
    else {
        return (_jsxs("div", __assign({ className: "repeatable-list__wrapper", css: defaultStyles }, { children: [_jsx(DndContext, __assign({ sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd }, { children: _jsx(SortableContext, __assign({ items: items, strategy: verticalListSortingStrategy }, { children: items.map(function (item, n) {
                            return (_jsx(SortableCard, { composeInnerComponents: composeInnerComponents, AddItemComponent: AddItemComponent, RemoveItemComponent: RemoveItemComponent, ReorderItemUpComponent: ReorderItemUpComponent, ReorderItemDownComponent: ReorderItemDownComponent, DragHandleComponent: DragHandleComponent, item: item, items: items, n: n, addItem: addItem, removeItem: removeItem, updateItem: function (i) {
                                    updateItem(n, i);
                                }, moveItem: moveItem, listItem: listItem, showReorderButtons: props.showReorderButtons, draggable: draggable, repeatable: {
                                    items: items,
                                    addItem: addItem,
                                    removeItem: removeItem,
                                    moveItem: moveItem,
                                    updateItem: updateItem,
                                } }, item.id));
                        }) })) })), _jsx(AddItemButton, { CustomComponent: AddItemComponent, addItem: addItem })] })));
    }
};
var SortableCard = function (_a) {
    var item = _a.item, items = _a.items, n = _a.n, addItem = _a.addItem, removeItem = _a.removeItem, moveItem = _a.moveItem, listItem = _a.listItem, updateItem = _a.updateItem, repeatable = _a.repeatable, 
    //components
    /**Use a custom component for the "Remove Item" button.
     * Additional functions can be added alongside the default function.*/
    RemoveItemComponent = _a.RemoveItemComponent, 
    /**Use a custom component for the reorder up button.
     * Additional functions can be added alongside the default function.*/
    ReorderItemUpComponent = _a.ReorderItemUpComponent, 
    /**Use a custom component for the reorder down button.
     * Additional functions can be added alongside the default function.*/
    ReorderItemDownComponent = _a.ReorderItemDownComponent, 
    /**Use a custom component for the drag handle.
     * Additional functions can be added alongside the default function.*/
    DragHandleComponent = _a.DragHandleComponent, AddItemComponent = _a.AddItemComponent, composeInnerComponents = _a.composeInnerComponents, 
    // options
    /**Enable up and down arrow buttons to reorder items*/
    _b = _a.showReorderButtons, 
    // options
    /**Enable up and down arrow buttons to reorder items*/
    showReorderButtons = _b === void 0 ? true : _b, 
    /**Enable drag handles to reorder items*/
    _c = _a.draggable, 
    /**Enable drag handles to reorder items*/
    draggable = _c === void 0 ? true : _c;
    var _d = useSortable({ id: item.id }), attributes = _d.attributes, listeners = _d.listeners, setNodeRef = _d.setNodeRef, transform = _d.transform, transition = _d.transition;
    var DragHandle = function () {
        if (DragHandleComponent) {
            return (_jsx("b", __assign({ className: "repeatable-list__drag-handle" }, listeners, { children: _jsx(DragHandleComponent, {}) })));
        }
        else {
            return (_jsx("b", __assign({ className: "repeatable-list__drag-handle" }, listeners, { children: _jsx(DragHandleHorizontalIcon, { className: "repeatable-list__drag-handle-icon" }) })));
        }
    };
    var RemoveItemButton = function () {
        if (RemoveItemComponent) {
            return (_jsx(RemoveItemComponent, { onClick: function (e) {
                    removeItem(n);
                    e.preventDefault();
                } }));
        }
        else {
            return (_jsx("button", __assign({ className: "repeatable-list__remove-item-button", onClick: function (e) {
                    removeItem(n);
                    e.preventDefault();
                } }, { children: _jsx(Cross1Icon, {}) })));
        }
    };
    var ReorderItemButton = function (direction) {
        if (ReorderItemDownComponent) {
            return (_jsx(ReorderItemDownComponent, { onClick: function (e) {
                    moveItem(n, n + 1);
                    e.preventDefault();
                } }));
        }
        else if (ReorderItemUpComponent) {
            return (_jsx(ReorderItemUpComponent, { onClick: function (e) {
                    moveItem(n, n - 1);
                    e.preventDefault();
                } }));
        }
        else {
            return (_jsx("button", __assign({ className: "repeatable-reorder-item-".concat(direction, "-button"), onClick: function (e) {
                    moveItem(n, direction === "up" ? n - 1 : n + 1);
                    e.preventDefault();
                } }, { children: direction === "up" ? _jsx(ChevronUpIcon, {}) : _jsx(ChevronDownIcon, {}) })));
        }
    };
    if (composeInnerComponents) {
        return (_jsx("div", __assign({ ref: setNodeRef }, attributes, { style: { transform: CSS.Transform.toString(transform), transition: transition } }, { children: composeInnerComponents({
                repeatable: __assign(__assign({}, repeatable), { index: n, item: item, items: items }),
                DragHandle: DragHandle(),
                ListItem: listItem(item, updateItem, n, items),
                RemoveItemButton: RemoveItemButton(),
                ReorderItemDownButton: ReorderItemButton("down"),
                ReorderItemUpButton: ReorderItemButton("up"),
                AddItemButton: AddItemButton({
                    CustomComponent: AddItemComponent,
                    addItem: addItem,
                }),
            }) })));
    }
    else {
        return (_jsxs("div", __assign({ className: "repeatable-list__card", ref: setNodeRef, style: { transform: CSS.Transform.toString(transform), transition: transition } }, attributes, { children: [draggable && _jsx(DragHandle, {}), _jsx("div", __assign({ className: "repeatable-list__list-item" }, { children: listItem(item, updateItem, n, items) })), _jsxs("div", __assign({ className: "repeatable-list__control-button-container" }, { children: [_jsx(RemoveItemButton, {}), showReorderButtons && (_jsxs(_Fragment, { children: [ReorderItemButton("up"), ReorderItemButton("down")] }))] }))] })));
    }
};
export { RepeatableList };
var templateObject_1;
