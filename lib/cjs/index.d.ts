declare function useRepeatable<T>({ initialState, newItem, }: {
    initialState?: T[];
    newItem: T;
}): {
    items: T[];
    addItem: (item?: T | null) => void;
    removeItem: (n?: number) => void;
};
export { useRepeatable };
