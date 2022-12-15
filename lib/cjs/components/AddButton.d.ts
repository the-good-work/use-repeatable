import React from "react";
export declare function AddButton<T>({ onClick, children, addItem, index, newItem, className, }: {
    onClick?: () => void;
    children?: React.ReactNode;
    addItem: (item?: T, n?: number) => void;
    index: number;
    newItem: T;
    className?: string;
}): JSX.Element;
