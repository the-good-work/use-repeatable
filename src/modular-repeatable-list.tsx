import React from "react";
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
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { AddButton } from "./components/AddButton";

function RepeatableList<T>({
  initialState,
  newItem,
  onChange,
  Card,
  Layout,
}: RepeatableListProps<T>) {
  const { items, addItem, removeItem, moveItem, updateItem } = useRepeatable<T>(
    {
      initialState: initialState || [],
      newItem: newItem,
      onChange: onChange,
    }
  );

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
    <Layout
      items={items}
      addItem={addItem}
      removeItem={removeItem}
      moveItem={moveItem}
      updateItem={updateItem}
      AddButton={({ onClick, children }) => (
        <AddButton onClick={onClick} children={children} addItem={addItem} />
      )}
      // RemoveButton={RemoveButton}
      // InsertButton={InsertButton}
      // MoveUpButton={MoveUpButton}
      // MoveDownButton={MoveDownButton}
      // MoveToLastButton={MoveToLastButton}
      // MoveToTopButton={MoveToTopButton}
      Cards={() => (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item, n) => (
              <SortableCard
                key={item.id}
                id={item.id}
                Card={Card}
                cardProps={{
                  // Props
                  item,
                  items,
                  index: n,
                  removeItem,
                  moveItem,
                  addItem,
                  updateItem,

                  // Components
                  AddButton: ({ onClick, children }) => (
                    <AddButton
                      onClick={onClick}
                      children={children}
                      addItem={addItem}
                    />
                  ),
                  // RemoveButton,
                  // InsertButton,
                  // MoveUpButton,
                  // MoveDownButton,
                  // MoveToTopButton,
                  // MoveToLastButton,
                }}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    />
  );
}

function SortableCard<T>({ id, Card, cardProps }: SortableCardProps<T>) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <Card
        {...cardProps}
        DragHandle={({ children }: { children: React.ReactNode }) => (
          <div
            style={{ cursor: "grab" }}
            className="repeatable-list--drag-handle"
            {...listeners}
          >
            {children}
          </div>
        )}
        dragHandleListeners={listeners}
      />
    </div>
  );
}

export { RepeatableList };

interface RepeatableListProps<T> {
  initialState: T[];
  newItem: T;
  onChange?: (items: (T & { id: string })[]) => void;
  Card: React.FC<CardProps<T>>;
  Layout: React.FC<LayoutProps<T>>;
}

interface SortableCardProps<T> {
  id: string;
  Card: React.FC<CardProps<T>>;
  cardProps: Omit<CardProps<T>, "dragHandleListeners">;
}

interface CardProps<T> {
  // Props
  item: T;
  items: T[];
  index: number;
  removeItem: (n: number) => void;
  moveItem: (from: number, to: number) => void;
  addItem: (item?: T, n?: number) => void;
  updateItem: (n: number, item: T) => void;
  dragHandleListeners?: SyntheticListenerMap;

  // Pre-made components
  DragHandle?: React.FC<{ children?: React.ReactNode }>;
  AddButton?: React.FC<{ children?: React.ReactNode; onClick?: () => void }>;
  RemoveButton?: React.FC<{ children?: React.ReactNode; onClick?: () => void }>;
  MoveUpButton?: React.FC<{ children?: React.ReactNode; onClick?: () => void }>;
  MoveDownButton?: React.FC<{
    children?: React.ReactNode;
    onClick?: () => void;
  }>;
  MoveToTopButton?: React.FC<{
    children?: React.ReactNode;
    onClick?: () => void;
  }>;
  MoveToLastButton?: React.FC<{
    children?: React.ReactNode;
    onClick?: () => void;
  }>;
  InsertButton?: React.FC<{ children?: React.ReactNode; onClick?: () => void }>;
}

interface LayoutProps<T> {
  // Props
  items: T[];
  removeItem: () => void;
  moveItem: (from: number, to: number) => void;
  addItem: (item?: T, n?: number) => void;
  updateItem: (n: number, item: T) => void;

  // Components
  Cards: React.FC<{}>;
  DragHandle?: React.FC<{ children?: React.ReactNode }>;
  AddButton?: React.FC<{ children?: React.ReactNode; onClick?: () => void }>;
  RemoveButton?: React.FC<{ children?: React.ReactNode; onClick?: () => void }>;
  MoveUpButton?: React.FC<{ children?: React.ReactNode; onClick?: () => void }>;
  MoveDownButton?: React.FC<{
    children?: React.ReactNode;
    onClick?: () => void;
  }>;
  MoveToTopButton?: React.FC<{
    children?: React.ReactNode;
    onClick?: () => void;
  }>;
  MoveToLastButton?: React.FC<{
    children?: React.ReactNode;
    onClick?: () => void;
  }>;
  InsertButton?: React.FC<{ children?: React.ReactNode; onClick?: () => void }>;
}
