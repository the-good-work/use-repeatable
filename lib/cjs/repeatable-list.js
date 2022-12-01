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
var react_icons_1 = require("@radix-ui/react-icons");
var RepeatableList = function (props) {
    var initialState = props.initialState, listItem = props.listItem, onChange = props.onChange, newItem = props.newItem, cardStyles = props.cardStyles, dragHandleStyles = props.dragHandleStyles, addItemButtonStyles = props.addItemButtonStyles, itemButtonStyles = props.itemButtonStyles;
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
    var defaultAddItemButtonStyles = {
        height: "30px",
        padding: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px auto",
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(core_1.DndContext, { sensors: sensors, collisionDetection: core_1.closestCenter, onDragEnd: handleDragEnd },
            react_1.default.createElement(sortable_1.SortableContext, { items: items, strategy: sortable_1.verticalListSortingStrategy }, items.map(function (item, n) { return (react_1.default.createElement(SortableCard, { item: item, key: item.id, n: n, removeItem: removeItem, updateItem: function (i) {
                    updateItem(n, i);
                }, moveItem: moveItem, listItem: listItem, cardStyles: cardStyles, addItemButtonStyles: addItemButtonStyles, itemButtonStyles: itemButtonStyles, dragHandleStyles: dragHandleStyles, showReorderButtons: props.showReorderButtons })); }))),
        react_1.default.createElement("button", { style: __assign(__assign({}, defaultAddItemButtonStyles), addItemButtonStyles), onClick: function (e) {
                addItem();
                e.preventDefault();
            } }, "Add Item")));
};
exports.RepeatableList = RepeatableList;
var SortableCard = function (_a) {
    var item = _a.item, n = _a.n, removeItem = _a.removeItem, moveItem = _a.moveItem, listItem = _a.listItem, updateItem = _a.updateItem, 
    //styles
    cardStyles = _a.cardStyles, itemButtonStyles = _a.itemButtonStyles, dragHandleStyles = _a.dragHandleStyles, 
    // options
    _b = _a.showReorderButtons, 
    // options
    showReorderButtons = _b === void 0 ? true : _b;
    var _c = (0, sortable_1.useSortable)({ id: item.id }), attributes = _c.attributes, listeners = _c.listeners, setNodeRef = _c.setNodeRef, transform = _c.transform, transition = _c.transition;
    var defaultCardStyles = {
        transform: utilities_1.CSS.Transform.toString(transform),
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
    return (react_1.default.createElement("div", __assign({ ref: setNodeRef, style: __assign(__assign({}, defaultCardStyles), cardStyles) }, attributes),
        react_1.default.createElement("b", __assign({ style: __assign({ cursor: "grab", width: "30px", height: "30px", padding: "5px" }, dragHandleStyles) }, listeners),
            react_1.default.createElement(react_icons_1.DragHandleHorizontalIcon, { style: { width: "100%", height: "100%" } })),
        react_1.default.createElement("div", { style: { flexGrow: 1 } }, listItem(item, updateItem)),
        react_1.default.createElement("div", { style: { display: "flex", flexGrow: 0, gap: "3px" } },
            react_1.default.createElement("button", { onClick: function (e) {
                    e.preventDefault();
                    if (window.confirm("Are you sure?")) {
                        removeItem(n);
                    }
                }, style: __assign(__assign({}, defaultItemButtonStyles), itemButtonStyles) },
                react_1.default.createElement(react_icons_1.Cross1Icon, null)),
            showReorderButtons && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("button", { onClick: function (e) {
                        e.preventDefault();
                        moveItem(n, n - 1);
                    }, style: __assign(__assign({}, defaultItemButtonStyles), itemButtonStyles) },
                    react_1.default.createElement(react_icons_1.ChevronUpIcon, null)),
                react_1.default.createElement("button", { onClick: function (e) {
                        e.preventDefault();
                        moveItem(n, n + 1);
                    }, style: __assign(__assign({}, defaultItemButtonStyles), itemButtonStyles) },
                    react_1.default.createElement(react_icons_1.ChevronDownIcon, null)))))));
};
