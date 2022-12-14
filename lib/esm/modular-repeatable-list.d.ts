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
    }>;
    RemoveButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
    MoveUpButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
    MoveDownButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
    MoveToTopButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
    MoveToLastButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
    InsertButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
}
interface LayoutProps<T> {
    items: T[];
    removeItem: () => void;
    moveItem: (from: number, to: number) => void;
    addItem: (item?: T, n?: number) => void;
    updateItem: (n: number, item: T) => void;
    Cards: React.FC<{}>;
    DragHandle?: React.FC<{
        children?: React.ReactNode;
    }>;
    AddButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
    RemoveButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
    MoveUpButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
    MoveDownButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
    MoveToTopButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
    MoveToLastButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
    InsertButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
    }>;
}
