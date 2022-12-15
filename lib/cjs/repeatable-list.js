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
var sortable_1 = require("@dnd-kit/sortable");
var utilities_1 = require("@dnd-kit/utilities");
var AddButton_1 = require("./components/AddButton");
var RemoveButton_1 = require("./components/RemoveButton");
var MoveButton_1 = require("./components/MoveButton");
var ClearButton_1 = require("./components/ClearButton");
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
    var _b = (0, _1.useRepeatable)({
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
    var sensors = (0, core_1.useSensors)((0, core_1.useSensor)(core_1.PointerSensor), (0, core_1.useSensor)(core_1.KeyboardSensor, { coordinateGetter: sortable_1.sortableKeyboardCoordinates }));
    return (react_1.default.createElement(Layout, { items: items, addItem: addItem, removeItem: removeItem, moveItem: moveItem, updateItem: updateItem, removeAll: removeAll, AddButton: function (_a) {
            var onClick = _a.onClick, children = _a.children, index = _a.index, newItem = _a.newItem, className = _a.className;
            return (react_1.default.createElement(AddButton_1.AddButton, { onClick: onClick, children: children, addItem: addItem, index: index || items.length - 1, newItem: newItem, className: className }));
        }, ClearButton: function (_a) {
            var onClick = _a.onClick, children = _a.children, className = _a.className;
            return (react_1.default.createElement(ClearButton_1.ClearButton, { onClick: onClick, children: children, className: className, removeAll: removeAll }));
        }, Cards: function () { return (react_1.default.createElement("div", { className: "repeatable-list__cards" },
            react_1.default.createElement(core_1.DndContext, { sensors: sensors, collisionDetection: core_1.closestCenter, onDragEnd: handleDragEnd },
                react_1.default.createElement(sortable_1.SortableContext, { items: items, strategy: sortable_1.verticalListSortingStrategy }, items.map(function (item, n) { return (react_1.default.createElement(SortableCard, { key: item.id, id: item.id, Card: Card, cardProps: {
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
                            return (react_1.default.createElement(AddButton_1.AddButton, { onClick: onClick, children: children, addItem: addItem, index: index || items.length - 1, newItem: newItem || item, className: className }));
                        },
                        RemoveButton: function (_a) {
                            var onClick = _a.onClick, children = _a.children, index = _a.index, className = _a.className;
                            return (react_1.default.createElement(RemoveButton_1.RemoveButton, { onClick: onClick, children: children, removeItem: removeItem, index: index || n, className: className }));
                        },
                        MoveButton: function (_a) {
                            var onClick = _a.onClick, children = _a.children, direction = _a.direction, className = _a.className;
                            return (react_1.default.createElement(MoveButton_1.MoveButton, { direction: direction, onClick: onClick, children: children, moveItem: moveItem, index: n, length: items.length, className: className }));
                        },
                    } })); }))))); } }));
}
exports.RepeatableList = RepeatableList;
function SortableCard(_a) {
    var id = _a.id, Card = _a.Card, cardProps = _a.cardProps;
    var _b = (0, sortable_1.useSortable)({ id: id }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition;
    return (react_1.default.createElement("div", __assign({ className: "repeatable-list__card", ref: setNodeRef }, attributes, { style: { transform: utilities_1.CSS.Transform.toString(transform), transition: transition } }),
        react_1.default.createElement(Card, __assign({}, cardProps, { DragHandle: function (_a) {
                var children = _a.children, className = _a.className;
                return (react_1.default.createElement("div", __assign({ style: { cursor: "grab" }, className: "".concat(className, " repeatable-list__drag-handle") }, listeners), children));
            }, dragHandleListeners: listeners }))));
}
