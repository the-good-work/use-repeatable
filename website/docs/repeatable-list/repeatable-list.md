---
sidebar_position: 3
---

# RepeatableList

A modular react component with built-in actions and functions that returns a repeatable list of items

### Example

```tsx
import { RepeatableList } from "@thegoodwork/use-repeatable";
import React, { useState } from "react";
import { monsterList, randomMonster } from "utils";
import { MonsterCard } from "components";
import type { Monster } from "types";

function App() {
  const monster: Monster = randomMonster(monsterList);
  const [monsters, setMonsters] = useState<(Monster & { id: string })[]>([]);

  return (
    <RepeatableList
      onChange={(items) => {
        setMonsters(items);
      }}
      initialState={[]}
      newItem={monster}
      Card={({ DragHandle, item, index, removeItem }) => (
        <MonsterCard
          DragHandle={DragHandle}
          item={item}
          index={index}
          removeItem={removeItem}
        />
      )}
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
    />
  );
}
```

### Notes

Like `useRepeatable`, a string `id` will be generated on every new item's creation.

### Props

### `initialState`

Define the initial state of the repeatable list

### `newItem`

Define the value of a newly added item in the repeatable list

### `onChange`

Called with updated items whenever list is updated

### Functional Component Props

These props are used to render the components within `RepeatableList`.

### [Card](/docs/repeatable-list/card)

### [Layout](/docs/repeatable-list/layout)
