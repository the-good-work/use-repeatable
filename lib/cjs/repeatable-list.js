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
    var initialState = props.initialState, listItem = props.listItem, onChange = props.onChange, newItem = props.newItem, cardStyles = props.cardStyles, dragHandleStyles = props.dragHandleStyles, addItemButtonStyles = props.addItemButtonStyles, removeItemButtonStyles = props.removeItemButtonStyles, reorderItemButtonStyles = props.reorderItemButtonStyles, CustomAddButton = props.CustomAddButton, customButtons = props.customButtons, customRemoveButton = props.customRemoveButton, customReorderDownButton = props.customReorderDownButton, customReorderUpButton = props.customReorderUpButton;
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
            react_1.default.createElement(sortable_1.SortableContext, { items: items, strategy: sortable_1.verticalListSortingStrategy }, items.map(function (item, n) { return (react_1.default.createElement(SortableCard, { CustomAddButton: CustomAddButton, customRemoveButton: customRemoveButton, customReorderUpButton: customReorderUpButton, customReorderDownButton: customReorderDownButton, customButtons: customButtons, item: item, items: items, key: item.id, n: n, removeItem: removeItem, updateItem: function (i) {
                    updateItem(n, i);
                }, moveItem: moveItem, listItem: listItem, cardStyles: cardStyles, addItemButtonStyles: addItemButtonStyles, removeItemButtonStyles: removeItemButtonStyles, reorderItemButtonStyles: reorderItemButtonStyles, dragHandleStyles: dragHandleStyles, showReorderButtons: props.showReorderButtons })); }))),
        CustomAddButton ? (react_1.default.createElement(CustomAddButton, { onClick: function (e) {
                addItem();
                e.preventDefault();
            } })) : (react_1.default.createElement("button", { style: __assign(__assign({}, defaultAddItemButtonStyles), addItemButtonStyles), onClick: function (e) {
                addItem();
                e.preventDefault();
            } }, "Add Item"))));
};
exports.RepeatableList = RepeatableList;
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
    var _d = (0, sortable_1.useSortable)({ id: item.id }), attributes = _d.attributes, listeners = _d.listeners, setNodeRef = _d.setNodeRef, transform = _d.transform, transition = _d.transition;
    var defaultCardStyles = {
        transform: utilities_1.CSS.Transform.toString(transform),
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
    return (react_1.default.createElement("div", __assign({ ref: setNodeRef, style: __assign(__assign({}, defaultCardStyles), cardStyles) }, attributes),
        react_1.default.createElement("b", __assign({ style: __assign({ cursor: "grab", width: "30px", height: "30px", padding: "5px" }, dragHandleStyles) }, listeners),
            react_1.default.createElement(react_icons_1.DragHandleHorizontalIcon, { style: { width: "100%", height: "100%" } })),
        react_1.default.createElement("div", { style: { flexGrow: 1 } }, listItem(item, updateItem, n, items)),
        react_1.default.createElement("div", { style: { display: "flex", flexGrow: 0, gap: "3px" } },
            react_1.default.createElement("button", { onClick: function (e) {
                    e.preventDefault();
                    if (window.confirm("Are you sure?")) {
                        removeItem(n);
                    }
                }, style: __assign(__assign({}, defaultRemoveItemButtonStyles), removeItemButtonStyles) },
                react_1.default.createElement(react_icons_1.Cross1Icon, null)),
            showReorderButtons && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("button", { onClick: function (e) {
                        e.preventDefault();
                        moveItem(n, n - 1);
                    }, style: __assign(__assign({}, defaultReorderItemButtonStyles), reorderItemButtonStyles) },
                    react_1.default.createElement(react_icons_1.ChevronUpIcon, null)),
                react_1.default.createElement("button", { onClick: function (e) {
                        e.preventDefault();
                        moveItem(n, n + 1);
                    }, style: __assign(__assign({}, defaultReorderItemButtonStyles), reorderItemButtonStyles) },
                    react_1.default.createElement(react_icons_1.ChevronDownIcon, null)))))));
};
