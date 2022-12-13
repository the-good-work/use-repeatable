/** @jsxImportSource @emotion/react */
import React, { FC } from "react";
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

function RepeatableList<T>({
  initialState,
  newItem,
  onChange,
  Card,
  Layout,
}: ModularRepeatableListProps<T>) {
  const { items, addItem, removeItem, moveItem, updateItem } = useRepeatable<T>(
    {
      initialState: initialState || [],
      newItem: newItem,
      onChange: onChange,
    }
  );
  return (
    <div>
      <Layout Card={Card} />
    </div>
  );
}

export { RepeatableList };

interface ModularRepeatableListProps<T> {
  initialState: T[];
  newItem: T;
  onChange: (items: (T & { id: string })[]) => void;
  Card: React.FC<{}>;
  Layout: React.FC<{ Card: React.FC<{}> }>;
}
