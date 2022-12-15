import React from "react";

export function AddButton<T>({
  onClick,
  children,
  addItem,
  index,
  newItem,
  className,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
  addItem: (item?: T, n?: number) => void;
  index: number;
  newItem: T;
  className?: string;
}) {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }

        addItem(newItem, index);
      }}
      className={`${className} repeatable-list__add-item-button`}
    >
      {children}
    </button>
  );
}
