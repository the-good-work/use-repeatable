import React from "react";
export declare function AddButton<T>({ onClick, children, addItem, index, newItem, length, }: {
    onClick?: () => void;
    children?: React.ReactNode;
    addItem: (item?: T, n?: number) => void;
    index?: number;
    newItem?: T;
    length: number;
}): JSX.Element;
