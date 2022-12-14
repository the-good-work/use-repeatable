import { RepeatableList } from "@thegoodwork/use-repeatable";

function App() {
  return (
    <div className="App">
      <RepeatableList<{ name: string }>
        onChange={() => null}
        newItem={{ name: "Test" }}
        initialState={[
          { name: "hello" },
          { name: "goodbye" },
          { name: "hola" },
        ]}
        Card={({ item }) => (
          <div>
            {item.name}
            <button>Test</button>
          </div>
        )}
        Layout={({ Cards, addItem }) => (
          <div>
            <h1>hello</h1>
            <Cards />
            <button onClick={() => addItem()}>Add item</button>
          </div>
        )}
      />
    </div>
  );
}

export default App;
