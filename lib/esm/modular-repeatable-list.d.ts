/** @jsxImportSource @emotion/react */
import React from "react";
declare function RepeatableList<T>({ initialState, newItem, onChange, Card, Layout, }: ModularRepeatableListProps<T>): import("@emotion/react/jsx-runtime").JSX.Element;
export { RepeatableList };
interface ModularRepeatableListProps<T> {
    initialState: T[];
    newItem: T;
    onChange: (items: (T & {
        id: string;
    })[]) => void;
    Card: React.FC<{}>;
    Layout: React.FC<{
        Card: React.FC<{}>;
    }>;
}
