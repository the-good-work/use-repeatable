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
    removeItem: (n: number) => void;
    moveItem: (from: number, to: number) => void;
    addItem: (item?: T, n?: number) => void;
    updateItem: (n: number, item: T) => void;
    dragHandleListeners?: SyntheticListenerMap;
    DragHandle?: React.FC<{
        children?: React.ReactNode;
    }>;
    AddButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        index?: number;
        newItem?: T;
    }>;
    RemoveButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        index?: number;
    }>;
    MoveButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        direction: "up" | "down" | "top" | "bottom";
    }>;
}
interface LayoutProps<T> {
    items: T[];
    removeItem: () => void;
    moveItem: (from: number, to: number) => void;
    addItem: (item?: T, n?: number) => void;
    updateItem: (n: number, item: T) => void;
    Cards: React.FC<{}>;
    AddButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        index?: number;
        newItem?: T;
    }>;
}
