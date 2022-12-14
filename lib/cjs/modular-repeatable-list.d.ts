import React from "react";
declare function RepeatableList<T>({ initialState, newItem, onChange, Card, Layout, }: ModularRepeatableListProps<T>): JSX.Element;
export { RepeatableList };
interface ModularRepeatableListProps<T> {
    initialState: T[];
    newItem: T;
    onChange?: (items: (T & {
        id: string;
    })[]) => void;
    Card: React.FC<{
        item: T;
    }>;
    Layout: React.FC<{
        Cards: React.FC<{}>;
        addItem: () => void;
    }>;
}
