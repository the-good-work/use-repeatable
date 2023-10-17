import { useEffect, useReducer } from "react";
import { nanoid } from "nanoid";
import _ from "lodash";
import { UpdateRepeatableAction, RepeatableReturnProps } from "./types";

const resetIndex = (a: any) => {
  return { ...a, id: a.id === undefined ? nanoid() : a.id };
};

/**
 * A hook with built-in actions that can mutate a list of repeatable items
 * @param newItem - Define the value of a newly added item in the repeatable list
 * @param initialState - Define the initial state of the repeatable list
 * @param onChange - Function to update the repeatable list
 */
function useRepeatable<T>({
  initialState,
  newItem,
  onChange = () => {},
}: {
  initialState?: T[];
  newItem: T;
  onChange?: (items: (T & { id: string })[]) => void;
}) {
  const fn = (
    _state: (T & { id: string })[],
    action: UpdateRepeatableAction<T>
  ) => {
    if (action.type === "update-item") {
      if (action.index < 0 || action.index > _state.length - 1) {
        throw new Error("Invalid index");
      }
      if (!action.item) {
        throw new Error("Item must be provided");
      }
      const __state = [..._state];

      __state[action.index] = { ...action.item, id: __state[action.index].id };
      return __state;
    }
    if (action.type === "add-item") {
      const newId = nanoid();
      if (action.item !== undefined) {
        if (
          action.index &&
          !(action.index < 0 || action.index > _state.length)
        ) {
          const __state = [..._state];
          __state.splice(action.index, 0, { ...action.item, id: newId });
          return __state;
        }
        return [..._state, { ...action.item, id: newId }];
      }
      return [..._state, { ...newItem, id: newId }];
    }
    if (action.type === "remove-item") {
      if (action.index !== undefined && Number(action.index) > -1) {
        if (action.index < _state.length) {
          return _state.filter((_i, n) => n !== action.index);
        } else {
          return _state.filter((_i, n, a) => n < a.length - 1);
        }
      } else {
        return _state.filter((_i, n, a) => n < a.length - 1);
      }
    }
    if (action.type === "remove-all") {
      return [];
    }
    if (action.type === "move-item") {
      if (_state.length === 1) {
        return _state;
      }
      if (action.from < _state.length) {
        const moveItem = _.cloneDeep(_state[action.from]);
        const targetIndex = Math.max(0, Math.min(_state.length - 1, action.to));
        let __state = _state.filter((_, n) => n !== action.from);
        __state.splice(targetIndex, 0, moveItem);
        return __state;
      } else {
        return _state;
      }
    }
    return _state;
  };

  const [items, updateItems] = useReducer(
    fn,
    initialState ? initialState.map(resetIndex) : []
  );

  useEffect(() => {
    onChange(items);
  }, [items]);

  const addItem = (item?: T, index?: number) => {
    if (item) {
      const itemWithTempId: T & { id: string } = { ...item, id: "" };
      updateItems({ type: "add-item", item: itemWithTempId, index });
    } else {
      updateItems({ type: "add-item" });
    }
  };

  const removeItem = (index?: number) => {
    if (index === undefined && items.length > 0) {
      updateItems({ type: "remove-item", index: items.length - 1 });
    } else if (index !== undefined && index > -1 && items.length > index) {
      updateItems({ type: "remove-item", index });
    } else {
      // do nothing
    }
  };

  const moveItem = (from: number, to: number) => {
    updateItems({ type: "move-item", from, to });
  };

  const updateItem = (index: number, item: T) => {
    updateItems({ type: "update-item", index, item });
  };

  const removeAll = () => {
    updateItems({ type: "remove-all" });
  };

  const repeatable: RepeatableReturnProps<T> = {
    items,
    addItem,
    removeItem,
    moveItem,
    updateItem,
    removeAll,
  };

  return repeatable;
}

export { useRepeatable };
