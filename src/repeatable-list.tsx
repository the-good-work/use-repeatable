import React, { FC, MouseEventHandler, ReactNode } from "react";
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
interface ExtendComponentProps {
  CustomAddButton?: FC<{ onClick: MouseEventHandler<HTMLButtonElement> }>;
  CustomRemoveButton?: FC<{ onClick: MouseEventHandler<HTMLButtonElement> }>;
  CustomReorderUpButton?: FC<{ onClick: MouseEventHandler<HTMLButtonElement> }>;
  CustomReorderDownButton?: FC<{
    onClick: MouseEventHandler<HTMLButtonElement>;
  }>;
  CustomCard?: any;
}

/* exporting interface as such as we want a generic type T in the component props */
interface RepeatableListProps<T> extends ExtendComponentProps {
  listItem: (
    item: T & { id: string },
    updateItem: (item: T & { id: string }) => void,
    index: number,
    items: (T & { id: string })[]
  ) => ReactNode;
  newItem: T;
  initialState?: T[];
  onChange?: (items: (T & { id: string })[]) => void;
  showReorderButtons?: boolean;
  draggable?: boolean;
}

interface SortableCardProps<T> extends ExtendComponentProps {
  item: T & { id: string };
  items: (T & { id: string })[];
  n: number;
  removeItem: (a: number) => void;
  moveItem: (a: number, b: number) => void;
  updateItem: (item: T & { id: string }) => void;
  listItem: (
    item: T & { id: string },
    update: (item: T & { id: string }) => void,
    index: number,
    items: (T & { id: string })[]
  ) => React.ReactNode;
  showReorderButtons?: boolean;
  draggable?: boolean;
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
    CustomAddButton,
    CustomRemoveButton,
    CustomReorderDownButton,
    CustomReorderUpButton,
    CustomCard,
    draggable,
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
              CustomAddButton={CustomAddButton}
              CustomRemoveButton={CustomRemoveButton}
              CustomReorderUpButton={CustomReorderUpButton}
              CustomReorderDownButton={CustomReorderDownButton}
              CustomCard={CustomCard}
              item={item}
              items={items}
              key={item.id}
              n={n}
              removeItem={removeItem}
              updateItem={(i) => {
                updateItem(n, i);
              }}
              moveItem={moveItem}
              listItem={listItem}
              showReorderButtons={props.showReorderButtons}
              draggable={draggable}
            />
          ))}
        </SortableContext>
      </DndContext>
      {CustomAddButton ? (
        <CustomAddButton
          onClick={(e) => {
            addItem();
            e.preventDefault();
          }}
        />
      ) : (
        <button
          className="repeatable-list--add-item-button"
          style={{ ...defaultAddItemButtonStyles }}
          onClick={(e) => {
            addItem();
            e.preventDefault();
          }}
        >
          Add Item
        </button>
      )}
    </div>
  );
};

const SortableCard = <T extends Object>({
  item,
  items,
  n,
  removeItem,
  moveItem,
  listItem,
  updateItem,

  //components
  /**Use a custom component for the "Remove Item" button.
   * Additional functions can be added alongside the default function.*/
  CustomRemoveButton,
  /**Use a custom component for the reorder up button.
   * Additional functions can be added alongside the default function.*/
  CustomReorderUpButton,
  /**Use a custom component for the reorder down button.
   * Additional functions can be added alongside the default function.*/
  CustomReorderDownButton,
  /**Define your own custom buttons. The button will be added to the side of the existing buttons
   */
  CustomCard,

  // options
  /**Enable up and down arrow buttons to reorder items*/
  showReorderButtons = true,
  /**Enable drag handles to reorder items*/
  draggable = true,
}: SortableCardProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const defaultCardStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    gap: "5px",
  };

  const defaultRemoveItemButtonStyles: React.CSSProperties = {
    width: "30px",
    height: "30px",
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
  };
  const defaultReorderItemButtonStyles: React.CSSProperties = {
    width: "30px",
    height: "30px",
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
  };

  if (CustomCard) {
    return <CustomCard ref={setNodeRef} {...attributes} />;
  } else {
    return (
      <div
        className="repeatable-list--card"
        ref={setNodeRef}
        style={{ ...defaultCardStyles }}
        {...attributes}
      >
        {draggable && (
          <b
            style={{
              cursor: "grab",
              width: "30px",
              height: "30px",
              padding: "5px",
            }}
            {...listeners}
          >
            <DragHandleHorizontalIcon
              style={{ width: "100%", height: "100%" }}
            />
          </b>
        )}

        <div className="repeatable-list--list-item" style={{ flexGrow: 1 }}>
          {listItem(item, updateItem, n, items)}
        </div>
        <div
          className="repeatable-list--control-button-container"
          style={{
            display: "flex",
            flexGrow: 0,
            gap: "3px",
          }}
        >
          {CustomRemoveButton ? (
            <CustomRemoveButton
              onClick={(e) => {
                if (window.confirm("Are you sure?")) {
                  removeItem(n);
                }
                e.preventDefault();
              }}
            />
          ) : (
            <button
              className="repeatable-list--remove-item-button"
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm("Are you sure?")) {
                  removeItem(n);
                }
              }}
              style={{
                ...defaultRemoveItemButtonStyles,
              }}
            >
              <Cross1Icon />
            </button>
          )}

          {showReorderButtons && (
            <>
              {CustomReorderUpButton ? (
                <CustomReorderUpButton
                  onClick={(e) => {
                    e.preventDefault();
                    moveItem(n, n - 1);
                  }}
                />
              ) : (
                <button
                  className="repeatable-list--reorder-up-button"
                  onClick={(e) => {
                    e.preventDefault();
                    moveItem(n, n - 1);
                  }}
                  style={{
                    ...defaultReorderItemButtonStyles,
                  }}
                >
                  <ChevronUpIcon />
                </button>
              )}
              {CustomReorderDownButton ? (
                <CustomReorderDownButton
                  onClick={(e) => {
                    e.preventDefault();
                    moveItem(n, n + 1);
                  }}
                />
              ) : (
                <button
                  className="repeatable-list--reorder-down-button"
                  onClick={(e) => {
                    e.preventDefault();
                    moveItem(n, n + 1);
                  }}
                  style={{
                    ...defaultReorderItemButtonStyles,
                  }}
                >
                  <ChevronDownIcon />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
};

export { RepeatableList };
