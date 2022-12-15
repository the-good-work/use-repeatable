import React from "react";

export function AddButton<T>({
  onClick,
  children,
  addItem,
  index,
  newItem,
  length,
  className,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
  addItem: (item?: T, n?: number) => void;
  index?: number;
  newItem?: T;
  length: number;
  className?: string;
}) {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
        if (newItem) {
          addItem(newItem, index || length - 1);
        } else {
          addItem();
        }
      }}
      className={`${className} repeatable-list__add-item-button`}
    >
      {children}
    </button>
  );
}
