import React from "react";

export function AddButton({
  onClick,
  children,
  addItem,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  addItem: any;
}) {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
        addItem();
      }}
      className="repeatable-list__add-item-button"
    >
      {children}
    </button>
  );
}
