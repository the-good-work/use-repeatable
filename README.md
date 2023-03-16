# useRepeatable

`useRepeatable` is a React hook that helps to make "repeater fields" simple. Given an array of a particular type of objects, it exposes simple methods to add, remove or reorder objects, while exposing the objects on a React state variable.

You can also assign a callback function for when changes happen to the array of objects.

## Example Usage

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
      {items.map((item) => {
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

# RepeatableList

Alternatively, you may use the component `RepeatableList` to integrate your repeatable list seamlessly within your React code. The `RepeatableList` provides functional components `Card` and `Layout` as props that allows you to compose your repeatable list.

### Example Usage

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
