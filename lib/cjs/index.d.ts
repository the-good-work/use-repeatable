declare function useRepeatable<T>({ initialState, newItem, }: {
    initialState?: T[];
    newItem: T;
}): {
    items: T[];
    addItem: () => void;
    removeItem: (n?: number) => void;
};
export { useRepeatable };
