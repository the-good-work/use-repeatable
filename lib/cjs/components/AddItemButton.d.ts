import { FC, MouseEventHandler } from "react";
import { AddItem } from "../types";
export declare const AddItemButton: <T extends object>({ CustomComponent, addItem, }: {
    CustomComponent: FC<{
        className?: string | undefined;
        onClick: MouseEventHandler<HTMLButtonElement>;
    }> | undefined;
    addItem: AddItem<T>;
}) => JSX.Element;
