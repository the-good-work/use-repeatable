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

function RepeatableList<T>({
  initialState,
  newItem,
  onChange,
  Card,
  Layout,
}: RepeatableListProps<T>) {
  const { items, addItem, removeItem, moveItem } = useRepeatable<T>({
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

  return (
    <Layout
      addItem={addItem}
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
                  item,
                  items,
                  index: n,
                  removeItem: () => removeItem(n),
                  moveItem,
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
      <Card {...cardProps} dragHandleListeners={listeners} />
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
  item: T;
  items: T[];
  index: number;
  removeItem: () => void;
  moveItem: (from: number, to: number) => void;
  dragHandleListeners?: SyntheticListenerMap;
}

interface LayoutProps<T> {
  Cards: React.FC<{}>;
  addItem: (item?: T) => void;
}
