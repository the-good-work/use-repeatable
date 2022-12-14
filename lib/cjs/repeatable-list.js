"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatableList = void 0;
var react_1 = __importDefault(require("react"));
var _1 = require(".");
var core_1 = require("@dnd-kit/core");
var utilities_1 = require("@dnd-kit/utilities");
var sortable_1 = require("@dnd-kit/sortable");
var AddItemButton_1 = require("./components/AddItemButton");
// const defaultStyles = `
//   .repeatable-list__control-button-container {
//     display: flex;
//     flex-grow: 0;
//     gap: 3px;
//   }
//   .repeatable-list__remove-item-button {
//     width: 100px;
//     height: 30px;
//     padding: 5px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin: 0;
//   }
//   .repeatable-list__reorder-item-button {
//     width: 30px;
//     height: 30px;
//     padding: 5px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin: 0;
//   }
//   .repeatable-list__add-item-button {
//     height: 30px;
//     padding: 5px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin: 10px auto;
//   }
//   .repeatable-list__card {
//     display: flex;
//     gap: 5px;
//   }
//   .repeatable-list__list-item {
//     display: flex;
//     flex-grow: 1;
//   }
//   .repeatable-list__drag-handle {
//     width: 30px;
//     height: 30px;
//     padding: 5px;
//     &:hover {
//       cursor: grab;
//     }
//   }
//   .repeatable-list__drag-handle-icon {
//     width: 100%;
//     height: 100%;
//   }
// `;
var RepeatableList = function (props) {
    var initialState = props.initialState, listItem = props.listItem, onChange = props.onChange, newItem = props.newItem, AddItemComponent = props.AddItemComponent, RemoveItemComponent = props.RemoveItemComponent, ReorderItemDownComponent = props.ReorderItemDownComponent, ReorderItemUpComponent = props.ReorderItemUpComponent, DragHandleComponent = props.DragHandleComponent, composeInnerComponents = props.composeInnerComponents, composeOuterComponents = props.composeOuterComponents, draggable = props.draggable;
    var _a = (0, _1.useRepeatable)({
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
    var sensors = (0, core_1.useSensors)((0, core_1.useSensor)(core_1.PointerSensor), (0, core_1.useSensor)(core_1.KeyboardSensor, { coordinateGetter: sortable_1.sortableKeyboardCoordinates }));
    if (composeOuterComponents) {
        return (react_1.default.createElement("div", { className: "repeatable-list__wrapper" }, composeOuterComponents({
            repeatable: { items: items, addItem: addItem, removeItem: removeItem, moveItem: moveItem, updateItem: updateItem },
            AddItemButton: (0, AddItemButton_1.AddItemButton)({
                CustomComponent: AddItemComponent,
                addItem: addItem,
            }),
            InnerComponents: (react_1.default.createElement(core_1.DndContext, { sensors: sensors, collisionDetection: core_1.closestCenter, onDragEnd: handleDragEnd },
                react_1.default.createElement(sortable_1.SortableContext, { items: items, strategy: sortable_1.verticalListSortingStrategy }, items.map(function (item, n) {
                    return (react_1.default.createElement(SortableCard, { composeInnerComponents: composeInnerComponents, AddItemComponent: AddItemComponent, RemoveItemComponent: RemoveItemComponent, ReorderItemUpComponent: ReorderItemUpComponent, ReorderItemDownComponent: ReorderItemDownComponent, DragHandleComponent: DragHandleComponent, item: item, items: items, key: item.id, n: n, addItem: addItem, removeItem: removeItem, updateItem: function (i) {
                            updateItem(n, i);
                        }, moveItem: moveItem, listItem: listItem, showReorderButtons: props.showReorderButtons, draggable: draggable, repeatable: {
                            items: items,
                            addItem: addItem,
                            removeItem: removeItem,
                            moveItem: moveItem,
                            updateItem: updateItem,
                        } }));
                })))),
        })));
    }
    else {
        return (react_1.default.createElement("div", { className: "repeatable-list__wrapper" },
            react_1.default.createElement(core_1.DndContext, { sensors: sensors, collisionDetection: core_1.closestCenter, onDragEnd: handleDragEnd },
                react_1.default.createElement(sortable_1.SortableContext, { items: items, strategy: sortable_1.verticalListSortingStrategy }, items.map(function (item, n) {
                    return (react_1.default.createElement(SortableCard, { composeInnerComponents: composeInnerComponents, AddItemComponent: AddItemComponent, RemoveItemComponent: RemoveItemComponent, ReorderItemUpComponent: ReorderItemUpComponent, ReorderItemDownComponent: ReorderItemDownComponent, DragHandleComponent: DragHandleComponent, item: item, items: items, key: item.id, n: n, addItem: addItem, removeItem: removeItem, updateItem: function (i) {
                            updateItem(n, i);
                        }, moveItem: moveItem, listItem: listItem, showReorderButtons: props.showReorderButtons, draggable: draggable, repeatable: {
                            items: items,
                            addItem: addItem,
                            removeItem: removeItem,
                            moveItem: moveItem,
                            updateItem: updateItem,
                        } }));
                }))),
            react_1.default.createElement(AddItemButton_1.AddItemButton, { CustomComponent: AddItemComponent, addItem: addItem })));
    }
};
exports.RepeatableList = RepeatableList;
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
    var _d = (0, sortable_1.useSortable)({ id: item.id }), attributes = _d.attributes, listeners = _d.listeners, setNodeRef = _d.setNodeRef, transform = _d.transform, transition = _d.transition;
    var DragHandle = function () {
        if (DragHandleComponent) {
            return (react_1.default.createElement("b", __assign({ className: "repeatable-list__drag-handle" }, listeners),
                react_1.default.createElement(DragHandleComponent, null)));
        }
        else {
            return (react_1.default.createElement("b", __assign({ className: "repeatable-list__drag-handle" }, listeners), "\u2261"));
        }
    };
    var RemoveItemButton = function () {
        if (RemoveItemComponent) {
            return (react_1.default.createElement(RemoveItemComponent, { onClick: function (e) {
                    removeItem(n);
                    e.preventDefault();
                } }));
        }
        else {
            return (react_1.default.createElement("button", { className: "repeatable-list__remove-item-button", onClick: function (e) {
                    removeItem(n);
                    e.preventDefault();
                } }, "x"));
        }
    };
    var ReorderItemButton = function (direction) {
        if (ReorderItemDownComponent) {
            return (react_1.default.createElement(ReorderItemDownComponent, { onClick: function (e) {
                    moveItem(n, n + 1);
                    e.preventDefault();
                } }));
        }
        else if (ReorderItemUpComponent) {
            return (react_1.default.createElement(ReorderItemUpComponent, { onClick: function (e) {
                    moveItem(n, n - 1);
                    e.preventDefault();
                } }));
        }
        else {
            return (react_1.default.createElement("button", { className: "repeatable-reorder-item-".concat(direction, "-button"), onClick: function (e) {
                    moveItem(n, direction === "up" ? n - 1 : n + 1);
                    e.preventDefault();
                } }, direction === "up" ? "^" : "v"));
        }
    };
    if (composeInnerComponents) {
        return (react_1.default.createElement("div", __assign({ ref: setNodeRef }, attributes, { style: { transform: utilities_1.CSS.Transform.toString(transform), transition: transition } }), composeInnerComponents({
            repeatable: __assign(__assign({}, repeatable), { index: n, item: item, items: items }),
            DragHandle: DragHandle(),
            ListItem: listItem(item, updateItem, n, items),
            RemoveItemButton: RemoveItemButton(),
            ReorderItemDownButton: ReorderItemButton("down"),
            ReorderItemUpButton: ReorderItemButton("up"),
            AddItemButton: (0, AddItemButton_1.AddItemButton)({
                CustomComponent: AddItemComponent,
                addItem: addItem,
            }),
        })));
    }
    else {
        return (react_1.default.createElement("div", __assign({ className: "repeatable-list__card", ref: setNodeRef, style: { transform: utilities_1.CSS.Transform.toString(transform), transition: transition } }, attributes),
            draggable && react_1.default.createElement(DragHandle, null),
            react_1.default.createElement("div", { className: "repeatable-list__list-item" }, listItem(item, updateItem, n, items)),
            react_1.default.createElement("div", { className: "repeatable-list__control-button-container" },
                react_1.default.createElement(RemoveItemButton, null),
                showReorderButtons && (react_1.default.createElement(react_1.default.Fragment, null,
                    ReorderItemButton("up"),
                    ReorderItemButton("down"))))));
    }
};
