import React, { ReactNode } from "react";
import { useRepeatable } from ".";
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
import {
  DragHandleHorizontalIcon,
  Cross1Icon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";

interface ExtendStyleProps {
  cardStyles?: React.CSSProperties;
  dragHandleStyles?: React.CSSProperties;
  itemButtonStyles?: React.CSSProperties;
  addItemButtonStyles?: React.CSSProperties;
}

/* exporting interface as such as we want a generic type T in the component props */
interface RepeatableListProps<T> extends ExtendStyleProps {
  listItem: (
    item: T & { id: string },
    updateItem: (item: T & { id: string }) => void
  ) => ReactNode;
  newItem: T;
  initialState?: T[];
  onChange?: (items: (T & { id: string })[]) => void;
}

interface SortableCardProps<T> extends ExtendStyleProps {
  item: T & { id: string };
  n: number;
  removeItem: (a: number) => void;
  moveItem: (a: number, b: number) => void;
  updateItem: (item: T & { id: string }) => void;
  listItem: (
    item: T & { id: string },
    update: (item: T & { id: string }) => void
  ) => React.ReactNode;
}

const RepeatableList = <T extends object>(
  props: RepeatableListProps<T> & {
    children?: ({ test }: { test: string }) => ReactNode;
  }
) => {
  const {
    initialState,
    listItem,
    onChange,
    newItem,
    cardStyles,
    dragHandleStyles,
    addItemButtonStyles,
    itemButtonStyles,
  } = props;

  const { items, addItem, removeItem, moveItem, updateItem } = useRepeatable({
    initialState: initialState || [],
    newItem: newItem,
    onChange: onChange,
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

  const defaultAddItemButtonStyles: React.CSSProperties = {
    height: "30px",
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px auto",
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item, n) => (
            <SortableCard
              item={item}
              key={item.id}
              n={n}
              removeItem={removeItem}
              updateItem={(i) => {
                updateItem(n, i);
              }}
              moveItem={moveItem}
              listItem={listItem}
              cardStyles={cardStyles}
              addItemButtonStyles={addItemButtonStyles}
              itemButtonStyles={itemButtonStyles}
              dragHandleStyles={dragHandleStyles}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button
        style={{ ...defaultAddItemButtonStyles, ...addItemButtonStyles }}
        onClick={() => {
          addItem();
        }}
      >
        Add Item
      </button>
    </div>
  );
};

const SortableCard = <T extends Object>({
  item,
  n,
  removeItem,
  moveItem,
  listItem,
  updateItem,

  //styles
  cardStyles,
  itemButtonStyles,
  dragHandleStyles,
}: SortableCardProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const defaultCardStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    gap: "5px",
    alignItems: "center",
  };

  const defaultItemButtonStyles: React.CSSProperties = {
    width: "30px",
    height: "30px",
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...defaultCardStyles, ...cardStyles }}
      {...attributes}
    >
      <b
        style={{
          cursor: "grab",
          width: "30px",
          height: "30px",
          padding: "5px",
          ...dragHandleStyles,
        }}
        {...listeners}
      >
        <DragHandleHorizontalIcon style={{ width: "100%", height: "100%" }} />
      </b>
      <div style={{ flexGrow: 1 }}>{listItem(item, updateItem)}</div>
      <div style={{ display: "flex", flexGrow: 0, gap: "3px" }}>
        <button
          onClick={() => {
            removeItem(n);
          }}
          style={{ ...defaultItemButtonStyles, ...itemButtonStyles }}
        >
          <Cross1Icon />
        </button>
        <button
          onClick={() => {
            moveItem(n, n - 1);
          }}
          style={{ ...defaultItemButtonStyles, ...itemButtonStyles }}
        >
          <ChevronUpIcon />
        </button>
        <button
          onClick={() => {
            moveItem(n, n + 1);
          }}
          style={{ ...defaultItemButtonStyles, ...itemButtonStyles }}
        >
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  );
};

export { RepeatableList };
