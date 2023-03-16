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
import { AddButton } from "./components/AddButton";
import { RemoveButton } from "./components/RemoveButton";
import { MoveButton } from "./components/MoveButton";
import { ClearButton } from "./components/ClearButton";
import { RepeatableListProps, SortableCardProps } from "./types";

/**
 * A modular react component with built-in actions and functions that returns a repeatable list of items
 * @param initialState - Define the initial state of the repeatable list
 * @param newItem - Define the value of a newly added item in the repeatable list
 * @param onChange - Called with updated items whenever list is updated
 * @param Card - Layout of an individual card
 * @param Layout - Arrange the layout of the components within the `RepeatableList`
 */
function RepeatableList<T>({
  initialState,
  newItem,
  onChange,
  Card,
  Layout,
}: RepeatableListProps<T>) {
  const { items, addItem, removeItem, moveItem, updateItem, removeAll } =
    useRepeatable<T>({
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

  return Layout({
    items,
    addItem,
    removeItem,
    moveItem,
    updateItem,
    removeAll,
    AddButton: ({ onClick, children, index, newItem, className }) => (
      <AddButton
        onClick={onClick}
        children={children}
        addItem={addItem}
        index={index || items.length - 1}
        newItem={newItem}
        className={className}
      />
    ),
    ClearButton: ({ children, onClick, className }) => (
      <div>
        <ClearButton
          removeAll={removeAll}
          children={children}
          className={className}
          onClick={onClick}
        />
      </div>
    ),
    Cards: Cards({
      sensors,
      closestCenter,
      handleDragEnd,
      items,
      verticalListSortingStrategy,
      Card: Card,
      removeItem,
      moveItem,
      addItem,
      updateItem,
      removeAll,
    }),
  });
}

function Cards({
  sensors,
  closestCenter,
  handleDragEnd,
  items,
  verticalListSortingStrategy,
  Card,
  removeItem,
  moveItem,
  addItem,
  updateItem,
  removeAll,
}: any) {
  return (
    <div className="repeatable-list__cards">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item: any, n: number) => (
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
                removeAll,

                // Components
                AddButton: ({
                  onClick,
                  children,
                  index,
                  newItem,
                  className,
                }) => (
                  <AddButton
                    onClick={onClick}
                    children={children}
                    addItem={addItem}
                    index={index || items.length - 1}
                    newItem={newItem || item}
                    className={className}
                  />
                ),
                RemoveButton: ({ onClick, children, index, className }) => (
                  <RemoveButton
                    onClick={onClick}
                    children={children}
                    removeItem={removeItem}
                    index={index || n}
                    className={className}
                  />
                ),

                MoveButton: ({ onClick, children, direction, className }) => (
                  <MoveButton
                    direction={direction}
                    onClick={onClick}
                    children={children}
                    moveItem={moveItem}
                    index={n}
                    length={items.length}
                    className={className}
                  />
                ),
              }}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

const SortableCard = function <T>({
  id,
  Card,
  cardProps,
}: SortableCardProps<T>) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  return (
    <div
      className="repeatable-list__card"
      ref={setNodeRef}
      {...attributes}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {Card({
        ...cardProps,
        DragHandle: ({
          children,
          className,
        }: {
          children: React.ReactNode;
          className: string;
        }) => (
          <div
            style={{ cursor: "grab" }}
            className={`${className} repeatable-list__drag-handle`}
            {...listeners}
          >
            {children}
          </div>
        ),
        dragHandleListeners: listeners,
      })}
    </div>
  );
};

export { RepeatableList };
