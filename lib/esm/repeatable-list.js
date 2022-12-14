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
import React from "react";
import { useRepeatable } from ".";
import { DndContext, useSensor, useSensors, KeyboardSensor, PointerSensor, closestCenter, } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable, } from "@dnd-kit/sortable";
import { AddItemButton } from "./components/AddItemButton";
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
        return (React.createElement("div", { className: "repeatable-list__wrapper" }, composeOuterComponents({
            repeatable: { items: items, addItem: addItem, removeItem: removeItem, moveItem: moveItem, updateItem: updateItem },
            AddItemButton: AddItemButton({
                CustomComponent: AddItemComponent,
                addItem: addItem,
            }),
            InnerComponents: (React.createElement(DndContext, { sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd },
                React.createElement(SortableContext, { items: items, strategy: verticalListSortingStrategy }, items.map(function (item, n) {
                    return (React.createElement(SortableCard, { composeInnerComponents: composeInnerComponents, AddItemComponent: AddItemComponent, RemoveItemComponent: RemoveItemComponent, ReorderItemUpComponent: ReorderItemUpComponent, ReorderItemDownComponent: ReorderItemDownComponent, DragHandleComponent: DragHandleComponent, item: item, items: items, key: item.id, n: n, addItem: addItem, removeItem: removeItem, updateItem: function (i) {
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
        return (React.createElement("div", { className: "repeatable-list__wrapper" },
            React.createElement(DndContext, { sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd },
                React.createElement(SortableContext, { items: items, strategy: verticalListSortingStrategy }, items.map(function (item, n) {
                    return (React.createElement(SortableCard, { composeInnerComponents: composeInnerComponents, AddItemComponent: AddItemComponent, RemoveItemComponent: RemoveItemComponent, ReorderItemUpComponent: ReorderItemUpComponent, ReorderItemDownComponent: ReorderItemDownComponent, DragHandleComponent: DragHandleComponent, item: item, items: items, key: item.id, n: n, addItem: addItem, removeItem: removeItem, updateItem: function (i) {
                            updateItem(n, i);
                        }, moveItem: moveItem, listItem: listItem, showReorderButtons: props.showReorderButtons, draggable: draggable, repeatable: {
                            items: items,
                            addItem: addItem,
                            removeItem: removeItem,
                            moveItem: moveItem,
                            updateItem: updateItem,
                        } }));
                }))),
            React.createElement(AddItemButton, { CustomComponent: AddItemComponent, addItem: addItem })));
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
            return (React.createElement("b", __assign({ className: "repeatable-list__drag-handle" }, listeners),
                React.createElement(DragHandleComponent, null)));
        }
        else {
            return (React.createElement("b", __assign({ className: "repeatable-list__drag-handle" }, listeners), "\u2261"));
        }
    };
    var RemoveItemButton = function () {
        if (RemoveItemComponent) {
            return (React.createElement(RemoveItemComponent, { onClick: function (e) {
                    removeItem(n);
                    e.preventDefault();
                } }));
        }
        else {
            return (React.createElement("button", { className: "repeatable-list__remove-item-button", onClick: function (e) {
                    removeItem(n);
                    e.preventDefault();
                } }, "x"));
        }
    };
    var ReorderItemButton = function (direction) {
        if (ReorderItemDownComponent) {
            return (React.createElement(ReorderItemDownComponent, { onClick: function (e) {
                    moveItem(n, n + 1);
                    e.preventDefault();
                } }));
        }
        else if (ReorderItemUpComponent) {
            return (React.createElement(ReorderItemUpComponent, { onClick: function (e) {
                    moveItem(n, n - 1);
                    e.preventDefault();
                } }));
        }
        else {
            return (React.createElement("button", { className: "repeatable-reorder-item-".concat(direction, "-button"), onClick: function (e) {
                    moveItem(n, direction === "up" ? n - 1 : n + 1);
                    e.preventDefault();
                } }, direction === "up" ? "^" : "v"));
        }
    };
    if (composeInnerComponents) {
        return (React.createElement("div", __assign({ ref: setNodeRef }, attributes, { style: { transform: CSS.Transform.toString(transform), transition: transition } }), composeInnerComponents({
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
        })));
    }
    else {
        return (React.createElement("div", __assign({ className: "repeatable-list__card", ref: setNodeRef, style: { transform: CSS.Transform.toString(transform), transition: transition } }, attributes),
            draggable && React.createElement(DragHandle, null),
            React.createElement("div", { className: "repeatable-list__list-item" }, listItem(item, updateItem, n, items)),
            React.createElement("div", { className: "repeatable-list__control-button-container" },
                React.createElement(RemoveItemButton, null),
                showReorderButtons && (React.createElement(React.Fragment, null,
                    ReorderItemButton("up"),
                    ReorderItemButton("down"))))));
    }
};
export { RepeatableList };
