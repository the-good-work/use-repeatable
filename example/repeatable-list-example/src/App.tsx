import { RepeatableList } from "@thegoodwork/use-repeatable";
import { CardProps, LayoutProps } from "../../../lib/esm/types";

type Item = {
  name: string;
  age: number;
  number: string;
};

const newItem: Item = { name: "John Doe", number: "0", age: 48 };

const ItemCard = function ({
  item,
  updateItem,
  index,
}: {
  item: Item & { id: string };
  updateItem: (index: number, item: Item) => void;
  index: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          <label>Name:</label>
          <input
            key={`input_${item.id}`}
            value={item.name}
            onChange={(e) => {
              updateItem(index, { ...item, name: e.currentTarget.value });
            }}
          />
        </div>
        <span>Number: {item.number}</span>
        <span>id: {item.id}</span>
      </div>
    </div>
  );
};

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "25px 50px",
        alignItems: "start",
        justifyContent: "start",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <RepeatableList<Item>
        onChange={() => null}
        newItem={{ name: "Test", number: Math.random().toFixed(2), age: 32 }}
        initialState={[]}
        Card={MyCard}
        Layout={({ Cards, addItem, ClearButton }) => (
          <div>
            <h1>With Preset Buttons</h1>
            {Cards}
            <button
              onClick={() => {
                addItem();
              }}
            >
              Test
            </button>
            <ClearButton>Remove All</ClearButton>
          </div>
        )}
      />

      <RepeatableList<Item>
        onChange={() => null}
        newItem={{ name: "Test", number: "0", age: 45 }}
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
                    cursor: "grab",
                  }}
                >
                  ≡
                </span>
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
              <ItemCard
                key={item.id}
                updateItem={updateItem}
                item={item}
                index={index}
              />
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
                  Move Up
                </button>
                <button onClick={() => moveItem(index, index + 1)}>
                  Move Down
                </button>
                <button onClick={() => moveItem(index, 0)}>Move to Top</button>
                <button onClick={() => moveItem(index, items.length - 1)}>
                  Move to Bottom
                </button>

                <button
                  onClick={() =>
                    addItem(
                      { name: "Inserted", number: "Inserted", age: 38 },
                      index + 1
                    )
                  }
                >
                  Insert Item Below
                </button>
                <button onClick={() => addItem(item, index + 1)}>
                  Duplicate Item
                </button>
              </div>
            </div>
          </div>
        )}
        Layout={MyLayout}
      />
    </div>
  );
}

export default App;

const MyCard = ({
  item,
  items,
  index,
  updateItem,
  DragHandle,
  AddButton,
  RemoveButton,
  MoveButton,
}: CardProps<Item>) => (
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
        justifyContent: "start",
        marginBottom: "10px",
        gap: "5px",
      }}
    >
      <DragHandle>≡</DragHandle>
      <div
        style={{
          display: "flex",
          gap: "5px",
          alignItems: "start",
          flexDirection: "column",
        }}
      >
        <h3 style={{ margin: 0 }}>
          Item {index + 1} / {items.length} {item.name}
        </h3>
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "start",
            justifyContent: "space-between",
          }}
        >
          <ItemCard
            key={item.id}
            updateItem={updateItem}
            item={item}
            index={index}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "start",
        }}
      >
        <AddButton newItem={newItem} index={index + 1}>
          Insert Item Below
        </AddButton>
        <AddButton newItem={item} index={index + 1}>
          Duplicate Item
        </AddButton>
        <RemoveButton>Remove Item</RemoveButton>
        <MoveButton direction="up">Move Up</MoveButton>
        <MoveButton direction="down">Move Down</MoveButton>
        <MoveButton direction="top">Move to Top</MoveButton>
        <MoveButton direction="bottom">Move to Bottom</MoveButton>
      </div>
    </div>
  </div>
);

const MyLayout = ({ Cards, addItem, removeAll }: LayoutProps<Item>) => (
  <div>
    <h1>With Customised Buttons</h1>
    {Cards}

    <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: "25px" }}>
      <input type="text" id="names" placeholder="Add a name" />
      <button
        onClick={() =>
          addItem({
            name:
              (document.querySelector("#names") as HTMLInputElement)?.value ||
              "John Doe",
            number: (Math.random() * 5).toFixed(3),
            age: 32,
          })
        }
      >
        Add Item With Text
      </button>

      <button
        onClick={() => {
          removeAll();
        }}
      >
        Remove All
      </button>
    </form>
  </div>
);
