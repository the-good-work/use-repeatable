import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useRepeatable } from "@siahlah/use-repeatable";

type Fruit = { color: string; name: string };

const fruit: Fruit = { color: "red", name: "apple" };

function App() {
  const { items, removeItem, addItem } = useRepeatable({ newItem: fruit });

  console.log({ addItem, items, removeItem });

  return (
    <div className="App">
      <header className="App-header">
        <div>{items.map((i) => i.name)}</div>
        <button
          onClick={() => {
            addItem();
          }}
        >
          Test
        </button>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
