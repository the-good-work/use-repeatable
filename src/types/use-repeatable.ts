/**
 * Add `item` into the list at position `index`
 * @param item - Value of item to be added
 * @param index - The index number which the new item will be added to
 */
type AddItem<T> = (item?: T, index?: number) => void;

/**
 * Remove an item from the list at position `index`
 * @param index - The index number of the item to be removed
 */
type RemoveItem = (index: number) => void;

/**
 * Move an item from position `from` to position `to`
 * @param from - The index number of the item to be moved
 * @param to - The index number which the moved item will go to
 */
type MoveItem = (from: number, to: number) => void;

/**
 * Update an `item` from position `index`
 * @param index - The index number of the item to be updated
 * @param item - The new value of the updated item
 */
type UpdateItem<T> = (index: number, item: T & { id: string }) => void;

/**
 * Remove all items in the repeatable list
 */
type RemoveAll = () => void;

interface RepeatableReturnProps<T> {
  /**
   * Add `item` into the list at position `index`
   * @param item - Value of item to be added
   * @param index - The index number which the new item will be added to
   */
  addItem: (item?: T, index?: number) => void;
  /**
   * Remove an item from the list at position `index`
   * @param index - The index number of the item to be removed
   */
  removeItem: (index: number) => void;
  /**
   * Move an item from position `from` to position `to`
   * @param from - The index number of the item to be moved
   * @param to - The index number which the moved item will go to
   */
  moveItem: (from: number, to: number) => void;
  /**
   * Update an `item` from position `index`
   * @param index - The index number of the item to be updated
   * @param item - The new value of the updated item
   */
  updateItem: (index: number, item: T & { id: string }) => void;
  /**
   * Remove all items in the repeatable list
   */
  removeAll: () => void;
  /**
   * An array of repeatable items
   */
  items: (T & { id: string })[];
}

type UpdateRepeatableAction<T> =
  | { type: "add-item"; item?: T & { id: string }; index?: number }
  | { type: "remove-item"; index?: number }
  | { type: "update-item"; index: number; item: T }
  | { type: "move-item"; from: number; to: number }
  | { type: "remove-all" };

export {
  AddItem,
  RemoveItem,
  MoveItem,
  UpdateItem,
  RemoveAll,
  UpdateRepeatableAction,
  RepeatableReturnProps,
};
