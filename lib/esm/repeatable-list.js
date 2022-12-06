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
import { DragHandleHorizontalIcon, Cross1Icon, ChevronUpIcon, ChevronDownIcon, } from "@radix-ui/react-icons";
var RepeatableList = function (props) {
    var initialState = props.initialState, listItem = props.listItem, onChange = props.onChange, newItem = props.newItem, CustomAddButton = props.CustomAddButton, CustomRemoveButton = props.CustomRemoveButton, CustomReorderDownButton = props.CustomReorderDownButton, CustomReorderUpButton = props.CustomReorderUpButton, CustomCard = props.CustomCard, draggable = props.draggable;
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
    var defaultAddItemButtonStyles = {
        height: "30px",
        padding: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px auto",
    };
    return (React.createElement("div", null,
        React.createElement(DndContext, { sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd },
            React.createElement(SortableContext, { items: items, strategy: verticalListSortingStrategy }, items.map(function (item, n) { return (React.createElement(SortableCard, { CustomAddButton: CustomAddButton, CustomRemoveButton: CustomRemoveButton, CustomReorderUpButton: CustomReorderUpButton, CustomReorderDownButton: CustomReorderDownButton, CustomCard: CustomCard, item: item, items: items, key: item.id, n: n, removeItem: removeItem, updateItem: function (i) {
                    updateItem(n, i);
                }, moveItem: moveItem, listItem: listItem, showReorderButtons: props.showReorderButtons, draggable: draggable })); }))),
        CustomAddButton ? (React.createElement(CustomAddButton, { onClick: function (e) {
                addItem();
                e.preventDefault();
            } })) : (React.createElement("button", { className: "repeatable-list--add-item-button", style: __assign({}, defaultAddItemButtonStyles), onClick: function (e) {
                addItem();
                e.preventDefault();
            } }, "Add Item"))));
};
var SortableCard = function (_a) {
    var item = _a.item, items = _a.items, n = _a.n, removeItem = _a.removeItem, moveItem = _a.moveItem, listItem = _a.listItem, updateItem = _a.updateItem, 
    //components
    /**Use a custom component for the "Remove Item" button.
     * Additional functions can be added alongside the default function.*/
    CustomRemoveButton = _a.CustomRemoveButton, 
    /**Use a custom component for the reorder up button.
     * Additional functions can be added alongside the default function.*/
    CustomReorderUpButton = _a.CustomReorderUpButton, 
    /**Use a custom component for the reorder down button.
     * Additional functions can be added alongside the default function.*/
    CustomReorderDownButton = _a.CustomReorderDownButton, 
    /**Define your own custom buttons. The button will be added to the side of the existing buttons
     */
    CustomCard = _a.CustomCard, 
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
    var defaultCardStyles = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
        display: "flex",
        gap: "5px",
    };
    var defaultRemoveItemButtonStyles = {
        width: "30px",
        height: "30px",
        padding: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0",
    };
    var defaultReorderItemButtonStyles = {
        width: "30px",
        height: "30px",
        padding: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0",
    };
    if (CustomCard) {
        return React.createElement(CustomCard, __assign({ ref: setNodeRef }, attributes));
    }
    else {
        return (React.createElement("div", __assign({ className: "repeatable-list--card", ref: setNodeRef, style: __assign({}, defaultCardStyles) }, attributes),
            draggable && (React.createElement("b", __assign({ style: {
                    cursor: "grab",
                    width: "30px",
                    height: "30px",
                    padding: "5px",
                } }, listeners),
                React.createElement(DragHandleHorizontalIcon, { style: { width: "100%", height: "100%" } }))),
            React.createElement("div", { className: "repeatable-list--list-item", style: { flexGrow: 1 } }, listItem(item, updateItem, n, items)),
            React.createElement("div", { className: "repeatable-list--control-button-container", style: {
                    display: "flex",
                    flexGrow: 0,
                    gap: "3px",
                } },
                CustomRemoveButton ? (React.createElement(CustomRemoveButton, { onClick: function (e) {
                        if (window.confirm("Are you sure?")) {
                            removeItem(n);
                        }
                        e.preventDefault();
                    } })) : (React.createElement("button", { className: "repeatable-list--remove-item-button", onClick: function (e) {
                        e.preventDefault();
                        if (window.confirm("Are you sure?")) {
                            removeItem(n);
                        }
                    }, style: __assign({}, defaultRemoveItemButtonStyles) },
                    React.createElement(Cross1Icon, null))),
                showReorderButtons && (React.createElement(React.Fragment, null,
                    CustomReorderUpButton ? (React.createElement(CustomReorderUpButton, { onClick: function (e) {
                            e.preventDefault();
                            moveItem(n, n - 1);
                        } })) : (React.createElement("button", { className: "repeatable-list--reorder-up-button", onClick: function (e) {
                            e.preventDefault();
                            moveItem(n, n - 1);
                        }, style: __assign({}, defaultReorderItemButtonStyles) },
                        React.createElement(ChevronUpIcon, null))),
                    CustomReorderDownButton ? (React.createElement(CustomReorderDownButton, { onClick: function (e) {
                            e.preventDefault();
                            moveItem(n, n + 1);
                        } })) : (React.createElement("button", { className: "repeatable-list--reorder-down-button", onClick: function (e) {
                            e.preventDefault();
                            moveItem(n, n + 1);
                        }, style: __assign({}, defaultReorderItemButtonStyles) },
                        React.createElement(ChevronDownIcon, null))))))));
    }
};
export { RepeatableList };
