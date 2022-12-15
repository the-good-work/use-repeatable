/// <reference types="react" />
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { AddItem, MoveItem, RemoveAll, RemoveItem, UpdateItem } from "./use-repeatable";
interface RepeatableListProps<T> {
    initialState: T[];
    newItem: T;
    onChange?: (items: (T & {
        id: string;
    })[]) => void;
    Card: React.FC<CardProps<T>>;
    Layout: React.FC<LayoutProps<T>>;
}
interface SortableCardProps<T> {
    id: string;
    Card: React.FC<CardProps<T>>;
    cardProps: Omit<CardProps<T>, "dragHandleListeners">;
}
interface CardProps<T> {
    item: T & {
        id: string;
    };
    items: (T & {
        id: string;
    })[];
    index: number;
    removeItem: RemoveItem;
    moveItem: MoveItem;
    addItem: AddItem<T>;
    updateItem: UpdateItem<T>;
    removeAll: RemoveAll;
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
    removeItem: RemoveItem;
    moveItem: MoveItem;
    addItem: AddItem<T>;
    updateItem: UpdateItem<T>;
    removeAll: RemoveAll;
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
export { RepeatableListProps, SortableCardProps, CardProps, LayoutProps };
