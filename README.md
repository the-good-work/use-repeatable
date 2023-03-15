# useRepeatable

`useRepeatable` is a React hook that helps to make "repeater fields" simple. Given an array of a particular type of objects, it exposes simple methods to add, remove or reorder objects, while exposing the objects on a React state variable.

You can also assign a callback function for when changes happen to the array of objects.

## Example Usage

```tsx
type Fruit = { color: string; name: string };

// default new item is required
const fruit: Fruit = { color: "red", name: "apple" };

// optionally initialise with collection of objects
const initialFruits = [
  { color: "red", name: "apple" },
  { color: "orange", name: "orange" },
];

function App() {
  const { items, removeItem, addItem, moveItem } = useRepeatable({
    newItem: fruit,
    initialState: initialFruits,
  });

...
}
```
