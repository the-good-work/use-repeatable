import { useEffect, useReducer } from "react";
import _ from "lodash";

type UpdateRepeatableAction<T> =
  | { type: "add-item"; item?: T & { id: number } }
  | { type: "remove-item"; n?: number }
  | { type: "update-item"; n: number; item: T }
  | { type: "move-item"; from: number; to: number };

const resetIndex = <A>(i: A, n: number) => ({ ...i, id: n + 1 });

function useRepeatable<T>({
  initialState,
  newItem,
  onChange = () => {},
}: {
  initialState?: T[];
  newItem: T;
  onChange?: (items: T[]) => void;
}) {
  const fn = (
    _state: (T & { id: number })[],
    action: UpdateRepeatableAction<T>
  ) => {
    if (action.type === "update-item") {
      if (action.n < 0 || action.n > _state.length - 1) {
        // invalid index
        throw new Error("Invalid index");
      }
      if (!action.item) {
        throw new Error("Item must be provided");
      }
      const __state = [..._state];
      __state[action.n] = { ...action.item, id: action.n };
      return __state;
    }
    if (action.type === "add-item") {
      if (action.item) {
        return [..._state, { ...action.item, id: 0 }].map<T & { id: number }>(
          resetIndex
        );
      }
      return [..._state, { ...newItem, id: 0 }].map<T & { id: number }>(
        resetIndex
      );
    }
    if (action.type === "remove-item") {
      if (action.n && Number(action.n) > -1) {
        if (action.n < _state.length) {
          return _state
            .filter((_i, n) => n !== action.n)
            .map<T & { id: number }>(resetIndex);
        } else {
          return _state
            .filter((_i, n, a) => n < a.length - 1)
            .map<T & { id: number }>(resetIndex);
        }
      } else {
        return _state
          .filter((_i, n, a) => n < a.length - 1)
          .map<T & { id: number }>(resetIndex);
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

  const addItem = (item?: T) => {
    if (item) {
      const itemWithTempId: T & { id: number } = { ...item, id: 0 };
      updateItems({ type: "add-item", item: itemWithTempId });
    } else {
      updateItems({ type: "add-item" });
    }
  };

  const removeItem = (n?: number) => {
    if (n === undefined && items.length > 0) {
      updateItems({ type: "remove-item", n: items.length - 1 });
    } else if (n && n > -1 && items.length > n) {
      updateItems({ type: "remove-item", n });
    } else {
      // do nothing
    }
  };

  const moveItem = (from: number, to: number) => {
    updateItems({ type: "move-item", from, to });
  };

  return { items, addItem, removeItem, moveItem };
}

export { useRepeatable };
