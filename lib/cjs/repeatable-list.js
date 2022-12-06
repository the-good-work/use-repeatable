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
    var initialState = props.initialState, listItem = props.listItem, onChange = props.onChange, newItem = props.newItem, CustomAddButton = props.CustomAddButton, CustomRemoveButton = props.CustomRemoveButton, CustomReorderDownButton = props.CustomReorderDownButton, CustomReorderUpButton = props.CustomReorderUpButton, CustomCard = props.CustomCard, draggable = props.draggable;
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
            react_1.default.createElement(sortable_1.SortableContext, { items: items, strategy: sortable_1.verticalListSortingStrategy }, items.map(function (item, n) { return (react_1.default.createElement(SortableCard, { CustomAddButton: CustomAddButton, CustomRemoveButton: CustomRemoveButton, CustomReorderUpButton: CustomReorderUpButton, CustomReorderDownButton: CustomReorderDownButton, CustomCard: CustomCard, item: item, items: items, key: item.id, n: n, removeItem: removeItem, updateItem: function (i) {
                    updateItem(n, i);
                }, moveItem: moveItem, listItem: listItem, showReorderButtons: props.showReorderButtons, draggable: draggable })); }))),
        CustomAddButton ? (react_1.default.createElement(CustomAddButton, { onClick: function (e) {
                addItem();
                e.preventDefault();
            } })) : (react_1.default.createElement("button", { className: "repeatable-list--add-item-button", style: __assign({}, defaultAddItemButtonStyles), onClick: function (e) {
                addItem();
                e.preventDefault();
            } }, "Add Item"))));
};
exports.RepeatableList = RepeatableList;
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
    var _d = (0, sortable_1.useSortable)({ id: item.id }), attributes = _d.attributes, listeners = _d.listeners, setNodeRef = _d.setNodeRef, transform = _d.transform, transition = _d.transition;
    var defaultCardStyles = {
        transform: utilities_1.CSS.Transform.toString(transform),
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
        return react_1.default.createElement(CustomCard, __assign({ ref: setNodeRef }, attributes));
    }
    else {
        return (react_1.default.createElement("div", __assign({ className: "repeatable-list--card", ref: setNodeRef, style: __assign({}, defaultCardStyles) }, attributes),
            draggable && (react_1.default.createElement("b", __assign({ style: {
                    cursor: "grab",
                    width: "30px",
                    height: "30px",
                    padding: "5px",
                } }, listeners),
                react_1.default.createElement(react_icons_1.DragHandleHorizontalIcon, { style: { width: "100%", height: "100%" } }))),
            react_1.default.createElement("div", { className: "repeatable-list--list-item", style: { flexGrow: 1 } }, listItem(item, updateItem, n, items)),
            react_1.default.createElement("div", { className: "repeatable-list--control-button-container", style: {
                    display: "flex",
                    flexGrow: 0,
                    gap: "3px",
                } },
                CustomRemoveButton ? (react_1.default.createElement(CustomRemoveButton, { onClick: function (e) {
                        if (window.confirm("Are you sure?")) {
                            removeItem(n);
                        }
                        e.preventDefault();
                    } })) : (react_1.default.createElement("button", { className: "repeatable-list--remove-item-button", onClick: function (e) {
                        e.preventDefault();
                        if (window.confirm("Are you sure?")) {
                            removeItem(n);
                        }
                    }, style: __assign({}, defaultRemoveItemButtonStyles) },
                    react_1.default.createElement(react_icons_1.Cross1Icon, null))),
                showReorderButtons && (react_1.default.createElement(react_1.default.Fragment, null,
                    CustomReorderUpButton ? (react_1.default.createElement(CustomReorderUpButton, { onClick: function (e) {
                            e.preventDefault();
                            moveItem(n, n - 1);
                        } })) : (react_1.default.createElement("button", { className: "repeatable-list--reorder-up-button", onClick: function (e) {
                            e.preventDefault();
                            moveItem(n, n - 1);
                        }, style: __assign({}, defaultReorderItemButtonStyles) },
                        react_1.default.createElement(react_icons_1.ChevronUpIcon, null))),
                    CustomReorderDownButton ? (react_1.default.createElement(CustomReorderDownButton, { onClick: function (e) {
                            e.preventDefault();
                            moveItem(n, n + 1);
                        } })) : (react_1.default.createElement("button", { className: "repeatable-list--reorder-down-button", onClick: function (e) {
                            e.preventDefault();
                            moveItem(n, n + 1);
                        }, style: __assign({}, defaultReorderItemButtonStyles) },
                        react_1.default.createElement(react_icons_1.ChevronDownIcon, null))))))));
    }
};
