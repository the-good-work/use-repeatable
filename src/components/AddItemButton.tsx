import React, { FC, MouseEventHandler } from "react";
import { AddItem } from "../types";

export const AddItemButton = <T extends object>({
  CustomComponent,
  addItem,
}: {
  CustomComponent:
    | FC<{
        className?: string | undefined;
        onClick: MouseEventHandler<HTMLButtonElement>;
      }>
    | undefined;
  addItem: AddItem<T>;
}) => {
  if (CustomComponent) {
    return (
      <CustomComponent
        onClick={(e) => {
          addItem();
          e.preventDefault();
        }}
      />
    );
  } else {
    return (
      <Button
        onClick={(e) => {
          addItem();
          e.preventDefault();
        }}
      />
    );
  }
};

function Button({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className="repeatable-list__add-item-button" onClick={onClick}>
      Add Item
    </button>
  );
}
