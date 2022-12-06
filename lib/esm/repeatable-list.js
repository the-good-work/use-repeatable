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
    var initialState = props.initialState, listItem = props.listItem, onChange = props.onChange, newItem = props.newItem, cardStyles = props.cardStyles, dragHandleStyles = props.dragHandleStyles, addItemButtonStyles = props.addItemButtonStyles, removeItemButtonStyles = props.removeItemButtonStyles, reorderItemButtonStyles = props.reorderItemButtonStyles, CustomAddButton = props.CustomAddButton, customButtons = props.customButtons, customRemoveButton = props.customRemoveButton, customReorderDownButton = props.customReorderDownButton, customReorderUpButton = props.customReorderUpButton;
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
            React.createElement(SortableContext, { items: items, strategy: verticalListSortingStrategy }, items.map(function (item, n) { return (React.createElement(SortableCard, { CustomAddButton: CustomAddButton, customRemoveButton: customRemoveButton, customReorderUpButton: customReorderUpButton, customReorderDownButton: customReorderDownButton, customButtons: customButtons, item: item, items: items, key: item.id, n: n, removeItem: removeItem, updateItem: function (i) {
                    updateItem(n, i);
                }, moveItem: moveItem, listItem: listItem, cardStyles: cardStyles, addItemButtonStyles: addItemButtonStyles, removeItemButtonStyles: removeItemButtonStyles, reorderItemButtonStyles: reorderItemButtonStyles, dragHandleStyles: dragHandleStyles, showReorderButtons: props.showReorderButtons })); }))),
        CustomAddButton ? (React.createElement(CustomAddButton, { onClick: function (e) {
                addItem();
                e.preventDefault();
            } })) : (React.createElement("button", { style: __assign(__assign({}, defaultAddItemButtonStyles), addItemButtonStyles), onClick: function (e) {
                addItem();
                e.preventDefault();
            } }, "Add Item"))));
};
var SortableCard = function (_a) {
    var item = _a.item, items = _a.items, n = _a.n, removeItem = _a.removeItem, moveItem = _a.moveItem, listItem = _a.listItem, updateItem = _a.updateItem, 
    //styles
    /**Customise the repeatable list item cards with CSS*/
    cardStyles = _a.cardStyles, 
    /**Customise the reorder item buttons with CSS*/
    reorderItemButtonStyles = _a.reorderItemButtonStyles, 
    /**Customise the "Remove Item" buttons with CSS*/
    removeItemButtonStyles = _a.removeItemButtonStyles, 
    /**Customise the drag handle with CSS*/
    dragHandleStyles = _a.dragHandleStyles, 
    //components
    /**Use a custom component for the "Remove Item" button.
     * Additional functions can be added alongside the default function.*/
    customRemoveButton = _a.customRemoveButton, 
    /**Use a custom component for the reorder up button.
     * Additional functions can be added alongside the default function.*/
    customReorderUpButton = _a.customReorderUpButton, 
    /**Use a custom component for the reorder down button.
     * Additional functions can be added alongside the default function.*/
    customReorderDownButton = _a.customReorderDownButton, 
    /**Define your own custom buttons. The button will be added to the side of the existing buttons
     */
    customButtons = _a.customButtons, 
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
        alignItems: "center",
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
    console.log(customRemoveButton, customReorderDownButton, customReorderUpButton, customButtons, draggable);
    return (React.createElement("div", __assign({ ref: setNodeRef, style: __assign(__assign({}, defaultCardStyles), cardStyles) }, attributes),
        React.createElement("b", __assign({ style: __assign({ cursor: "grab", width: "30px", height: "30px", padding: "5px" }, dragHandleStyles) }, listeners),
            React.createElement(DragHandleHorizontalIcon, { style: { width: "100%", height: "100%" } })),
        React.createElement("div", { style: { flexGrow: 1 } }, listItem(item, updateItem, n, items)),
        React.createElement("div", { style: { display: "flex", flexGrow: 0, gap: "3px" } },
            React.createElement("button", { onClick: function (e) {
                    e.preventDefault();
                    if (window.confirm("Are you sure?")) {
                        removeItem(n);
                    }
                }, style: __assign(__assign({}, defaultRemoveItemButtonStyles), removeItemButtonStyles) },
                React.createElement(Cross1Icon, null)),
            showReorderButtons && (React.createElement(React.Fragment, null,
                React.createElement("button", { onClick: function (e) {
                        e.preventDefault();
                        moveItem(n, n - 1);
                    }, style: __assign(__assign({}, defaultReorderItemButtonStyles), reorderItemButtonStyles) },
                    React.createElement(ChevronUpIcon, null)),
                React.createElement("button", { onClick: function (e) {
                        e.preventDefault();
                        moveItem(n, n + 1);
                    }, style: __assign(__assign({}, defaultReorderItemButtonStyles), reorderItemButtonStyles) },
                    React.createElement(ChevronDownIcon, null)))))));
};
export { RepeatableList };
