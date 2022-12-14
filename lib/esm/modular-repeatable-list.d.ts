import React from "react";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
declare function RepeatableList<T>({ initialState, newItem, onChange, Card, Layout, }: RepeatableListProps<T>): JSX.Element;
export { RepeatableList };
interface RepeatableListProps<T> {
    initialState: T[];
    newItem: T;
    onChange?: (items: (T & {
        id: string;
    })[]) => void;
    Card: React.FC<CardProps<T>>;
    Layout: React.FC<LayoutProps<T>>;
}
interface CardProps<T> {
    item: T;
    items: T[];
    index: number;
    removeItem: () => void;
    moveItem: (from: number, to: number) => void;
    dragHandleListeners?: SyntheticListenerMap;
}
interface LayoutProps<T> {
    Cards: React.FC<{}>;
    addItem: (item?: T) => void;
}
