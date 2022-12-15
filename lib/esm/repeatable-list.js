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
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AddButton } from "./components/AddButton";
import { RemoveButton } from "./components/RemoveButton";
import { MoveButton } from "./components/MoveButton";
import { ClearButton } from "./components/ClearButton";
/**
 * A modular react component with built-in actions and functions that returns a repeatable list of items
 * @param initialState - Define the initial state of the repeatable list
 * @param newItem - Define the value of a newly added item in the repeatable list
 * @param onChange - Function to update the repeatable list
 * @param Card - Arrange the layout of the sub-components within the component
 * @param Layout - Arrange the layout of the components within the `RepeatableList`
 */
function RepeatableList(_a) {
    var initialState = _a.initialState, newItem = _a.newItem, onChange = _a.onChange, Card = _a.Card, Layout = _a.Layout;
    var _b = useRepeatable({
        initialState: initialState || [],
        newItem: newItem,
        onChange: onChange,
    }), items = _b.items, addItem = _b.addItem, removeItem = _b.removeItem, moveItem = _b.moveItem, updateItem = _b.updateItem, removeAll = _b.removeAll;
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
    return (React.createElement(Layout, { items: items, addItem: addItem, removeItem: removeItem, moveItem: moveItem, updateItem: updateItem, removeAll: removeAll, AddButton: function (_a) {
            var onClick = _a.onClick, children = _a.children, index = _a.index, newItem = _a.newItem, className = _a.className;
            return (React.createElement(AddButton, { onClick: onClick, children: children, addItem: addItem, index: index || items.length - 1, newItem: newItem, className: className }));
        }, ClearButton: function (_a) {
            var onClick = _a.onClick, children = _a.children, className = _a.className;
            return (React.createElement(ClearButton, { onClick: onClick, children: children, className: className, removeAll: removeAll }));
        }, Cards: function () { return (React.createElement("div", { className: "repeatable-list__cards" },
            React.createElement(DndContext, { sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd },
                React.createElement(SortableContext, { items: items, strategy: verticalListSortingStrategy }, items.map(function (item, n) { return (React.createElement(SortableCard, { key: item.id, id: item.id, Card: Card, cardProps: {
                        // Props
                        item: item,
                        items: items,
                        index: n,
                        removeItem: removeItem,
                        moveItem: moveItem,
                        addItem: addItem,
                        updateItem: updateItem,
                        removeAll: removeAll,
                        // Components
                        AddButton: function (_a) {
                            var onClick = _a.onClick, children = _a.children, index = _a.index, newItem = _a.newItem, className = _a.className;
                            return (React.createElement(AddButton, { onClick: onClick, children: children, addItem: addItem, index: index || items.length - 1, newItem: newItem || item, className: className }));
                        },
                        RemoveButton: function (_a) {
                            var onClick = _a.onClick, children = _a.children, index = _a.index, className = _a.className;
                            return (React.createElement(RemoveButton, { onClick: onClick, children: children, removeItem: removeItem, index: index || n, className: className }));
                        },
                        MoveButton: function (_a) {
                            var onClick = _a.onClick, children = _a.children, direction = _a.direction, className = _a.className;
                            return (React.createElement(MoveButton, { direction: direction, onClick: onClick, children: children, moveItem: moveItem, index: n, length: items.length, className: className }));
                        },
                    } })); }))))); } }));
}
function SortableCard(_a) {
    var id = _a.id, Card = _a.Card, cardProps = _a.cardProps;
    var _b = useSortable({ id: id }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition;
    return (React.createElement("div", __assign({ className: "repeatable-list__card", ref: setNodeRef }, attributes, { style: { transform: CSS.Transform.toString(transform), transition: transition } }),
        React.createElement(Card, __assign({}, cardProps, { DragHandle: function (_a) {
                var children = _a.children, className = _a.className;
                return (React.createElement("div", __assign({ style: { cursor: "grab" }, className: "".concat(className, " repeatable-list__drag-handle") }, listeners), children));
            }, dragHandleListeners: listeners }))));
}
export { RepeatableList };
