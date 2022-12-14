import { RepeatableList } from "@thegoodwork/use-repeatable";

type Item = {
  name: string;
  color: string;
};

function App() {
  return (
    <div className="App">
      <RepeatableList<Item>
        onChange={() => null}
        newItem={{ name: "Test", color: "Blue" }}
        initialState={[]}
        Card={({ item, removeItem, dragHandleListeners }) => (
          <div>
            <button {...dragHandleListeners}>HAHA</button>
            {item.name}
            Color: <input type="text" value={item.color} />
            <button>Test</button>
            <button onClick={() => removeItem()}>Delete this</button>
          </div>
        )}
        Layout={({ Cards, addItem }) => (
          <div>
            <h1>hello</h1>
            <Cards />
            <button onClick={() => addItem()}>Add item</button>

            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" id="animal" />
              <button
                onClick={() =>
                  addItem({
                    name:
                      (document.querySelector("#animal") as HTMLInputElement)
                        ?.value || "Haha",
                    color: (Math.random() * 5).toFixed(3),
                  })
                }
              >
                Add item
              </button>
            </form>
          </div>
        )}
      />
    </div>
  );
}

export default App;
