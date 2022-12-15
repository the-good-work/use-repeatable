type AddItem<T> = (item?: T, n?: number) => void;
type RemoveItem = (index: number) => void;
type MoveItem = (from: number, to: number) => void;
type UpdateItem<T> = (item: T & {
    id: string;
}) => void;
type RemoveAll = () => void;
type UpdateRepeatableAction<T> = {
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
} | {
    type: "remove-all";
};
export { AddItem, RemoveItem, MoveItem, UpdateItem, RemoveAll, UpdateRepeatableAction, };
