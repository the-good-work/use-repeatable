import React from "react";
export declare function AddButton<T>({ onClick, children, addItem, index, newItem, length, className, }: {
    onClick?: () => void;
    children?: React.ReactNode;
    addItem: (item?: T, n?: number) => void;
    index?: number;
    newItem?: T;
    length: number;
    className?: string;
}): JSX.Element;
