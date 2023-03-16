---
sidebar_position: 5
---

# `Layout` Prop

The overall layout of the repeatable list. It returns a customisable JSX component. Use this to arrange the components within the `RepeatableList`

---

### Example

```tsx
<RepeatableList
  Layout={({ Cards, addItem }) => {
    return (
      <div className="repeatableList">
        <div>{Cards}</div>
        <button
          className="addButton"
          onClick={() => {
            addItem();
          }}
        >
          Recruit More Monsters!
        </button>
      </div>
    );
  }}
  ...
/>
```

---

### Useable Parameters:

<br/>

### `items`

An array of repeatable items with ids

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

### `ClearButton`

Usage:

```tsx
<ClearButton children={children} className={className} onClick={onClick} />
```

A pre-made "remove all items" button component

Parameters:

- `children` (optional) — Children to be rendered on the button
- `onClick` (optional) — Additional onClick function
- `className` (optional) — Define your own class name

---

### `Cards`

Usage:

```tsx
const MyLayout = ({ Cards, ...}: LayoutProps<Item>) => (
 <div>
   {Cards}
   ...
 </div>
```

Renders a list of [Card](/docs/repeatable-list/card) component.
