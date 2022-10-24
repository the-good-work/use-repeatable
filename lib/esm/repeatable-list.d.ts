import React, { ReactNode } from "react";
interface ExtendStyleProps {
    cardStyles?: React.CSSProperties;
    dragHandleStyles?: React.CSSProperties;
    itemButtonStyles?: React.CSSProperties;
    addItemButtonStyles?: React.CSSProperties;
}
interface RepeatableListProps<T> extends ExtendStyleProps {
    listItem: (item: T & {
        id: string;
    }, updateItem: (item: T & {
        id: string;
    }) => void) => ReactNode;
    newItem: T;
    initialState?: T[];
    onChange?: (items: (T & {
        id: string;
    })[]) => void;
}
declare const RepeatableList: <T extends object>(props: RepeatableListProps<T> & {
    children?: (({ test }: {
        test: string;
    }) => ReactNode) | undefined;
}) => JSX.Element;
export { RepeatableList };
