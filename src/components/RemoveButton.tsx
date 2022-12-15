import React from "react";

export function RemoveButton({
  onClick,
  children,
  removeItem,
  index,
  className,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  removeItem: (n: number) => void;
  index: number;
  className?: string;
}) {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
        removeItem(index);
      }}
      className={`${className} repeatable-list__remove-item-button`}
    >
      {children}
    </button>
  );
}
