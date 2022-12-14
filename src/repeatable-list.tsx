/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { css } from "@emotion/react";
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

import { AddItemButton } from "./components/AddItemButton";
import { RepeatableListProps, SortableCardProps } from "./types";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cross1Icon,
  DragHandleHorizontalIcon,
} from "@radix-ui/react-icons";

const defaultStyles = css`
  .repeatable-list__control-button-container {
    display: flex;
    flex-grow: 0;
    gap: 3px;
  }
  .repeatable-list__remove-item-button {
    width: 100px;
    height: 30px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  .repeatable-list__reorder-item-button {
    width: 30px;
    height: 30px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }

  .repeatable-list__add-item-button {
    height: 30px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
  }

  .repeatable-list__card {
    display: flex;
    gap: 5px;
  }

  .repeatable-list__list-item {
    display: flex;
    flex-grow: 1;
  }

  .repeatable-list__drag-handle {
    width: 30px;
    height: 30px;
    padding: 5px;
    &:hover {
      cursor: grab;
    }
  }

  .repeatable-list__drag-handle-icon {
    width: 100%;
    height: 100%;
  }
`;

const RepeatableList = <T extends {}>(
  props: RepeatableListProps<T> & {
    children?: ({ test }: { test: string }) => ReactNode;
  }
) => {
  const {
    initialState,
    listItem,
    onChange,
    newItem,
    AddItemComponent,
    RemoveItemComponent,
    ReorderItemDownComponent,
    ReorderItemUpComponent,
    DragHandleComponent,
    composeInnerComponents,
    composeOuterComponents,
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

  if (composeOuterComponents) {
    return (
      <div className="repeatable-list__wrapper" css={defaultStyles}>
        {composeOuterComponents({
          repeatable: { items, addItem, removeItem, moveItem, updateItem },
          AddItemButton: AddItemButton({
            CustomComponent: AddItemComponent,
            addItem: addItem,
          }),
          InnerComponents: (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                {items.map((item, n) => {
                  return (
                    <SortableCard
                      composeInnerComponents={composeInnerComponents}
                      AddItemComponent={AddItemComponent}
                      RemoveItemComponent={RemoveItemComponent}
                      ReorderItemUpComponent={ReorderItemUpComponent}
                      ReorderItemDownComponent={ReorderItemDownComponent}
                      DragHandleComponent={DragHandleComponent}
                      item={item}
                      items={items}
                      key={item.id}
                      n={n}
                      addItem={addItem}
                      removeItem={removeItem}
                      updateItem={(i) => {
                        updateItem(n, i);
                      }}
                      moveItem={moveItem}
                      listItem={listItem}
                      showReorderButtons={props.showReorderButtons}
                      draggable={draggable}
                      repeatable={{
                        items,
                        addItem,
                        removeItem,
                        moveItem,
                        updateItem,
                      }}
                    />
                  );
                })}
              </SortableContext>
            </DndContext>
          ),
        })}
      </div>
    );
  } else {
    return (
      <div className="repeatable-list__wrapper" css={defaultStyles}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item, n) => {
              return (
                <SortableCard
                  composeInnerComponents={composeInnerComponents}
                  AddItemComponent={AddItemComponent}
                  RemoveItemComponent={RemoveItemComponent}
                  ReorderItemUpComponent={ReorderItemUpComponent}
                  ReorderItemDownComponent={ReorderItemDownComponent}
                  DragHandleComponent={DragHandleComponent}
                  item={item}
                  items={items}
                  key={item.id}
                  n={n}
                  addItem={addItem}
                  removeItem={removeItem}
                  updateItem={(i) => {
                    updateItem(n, i);
                  }}
                  moveItem={moveItem}
                  listItem={listItem}
                  showReorderButtons={props.showReorderButtons}
                  draggable={draggable}
                  repeatable={{
                    items,
                    addItem,
                    removeItem,
                    moveItem,
                    updateItem,
                  }}
                />
              );
            })}
          </SortableContext>
        </DndContext>

        <AddItemButton CustomComponent={AddItemComponent} addItem={addItem} />
      </div>
    );
  }
};

