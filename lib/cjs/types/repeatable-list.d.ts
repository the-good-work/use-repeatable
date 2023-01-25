/// <reference types="react" />
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
interface RepeatableListProps<T> {
    /**
     * Define the initial state of the repeatable list
     */
    initialState?: T[];
    /**
     * Define the value of a newly added item in the repeatable list
     */
    newItem: T;
    /**
     * Function to update the repeatable list
     * @param items - The repeatable list items
     */
    onChange?: (items: (T & {
        id: string;
    })[]) => void;
    /**
     * Arrange the layout of the sub-components within the component
     * @example
     * <RepeatableList
     *  Card={({RemoveButton, DragHandle})=>{
     *     return (
     *       <div>
     *         <DragHandle>Drag Me</DragHandle>
     *         <div>
     *          insert content here
     *         </div>
     *         <RemoveButton>-</RemoveButton>
     *       </div>
     *     )
     *   }}
     * />
     */
    Card: React.FC<CardProps<T>>;
    /**
     * Arrange the layout of the components within the `RepeatableList`
     * @example
     * <RepeatableList
     *  Layout={({AddButton, Cards})=>{
     *     return (
     *       <div>
     *         <AddButton>+</AddButton>
     *         <Cards />
     *       </div>
     *     )
     *   }}
     * />
     */
    Layout: React.FC<LayoutProps<T>>;
}
interface SortableCardProps<T> {
    id: string;
    Card: React.FC<CardProps<T>>;
    cardProps: Omit<CardProps<T>, "dragHandleListeners" | "DragHandle">;
}
interface CardProps<T> {
    /**
     * A single repeatable item with id
     */
    item: T & {
        id: string;
    };
    /**
     * An array of repeatable items with ids
     */
    items: (T & {
        id: string;
    })[];
    /**
     * The index number of the repeatable item
     */
    index: number;
    /**
     * Add `item` into the list at position `index`
     * @param item - Value of item to be added
     * @param index - The index number which the new item will be added to
     */
    addItem: (item?: T, index?: number) => void;
    /**
     * Remove an item from the list at position `index`
     * @param index - The index number of the item to be removed
     */
    removeItem: (index: number) => void;
    /**
     * Move an item from position `from` to position `to`
     * @param from - The index number of the item to be moved
     * @param to - The index number which the moved item will go to
     */
    moveItem: (from: number, to: number) => void;
    /**
     * Update an `item` from position `index`
     * @param index - The index number of the item to be updated
     * @param item - The new value of the updated item
     */
    updateItem: (index: number, item: T & {
        id: string;
    }) => void;
    /**
     * Remove all items in the repeatable list
     */
    removeAll: () => void;
    /**
     * Listener to be added to create a drag handle. Simple add `{...dragHandleListeners}` into an element
     * @example
     * <span {...dragHandleListeners}>
     *  Drag Me
     * </span>
     */
    dragHandleListeners?: SyntheticListenerMap;
    /**
     * A pre-made drag handle
     * @param children - Children to be rendered on the button
     * @param className - Define your own class name
     */
    DragHandle: React.FC<{
        children?: React.ReactNode;
        className?: string;
    }>;
    /**
     * A pre-made "add item" button
     * @param children - Children to be rendered on the button
     * @param index - Indicate the position to insert the new item into
     * @param onClick - Additional `onClick` function
     * @param newItem - The new item to be added into `index`
     * @param className - Define your own class name
     */
    AddButton: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        index?: number;
        newItem?: T;
        className?: string;
    }>;
    /**
     * A pre-made "remove item" button
     * @param children - Children to be rendered on the button
     * @param index - Indicate the position to insert the new item into
     * @param onClick - Additional `onClick` function
     * @param className - Define your own class name
     */
    RemoveButton: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        index?: number;
        className?: string;
    }>;
    /**
     * A pre-made "move item" button
     * @param children - Children to be rendered on the button
     * @param onClick - Additional `onClick` function
     * @param direction - Indicate the move direction
     * @param className - Define your own class name
     */
    MoveButton: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        direction: "up" | "down" | "top" | "bottom";
        className?: string;
    }>;
}
interface LayoutProps<T> {
    /**
     * Add `item` into the list at position `index`
     * @param item - Value of item to be added
     * @param index - The index number which the new item will be added to
     */
    addItem: (item?: T, index?: number) => void;
    /**
     * Remove an item from the list at position `index`
     * @param index - The index number of the item to be removed
     */
    removeItem: (index: number) => void;
    /**
     * Move an item from position `from` to position `to`
     * @param from - The index number of the item to be moved
     * @param to - The index number which the moved item will go to
     */
    moveItem: (from: number, to: number) => void;
    /**
     * Update an `item` from position `index`
     * @param index - The index number of the item to be updated
     * @param item - The new value of the updated item
     */
    updateItem: (index: number, item: T & {
        id: string;
    }) => void;
    /**
     * Remove all items in the repeatable list
     */
    removeAll: () => void;
    /**
     * An array of repeatable items with ids
     */
    items: (T & {
        id: string;
    })[];
    /**
     * Renders a list of `Card` component, use this component like this: `{Cards}`
     * @example
     * const MyLayout = ({ Cards, ...}: LayoutProps<Item>) => (
     *  <div>
     *    {Cards}
     *    ...
     *  </div>
     */
    Cards: React.ReactElement | React.ReactElement[];
    /**
     * A pre-made "add item" button
     * @param children - Children to be rendered on the button
     * @param index - Indicate the position to insert the new item into
     * @param onClick - Additional `onClick` function
     * @param newItem - The new item to be added into `index`
     * @param className - Define your own class name
     */
    AddButton: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        index?: number;
        newItem?: T;
        className?: string;
    }>;
    /**
     * A pre-made "remove all items" button
     * @param children - Children to be rendered on the button
     * @param onClick - Additional `onClick` function
     * @param className - Define your own class name
     */
    ClearButton: React.FC<{
        children?: React.ReactNode;
        onClick?: () => void;
        className?: string;
    }>;
}
export { RepeatableListProps, SortableCardProps, CardProps, LayoutProps };
