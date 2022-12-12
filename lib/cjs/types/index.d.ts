import React, { FC, MouseEventHandler, ReactNode } from "react";
export type AddItem<T> = (item?: T | undefined, n?: number | undefined) => void;
export type RemoveItem = (a: number) => void;
export type MoveItem = (a: number, b: number) => void;
export type UpdateItem<T> = (item: T & {
    id: string;
}) => void;
export type ListItem<T> = (item: T & {
    id: string;
}, update: (item: T & {
    id: string;
}) => void, index: number, items: (T & {
    id: string;
})[]) => React.ReactNode;
export type UpdateRepeatableAction<T> = {
    type: "add-item";
    item?: T & {
        id: string;
    };
    n?: number;
} | {
    type: "remove-item";
    n?: number;
} | {
    type: "update-item";
    n: number;
    item: T;
} | {
    type: "move-item";
    from: number;
    to: number;
};
export type DragHandleProps = any;
export type ComposeInnerComponentsProps = ({ className, repeatable, AddItemButton, RemoveItemButton, ReorderItemUpButton, ReorderItemDownButton, DragHandle, ListItem, }: {
    className?: string;
    repeatable?: any;
    AddItemButton?: any;
    RemoveItemButton?: any;
    ReorderItemUpButton?: any;
    ReorderItemDownButton?: any;
    DragHandle?: any;
    ListItem?: any;
}) => any;
export type ComposeOuterComponentsProps = ({ className, repeatable, AddItemButton, InnerComponents, }: {
    className?: string;
    repeatable?: any;
    AddItemButton?: any;
    InnerComponents?: any;
}) => any;
export interface ExtendComponentProps {
    AddItemComponent?: FC<{
        className?: string;
        onClick: MouseEventHandler<HTMLButtonElement>;
    }>;
    RemoveItemComponent?: FC<{
        className?: string;
        onClick: MouseEventHandler<HTMLButtonElement>;
    }>;
    ReorderItemUpComponent?: FC<{
        className?: string;
        onClick: MouseEventHandler<HTMLButtonElement>;
    }>;
    ReorderItemDownComponent?: FC<{
        className?: string;
        onClick: MouseEventHandler<HTMLButtonElement>;
    }>;
    DragHandleComponent?: DragHandleProps;
    composeInnerComponents?: ComposeInnerComponentsProps;
    composeOuterComponents?: ComposeOuterComponentsProps;
}
export interface RepeatableListProps<T> extends ExtendComponentProps {
    listItem: (item: T & {
        id: string;
    }, updateItem: (item: T & {
        id: string;
    }) => void, index: number, items: (T & {
        id: string;
    })[]) => ReactNode;
    newItem: T;
    initialState?: T[];
    onChange?: (items: (T & {
        id: string;
    })[]) => void;
    showReorderButtons?: boolean;
    draggable?: boolean;
    useDefaultStyles?: boolean;
}
export interface SortableCardProps<T> extends ExtendComponentProps {
    item: T & {
        id: string;
    };
    items: (T & {
        id: string;
    })[];
    n: number;
    removeItem: RemoveItem;
    addItem: AddItem<T>;
    moveItem: MoveItem;
    updateItem: UpdateItem<T>;
    listItem: ListItem<T>;
    showReorderButtons?: boolean;
    draggable?: boolean;
    repeatable: any;
}
