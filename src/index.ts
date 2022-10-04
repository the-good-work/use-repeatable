import { useReducer } from "react";

type UpdateRepeatableAction =
  | { type: "add-item" }
  | { type: "remove-item"; n: number }
  | { type: "pop-item" };

function useRepeatable<T>({
  initialState,
  newItem,
}: {
  initialState?: T[];
  newItem: T;
}) {
  const fn = (_state: T[], action: UpdateRepeatableAction) => {
    if (action.type === "add-item") {
      return [..._state, newItem];
    }
    return _state;
  };

  const [items, updateItems] = useReducer(fn, initialState || []);

  const addItem = () => {
    updateItems({ type: "add-item" });
  };

  const removeItem = (n?: number) => {
    if (n === undefined && items.length > 0) {
      updateItems({ type: "pop-item" });
    } else if (n && n > -1 && items.length > n) {
      updateItems({ type: "remove-item", n });
    } else {
      // do nothing
    }
  };

  return { items, addItem, removeItem };
}

export { useRepeatable };
