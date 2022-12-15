import { RepeatableList } from "@thegoodwork/use-repeatable";

type Item = {
  name: string;
  number: string;
};

function RepeatedItem({
  item,
  updateItem,
  index,
}: {
  item: Item;
  updateItem: (n: number, item: Item) => void;
  index: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          <label>Name:</label>
          <input
            value={item.name}
            onChange={(e) => {
              updateItem(index, { ...item, name: e.currentTarget.value });
            }}
          />
        </div>
        <span>Number: {item.number}</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        padding: "25px 50px",
        alignItems: "start",
        justifyContent: "start",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <RepeatableList<Item>
        onChange={() => null}
        newItem={{ name: "Test", number: "0" }}
        initialState={[]}
        Card={({
          item,
          items,
          index,
          removeItem,
          updateItem,
          moveItem,
          addItem,
          dragHandleListeners,
          DragHandle,
          AddButton,
          RemoveButton,
          MoveButton,
        }) => (
          <div
            style={{
              borderRadius: "10px",
              border: "1px solid black",
              padding: "25px",
              boxSizing: "border-box",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "start",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0 }}>
                Item {index + 1} / {items.length} {item.name}
              </h3>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <span
                  {...dragHandleListeners}
                  style={{
                    padding: "5px",
                    boxSizing: "border-box",
                    border: "1px solid black",
                    cursor: "grab",
                  }}
                >
                  ≡
                </span>
                <DragHandle>≡</DragHandle>
                <AddButton
                  newItem={{ name: "1234", number: "11111" }}
                  index={index + 1}
                >
                  ADD
                </AddButton>
                <RemoveButton index={items.length - 1}>REMOVE</RemoveButton>
                <MoveButton direction="up">up</MoveButton>
                <MoveButton direction="down">down</MoveButton>
                <MoveButton direction="top">top</MoveButton>
                <MoveButton direction="bottom">bottom</MoveButton>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <RepeatedItem updateItem={updateItem} item={item} index={index} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <button onClick={() => removeItem(index)}>Remove Item</button>
                <button onClick={() => moveItem(index, index - 1)}>
                  Move Item Up
                </button>
                <button onClick={() => moveItem(index, index + 1)}>
                  Move Item Down
                </button>
                <button
                  onClick={() =>
                    addItem({ name: "Inserted", number: "Inserted" }, index + 1)
                  }
                >
                  Insert Item Below
                </button>
              </div>
            </div>
          </div>
        )}
        Layout={({ Cards, addItem, AddButton }) => (
          <div>
            <h1>Example Repeatable List</h1>
            <Cards />

            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ marginTop: "25px" }}
            >
              <input type="text" id="animal" placeholder="Add a name" />
              <button
                onClick={() =>
                  addItem({
                    name:
                      (document.querySelector("#animal") as HTMLInputElement)
                        ?.value || "Placeholder",
                    number: (Math.random() * 5).toFixed(3),
                  })
                }
              >
                Add Item
              </button>
              <AddButton
                onClick={() => {
                  console.log("ASDF");
                }}
              >
                ADDDDD
              </AddButton>
            </form>
          </div>
        )}
      />
    </div>
  );
}

export default App;
