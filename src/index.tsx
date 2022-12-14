import { useEffect, useReducer } from "react";
import { nanoid } from "nanoid";
import { RepeatableList } from "./modular-repeatable-list";

import _ from "lodash";
import { UpdateRepeatableAction } from "./types";

const resetIndex = (a: any) => {
  return { ...a, id: nanoid() };
};

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
      if (action.n < 0 || action.n > _state.length - 1) {
        throw new Error("Invalid index");
      }
      if (!action.item) {
        throw new Error("Item must be provided");
      }
      const __state = [..._state];

      __state[action.n] = { ...action.item, id: __state[action.n].id };
      return __state;
    }
    if (action.type === "add-item") {
      const newId = nanoid();
      if (action.item !== undefined) {
        if (action.n && !(action.n < 0 || action.n > _state.length)) {
          const __state = [..._state];
          __state.splice(action.n, 0, { ...action.item, id: newId });
          return __state;
        }
        return [..._state, { ...action.item, id: newId }];
      }
      return [..._state, { ...newItem, id: newId }];
    }
    if (action.type === "remove-item") {
      if (action.n !== undefined && Number(action.n) > -1) {
        if (action.n < _state.length) {
          return _state.filter((_i, n) => n !== action.n);
        } else {
          return _state.filter((_i, n, a) => n < a.length - 1);
        }
      } else {
        return _state.filter((_i, n, a) => n < a.length - 1);
      }
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

  const addItem = (item?: T, n?: number) => {
    if (item) {
      const itemWithTempId: T & { id: string } = { ...item, id: "" };
      updateItems({ type: "add-item", item: itemWithTempId, n });
    } else {
      updateItems({ type: "add-item" });
    }
  };

  const removeItem = (n?: number) => {
    if (n === undefined && items.length > 0) {
      updateItems({ type: "remove-item", n: items.length - 1 });
    } else if (n !== undefined && n > -1 && items.length > n) {
      updateItems({ type: "remove-item", n });
    } else {
      // do nothing
    }
  };

  const moveItem = (from: number, to: number) => {
    updateItems({ type: "move-item", from, to });
  };

  const updateItem = (n: number, item: T) => {
    updateItems({ type: "update-item", n, item });
  };

  return { items, addItem, removeItem, moveItem, updateItem };
}

export { useRepeatable, RepeatableList };
