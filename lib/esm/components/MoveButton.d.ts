import React from "react";
export declare function MoveButton({ onClick, children, moveItem, index, direction, length, }: {
    onClick?: () => void;
    children: React.ReactNode;
    moveItem: (from: number, to: number) => void;
    index: number;
    direction?: "up" | "down" | "top" | "bottom";
    length: number;
}): JSX.Element;
