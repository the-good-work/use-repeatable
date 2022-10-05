import React from "react";
import { useRepeatable } from "@siahlah/use-repeatable";
import {
  DndContext,
  useSensor,
  useSensors,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import "./App.css";

type Fruit = { color: string; name: string };

const fruit: Fruit = { color: "red", name: "apple" };

const initialFruits = [
  { color: "red", name: "apple" },
  { color: "red", name: "apple" },
];

function App() {
  const { items, removeItem, addItem, moveItem } = useRepeatable({
    newItem: fruit,
    initialState: initialFruits,
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over === null) {
      return;
    }
    if (active.id !== over.id) {
      const fromIndex = items.findIndex((i) => i.id === active.id);
      const toIndex = items.findIndex((i) => i.id === over.id);
      moveItem(fromIndex, toIndex);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  return (
    <div className="App">
      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((i, n) => (
              <SortableCard
                item={i}
                key={i.id}
                n={n}
                removeItem={removeItem}
                moveItem={moveItem}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => {
            addItem();
          }}
        >
          Add default fruit
        </button>

        <div>
          <input type="text" id="name" />
          <button
            onClick={() => {
              const textInput = document.getElementById(
                "name"
              ) as HTMLInputElement;

              if (!textInput) {
                return;
              }
              const name = textInput.value;
              textInput.value = "";
              addItem({
                name,
                color: "random",
              });
            }}
          >
            Add fruit with custom name
          </button>
        </div>
        <button
          onClick={() => {
            removeItem();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default App;

function SortableCard({
  item,
  n,
  removeItem,
  moveItem,
}: {
  item: Fruit & { id: number };
  n: number;
  removeItem: (a: number) => void;
  moveItem: (a: number, b: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <b style={{ cursor: "grab" }} {...listeners}>
        =
      </b>
      {item.id} / {item.name}{" "}
      <button
        onClick={() => {
          removeItem(n);
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          moveItem(n, n - 2);
        }}
      >
        &uarr; &uarr;
      </button>
      <button
        onClick={() => {
          moveItem(n, n + 2);
        }}
      >
        &darr; &darr;
      </button>
    </div>
  );
}
