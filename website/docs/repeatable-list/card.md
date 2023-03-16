---
sidebar_position: 4
---

# `Card` Prop

The layout of an individual card. It returns a customisable JSX component. Use this to arrange the components within the each repeatable item.

---

### Example

```tsx
<RepeatableList
  Card={({ DragHandle, item, index, removeItem }) => (
    <MonsterCard
      DragHandle={DragHandle}
      item={item}
      index={index}
      removeItem={removeItem}
    />
  )}
  ...
/>
```

---

### Useable Parameters:

<br/>

### `item`

A single repeatable item with id

---

### `items`

An array of repeatable items with ids

---

### `index`

The index of the item

---

### `addItem`

Usage:

`addItem(index: number, item: (any & {id: string}))`

A function that adds an item into the list at position index. The default `newItem` will be added if called with no parameters.

Parameters:

- `item` (optional) — Value of item to be added

- `index` (optional) — The index number which the new item will be added to

---

### `removeItem`

Usage:

`removeItem(index: number)`

A function that removes an item from the list at position index

Parameter:

- `index` — The index number of the item to be removed

---

### `moveItem`

Usage:

`moveItem(from: number, to: number)`

A function that moves an item from position from to position to

Parameters:

- `from` — The index number of the item to be moved

- `to` — The index number which the moved item will go to

---

### `dragHandleListeners`

Listener to be added to create a drag handle. Simple add {...dragHandleListeners} into an element.

---

### `removeAll`

Usage:

`removeAll()`

A function that removes all items in the repeatable list

---

### `updateItem()`

Usage:

`updateItem(index: number, item: (any & {id: string}))`

A function that updates an item from position index

Parameters:

- `index` — The index number of the item to be updated
- `item` — The new value of the updated item

---

### `AddButton`

Usage:

```tsx
<AddButton
  onClick={onClick}
  children={children}
  index={index || items.length - 1}
  newItem={newItem}
  className={className}
/>
```

A pre-made "add item" button component

Parameters:

- `children` (optional) — Children to be rendered on the button
- `index` (optional) — Indicate the position to insert the new item into
- `onClick` (optional) — Additional onClick function
- `newItem` (optional) — The new item to be added into index
- `className` (optional) — Define your own class name

---

### `RemoveButton`

Usage:

```tsx
<RemoveButton
  index={index}
  children={children}
  className={className}
  onClick={onClick}
/>
```

A pre-made "remove item" button component

Parameters:

- `children` (optional) — Children to be rendered on the button
- `onClick` (optional) — Additional onClick function
- `index` (optional) - Define the index of the item to be removed
- `className` (optional) — Define your own class name

---

### `MoveButton`

Usage:

```tsx
<MoveButton
  direction={"up"}
  children={children}
  className={className}
  onClick={onClick}
/>
```

A pre-made "move item" button component

Parameters:

- `children` (optional) — Children to be rendered on the button
- `onClick` (optional) — Additional onClick function
- `className` (optional) — Define your own class name
- `direction` - The direction where the item will be moved.
  - accepts `"up" | "down" | "top" | "bottom"`

---

### `DragHandle`

Usage:

```tsx
<DragHandle children={children} className={className} />
```

A pre-made "drag handle" button component

Parameters:

- `children` (optional) — Children to be rendered on the button
- `className` (optional) — Define your own class name
