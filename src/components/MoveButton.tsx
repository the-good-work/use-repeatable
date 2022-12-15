import React from "react";

export function MoveButton({
  onClick,
  children,
  moveItem,
  index,
  direction,
  length,
  className,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  moveItem: (from: number, to: number) => void;
  index: number;
  direction?: "up" | "down" | "top" | "bottom";
  length: number;
  className?: string;
}) {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
        if (direction === "up") {
          moveItem(index, index - 1);
        }
        if (direction === "down") {
          moveItem(index, index + 1);
        }
        if (direction === "top") {
          moveItem(index, 0);
        }
        if (direction === "bottom") {
          moveItem(index, length - 1);
        }
      }}
      className={`${className} repeatable-list__move-item-${direction}-button`}
    >
      {children}
    </button>
  );
}
