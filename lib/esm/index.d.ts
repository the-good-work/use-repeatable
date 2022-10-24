import { RepeatableList } from "./repeatable-list";
declare function useRepeatable<T>({ initialState, newItem, onChange, }: {
    initialState?: T[];
    newItem: T;
    onChange?: (items: T[]) => void;
}): {
    items: (T & {
        id: string;
    })[];
    addItem: (item?: T, n?: number) => void;
    removeItem: (n?: number) => void;
    moveItem: (from: number, to: number) => void;
    updateItem: (n: number, item: T) => void;
};
export { useRepeatable, RepeatableList };
