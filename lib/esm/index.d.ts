declare function useRepeatable<T>({ initialState, newItem, onChange, }: {
    initialState?: T[];
    newItem: T;
    onChange?: (items: T[]) => void;
}): {
    items: (T & {
        id: number;
    })[];
    addItem: (item?: T) => void;
    removeItem: (n?: number) => void;
    moveItem: (from: number, to: number) => void;
};
export { useRepeatable };
