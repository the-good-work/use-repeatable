import React, { FC, MouseEventHandler, ReactNode } from "react";
interface ExtendComponentProps {
    CustomAddButton?: FC<{
        onClick: MouseEventHandler<HTMLButtonElement>;
    }>;
    customRemoveButton?: any;
    customReorderUpButton?: any;
    customReorderDownButton?: any;
    customButtons?: any;
}
interface ExtendStyleProps extends ExtendComponentProps {
    cardStyles?: React.CSSProperties;
    dragHandleStyles?: React.CSSProperties;
    removeItemButtonStyles?: React.CSSProperties;
    reorderItemButtonStyles?: React.CSSProperties;
    addItemButtonStyles?: React.CSSProperties;
}
interface RepeatableListProps<T> extends ExtendStyleProps {
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
}
declare const RepeatableList: <T extends object>(props: RepeatableListProps<T> & {
    children?: (({ test }: {
        test: string;
    }) => ReactNode) | undefined;
}) => JSX.Element;
export { RepeatableList };
