import React from "react";
export declare function RemoveButton({ onClick, children, removeItem, index, className, }: {
    onClick?: () => void;
    children: React.ReactNode;
    removeItem: (n: number) => void;
    index: number;
    className?: string;
}): JSX.Element;
