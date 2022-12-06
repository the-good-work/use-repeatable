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
  customRemoveButton?: any;
  customReorderUpButton?: any;
  customReorderDownButton?: any;
  customButtons?: any;
}
interface ExtendStyleProps extends ExtendComponentProps {
  cardStyles?: React.CSSProperties;
  dragHandleStyles?: React.CSSProperties;
  removeItemButtonStyles?: React.CSSProperties;
  reorderItemButtonStyles?: React.CSSProperties;
  addItemButtonStyles?: React.CSSProperties;
}

/* exporting interface as such as we want a generic type T in the component props */
interface RepeatableListProps<T> extends ExtendStyleProps {
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

interface SortableCardProps<T> extends ExtendStyleProps {
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
  customReorderUpButton?: any;
  customReorderDownButton?: any;
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
    removeItemButtonStyles,
    reorderItemButtonStyles,
    CustomAddButton,
    customButtons,
    customRemoveButton,
    customReorderDownButton,
    customReorderUpButton,
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
              customRemoveButton={customRemoveButton}
              customReorderUpButton={customReorderUpButton}
              customReorderDownButton={customReorderDownButton}
              customButtons={customButtons}
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
              cardStyles={cardStyles}
              addItemButtonStyles={addItemButtonStyles}
              removeItemButtonStyles={removeItemButtonStyles}
              reorderItemButtonStyles={reorderItemButtonStyles}
              dragHandleStyles={dragHandleStyles}
              showReorderButtons={props.showReorderButtons}
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
          style={{ ...defaultAddItemButtonStyles, ...addItemButtonStyles }}
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

  //styles
  /**Customise the repeatable list item cards with CSS*/
  cardStyles,
  /**Customise the reorder item buttons with CSS*/
  reorderItemButtonStyles,
  /**Customise the "Remove Item" buttons with CSS*/
  removeItemButtonStyles,
  /**Customise the drag handle with CSS*/
  dragHandleStyles,

  //components
  /**Use a custom component for the "Remove Item" button.
   * Additional functions can be added alongside the default function.*/
  customRemoveButton,
  /**Use a custom component for the reorder up button.
   * Additional functions can be added alongside the default function.*/
  customReorderUpButton,
  /**Use a custom component for the reorder down button.
   * Additional functions can be added alongside the default function.*/
  customReorderDownButton,
  /**Define your own custom buttons. The button will be added to the side of the existing buttons
   */
  customButtons,

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
    alignItems: "center",
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
  console.log(
    customRemoveButton,
    customReorderDownButton,
    customReorderUpButton,
    customButtons,
    draggable
  );
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
      <div style={{ flexGrow: 1 }}>{listItem(item, updateItem, n, items)}</div>
      <div style={{ display: "flex", flexGrow: 0, gap: "3px" }}>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (window.confirm("Are you sure?")) {
              removeItem(n);
            }
          }}
          style={{
            ...defaultRemoveItemButtonStyles,
            ...removeItemButtonStyles,
          }}
        >
          <Cross1Icon />
        </button>
        {showReorderButtons && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                moveItem(n, n - 1);
              }}
              style={{
                ...defaultReorderItemButtonStyles,
                ...reorderItemButtonStyles,
              }}
            >
              <ChevronUpIcon />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                moveItem(n, n + 1);
              }}
              style={{
                ...defaultReorderItemButtonStyles,
                ...reorderItemButtonStyles,
              }}
            >
              <ChevronDownIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export { RepeatableList };
