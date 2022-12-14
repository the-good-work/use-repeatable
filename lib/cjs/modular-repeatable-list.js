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
function RepeatableList(_a) {
    var initialState = _a.initialState, newItem = _a.newItem, onChange = _a.onChange, Card = _a.Card, Layout = _a.Layout;
    var _b = (0, _1.useRepeatable)({
        initialState: initialState || [],
        newItem: newItem,
        onChange: onChange,
    }), items = _b.items, addItem = _b.addItem, removeItem = _b.removeItem, moveItem = _b.moveItem, updateItem = _b.updateItem;
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
    return (react_1.default.createElement(Layout, { items: items, addItem: addItem, removeItem: removeItem, moveItem: moveItem, updateItem: updateItem, AddButton: function (_a) {
            var onClick = _a.onClick, children = _a.children;
            return (react_1.default.createElement(AddButton_1.AddButton, { onClick: onClick, children: children, addItem: addItem }));
        }, 
        // RemoveButton={RemoveButton}
        // InsertButton={InsertButton}
        // MoveUpButton={MoveUpButton}
        // MoveDownButton={MoveDownButton}
        // MoveToLastButton={MoveToLastButton}
        // MoveToTopButton={MoveToTopButton}
        Cards: function () { return (react_1.default.createElement(core_1.DndContext, { sensors: sensors, collisionDetection: core_1.closestCenter, onDragEnd: handleDragEnd },
            react_1.default.createElement(sortable_1.SortableContext, { items: items, strategy: sortable_1.verticalListSortingStrategy }, items.map(function (item, n) { return (react_1.default.createElement(SortableCard, { key: item.id, id: item.id, Card: Card, cardProps: {
                    item: item,
                    items: items,
                    index: n,
                    removeItem: removeItem,
                    moveItem: moveItem,
                    addItem: addItem,
                    updateItem: updateItem,
                    AddButton: function (_a) {
                        var onClick = _a.onClick, children = _a.children;
                        return (react_1.default.createElement(AddButton_1.AddButton, { onClick: onClick, children: children, addItem: addItem }));
                    },
                    // RemoveButton,
                    // InsertButton,
                    // MoveUpButton,
                    // MoveDownButton,
                    // MoveToTopButton,
                    // MoveToLastButton,
                } })); })))); } }));
}
exports.RepeatableList = RepeatableList;
function SortableCard(_a) {
    var id = _a.id, Card = _a.Card, cardProps = _a.cardProps;
    var _b = (0, sortable_1.useSortable)({ id: id }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition;
    return (react_1.default.createElement("div", __assign({ ref: setNodeRef }, attributes, { style: { transform: utilities_1.CSS.Transform.toString(transform), transition: transition } }),
        react_1.default.createElement(Card, __assign({}, cardProps, { DragHandle: function (_a) {
                var children = _a.children;
                return (react_1.default.createElement("div", __assign({ style: { cursor: "grab" }, className: "repeatable-list--drag-handle" }, listeners), children));
            }, dragHandleListeners: listeners }))));
}
