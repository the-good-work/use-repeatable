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
    item: T & {
        id: string;
    };
    items: (T & {
        id: string;
    })[];
    index: number;
    removeItem: (n: number) => void;
    moveItem: (from: number, to: number) => void;
    addItem: (item?: T, n?: number) => void;
    updateItem: (n: number, item: T) => void;
    removeAll: () => void;
    dragHandleListeners?: SyntheticListenerMap;
    DragHandle?: React.FC<{
        children?: React.ReactNode;
    }>;
    AddButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        index?: number;
        newItem?: T;
        className?: string;
    }>;
    RemoveButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        index?: number;
        className?: string;
    }>;
    MoveButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        direction: "up" | "down" | "top" | "bottom";
        className?: string;
    }>;
}
interface LayoutProps<T> {
    items: (T & {
        id: string;
    })[];
    removeItem: () => void;
    moveItem: (from: number, to: number) => void;
    addItem: (item?: T, n?: number) => void;
    updateItem: (n: number, item: T) => void;
    removeAll: () => void;
    Cards: React.FC<{}>;
    AddButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        index?: number;
        newItem?: T;
        className?: string;
    }>;
    ClearButton?: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        className?: string;
    }>;
}