const SortableCard = <T extends Object>({
  item,
  items,
  n,
  addItem,
  removeItem,
  moveItem,
  listItem,
  updateItem,
  repeatable,

  //components
  /**Use a custom component for the "Remove Item" button.
   * Additional functions can be added alongside the default function.*/
  RemoveItemComponent,
  /**Use a custom component for the reorder up button.
   * Additional functions can be added alongside the default function.*/
  ReorderItemUpComponent,
  /**Use a custom component for the reorder down button.
   * Additional functions can be added alongside the default function.*/
  ReorderItemDownComponent,
  /**Use a custom component for the drag handle.
   * Additional functions can be added alongside the default function.*/
  DragHandleComponent,
  AddItemComponent,
  composeInnerComponents,

  // options
  /**Enable up and down arrow buttons to reorder items*/
  showReorderButtons = true,
  /**Enable drag handles to reorder items*/
  draggable = true,
}: SortableCardProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const DragHandle = () => {
    if (DragHandleComponent) {
      return (
        <b className="repeatable-list__drag-handle" {...listeners}>
          <DragHandleComponent />
        </b>
      );
    } else {
      return (
        <b className="repeatable-list__drag-handle" {...listeners}>
          <DragHandleHorizontalIcon className="repeatable-list__drag-handle-icon" />
        </b>
      );
    }
  };

  const RemoveItemButton = () => {
    if (RemoveItemComponent) {
      return (
        <RemoveItemComponent
          onClick={(e) => {
            removeItem(n);
            e.preventDefault();
          }}
        />
      );
    } else {
      return (
        <button
          className="repeatable-list__remove-item-button"
          onClick={(e) => {
            removeItem(n);
            e.preventDefault();
          }}
        >
          <Cross1Icon />
        </button>
      );
    }
  };

  const ReorderItemButton = (direction: "up" | "down") => {
    if (ReorderItemDownComponent) {
      return (
        <ReorderItemDownComponent
          onClick={(e) => {
            moveItem(n, n + 1);
            e.preventDefault();
          }}
        />
      );
    } else if (ReorderItemUpComponent) {
      return (
        <ReorderItemUpComponent
          onClick={(e) => {
            moveItem(n, n - 1);
            e.preventDefault();
          }}
        />
      );
    } else {
      return (
        <button
          className={`repeatable-reorder-item-${direction}-button`}
          onClick={(e) => {
            moveItem(n, direction === "up" ? n - 1 : n + 1);
            e.preventDefault();
          }}
        >
          {direction === "up" ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      );
    }
  };

  if (composeInnerComponents) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        style={{ transform: CSS.Transform.toString(transform), transition }}
      >
        {composeInnerComponents({
          repeatable: { ...repeatable, index: n, item, items },
          DragHandle: DragHandle(),
          ListItem: listItem(item, updateItem, n, items),
          RemoveItemButton: RemoveItemButton(),
          ReorderItemDownButton: ReorderItemButton("down"),
          ReorderItemUpButton: ReorderItemButton("up"),
          AddItemButton: AddItemButton({
            CustomComponent: AddItemComponent,
            addItem: addItem,
          }),
        })}
      </div>
    );
  } else {
    return (
      <div
        className={`repeatable-list__card`}
        ref={setNodeRef}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        {...attributes}
      >
        {draggable && <DragHandle />}

        <div className="repeatable-list__list-item">
          {listItem(item, updateItem, n, items)}
        </div>
        <div className="repeatable-list__control-button-container">
          <RemoveItemButton />

          {showReorderButtons && (
            <>
              {ReorderItemButton("up")}
              {ReorderItemButton("down")}
            </>
          )}
        </div>
      </div>
    );
  }
};

export { RepeatableList };
