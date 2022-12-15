import { RepeatableReturnProps } from "./types";
/**
 * A hook with built-in actions that can mutate a list of repeatable items
 * @param newItem - Define the value of a newly added item in the repeatable list
 * @param initialState - Define the initial state of the repeatable list
 * @param onChange - Function to update the repeatable list
 */
declare function useRepeatable<T>({ initialState, newItem, onChange, }: {
    initialState?: T[];
    newItem: T;
    onChange?: (items: (T & {
        id: string;
    })[]) => void;
}): RepeatableReturnProps<T>;
export { useRepeatable };
