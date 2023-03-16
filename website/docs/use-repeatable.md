---
sidebar_position: 2
---

# useRepeatable

A hook with built-in actions that can mutate a list of repeatable items

### Example

```tsx
import { RepeatableList } from "@thegoodwork/use-repeatable";
import React, { useState } from "react";
import { monsterList, randomMonster } from "utils";
import { MonsterCard } from "components";
import type { Monster } from "types";

// default new item is required
const monster: Monster = randomMonster(monsterList);

// optionally initialise with collection of objects
const initialMonsters = [monsterList[0], monsterList[1]];

function App() {
  const [monsters, setMonsters] = useState<(Monster & { id: string })[]>([]);

  const { items, removeItem, addItem, moveItem } = useRepeatable({
    newItem: monster,
    initialState: initialMonsters,
    onChange: (items: (Monster & { id: string })[]) => {
      setMonsters(items);
    },
  });

  return (
    <div className="repeatableList">
      {items.map((item, index) => {
        return (
          <MonsterCard
            key={item.id}
            moveItem={moveItem}
            item={item}
            index={index}
            removeItem={removeItem}
          />
        );
      })}
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
}
```

### Notes

A string `id` will be generated on every new item's creation.

### Parameters

Parameters used to initialise `useRepeatable`

#### initialState

`initialState: []`
Define the initial state of the repeatable list

#### newItem

`newItem: monster`
Define the value of a newly added item in the repeatable list

#### onChange

`onChange: handleChange`
Optional parameter. Function called upon an update

### Props

### `items`

An array of repeatable items

### `addItem()`

Add item into the list at position index

### `removeItem(index: number)`

Remove an item from the list at position index. <br/>
Require parameters:

- index - The index number of the item to be removed

### `moveItem(from: number, to: number)`

Move an item from position `from` to position `to`

Required parameters:

- from — The index number of the item to be moved
- to — The index number which the moved item will go to

### `updateItem(index: number, item: (any & { id: string }))`

Update an item from position index

Require parameters:

- index — The index number of the item to be updated
- item — The new value of the updated item

:::tip
Do not call `updateItem` with `removeItem` using the same index
:::

### `removeAll()`

Remove all items in the repeatable list
