import React from "react";

export function ClearButton({
  onClick,
  children,
  removeAll,
  className,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  removeAll: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
        removeAll();
      }}
      className={`${className} repeatable-list__clear-all-button`}
    >
      {children}
    </button>
  );
}
