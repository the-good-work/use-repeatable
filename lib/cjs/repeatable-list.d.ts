import { FC, MouseEventHandler, ReactNode } from "react";
interface ExtendComponentProps {
    CustomAddButton?: FC<{
        onClick: MouseEventHandler<HTMLButtonElement>;
    }>;
    CustomRemoveButton?: FC<{
        onClick: MouseEventHandler<HTMLButtonElement>;
    }>;
    CustomReorderUpButton?: FC<{
        onClick: MouseEventHandler<HTMLButtonElement>;
    }>;
    CustomReorderDownButton?: FC<{
        onClick: MouseEventHandler<HTMLButtonElement>;
    }>;
    CustomCard?: any;
}
interface RepeatableListProps<T> extends ExtendComponentProps {
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
