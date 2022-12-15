/// <reference types="react" />
import { RepeatableListProps } from "./types";
/**
 * A modular react component with built-in actions and functions that returns a repeatable list of items
 * @param initialState - Define the initial state of the repeatable list
 * @param newItem - Define the value of a newly added item in the repeatable list
 * @param onChange - Function to update the repeatable list
 * @param Card - Arrange the layout of the sub-components within the component
 * @param Layout - Arrange the layout of the components within the `RepeatableList`
 */
declare function RepeatableList<T>({ initialState, newItem, onChange, Card, Layout, }: RepeatableListProps<T>): JSX.Element;
export { RepeatableList };
