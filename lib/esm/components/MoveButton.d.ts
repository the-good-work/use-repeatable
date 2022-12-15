import React from "react";
export declare function MoveButton({ onClick, children, moveItem, index, direction, length, className, }: {
    onClick?: () => void;
    children: React.ReactNode;
    moveItem: (from: number, to: number) => void;
    index: number;
    direction?: "up" | "down" | "top" | "bottom";
    length: number;
    className?: string;
}): JSX.Element;
