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
    var initialState = props.initialState, listItem = props.listItem, onChange = props.onChange, newItem = props.newItem, cardStyles = props.cardStyles, dragHandleStyles = props.dragHandleStyles, addItemButtonStyles = props.addItemButtonStyles, itemButtonStyles = props.itemButtonStyles;
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
            React.createElement(SortableContext, { items: items, strategy: verticalListSortingStrategy }, items.map(function (item, n) { return (React.createElement(SortableCard, { item: item, key: item.id, n: n, removeItem: removeItem, updateItem: function (i) {
                    updateItem(n, i);
                }, moveItem: moveItem, listItem: listItem, cardStyles: cardStyles, addItemButtonStyles: addItemButtonStyles, itemButtonStyles: itemButtonStyles, dragHandleStyles: dragHandleStyles })); }))),
        React.createElement("button", { style: __assign(__assign({}, defaultAddItemButtonStyles), addItemButtonStyles), onClick: function (e) {
                addItem();
                e.preventDefault();
            } }, "Add Item")));
};
var SortableCard = function (_a) {
    var item = _a.item, n = _a.n, removeItem = _a.removeItem, moveItem = _a.moveItem, listItem = _a.listItem, updateItem = _a.updateItem, 
    //styles
    cardStyles = _a.cardStyles, itemButtonStyles = _a.itemButtonStyles, dragHandleStyles = _a.dragHandleStyles;
    var _b = useSortable({ id: item.id }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition;
    var defaultCardStyles = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
        display: "flex",
        gap: "5px",
        alignItems: "center",
    };
    var defaultItemButtonStyles = {
        width: "30px",
        height: "30px",
        padding: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0",
    };
    return (React.createElement("div", __assign({ ref: setNodeRef, style: __assign(__assign({}, defaultCardStyles), cardStyles) }, attributes),
        React.createElement("b", __assign({ style: __assign({ cursor: "grab", width: "30px", height: "30px", padding: "5px" }, dragHandleStyles) }, listeners),
            React.createElement(DragHandleHorizontalIcon, { style: { width: "100%", height: "100%" } })),
        React.createElement("div", { style: { flexGrow: 1 } }, listItem(item, updateItem)),
        React.createElement("div", { style: { display: "flex", flexGrow: 0, gap: "3px" } },
            React.createElement("button", { onClick: function (e) {
                    e.preventDefault();
                    if (window.confirm("Are you sure?")) {
                        removeItem(n);
                    }
                }, style: __assign(__assign({}, defaultItemButtonStyles), itemButtonStyles) },
                React.createElement(Cross1Icon, null)),
            React.createElement("button", { onClick: function (e) {
                    e.preventDefault();
                    moveItem(n, n - 1);
                }, style: __assign(__assign({}, defaultItemButtonStyles), itemButtonStyles) },
                React.createElement(ChevronUpIcon, null)),
            React.createElement("button", { onClick: function (e) {
                    e.preventDefault();
                    moveItem(n, n + 1);
                }, style: __assign(__assign({}, defaultItemButtonStyles), itemButtonStyles) },
                React.createElement(ChevronDownIcon, null)))));
};
export { RepeatableList };
