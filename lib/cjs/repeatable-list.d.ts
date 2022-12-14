import { ReactNode } from "react";
import { RepeatableListProps } from "./types";
declare const RepeatableList: <T extends {}>(props: RepeatableListProps<T> & {
    children?: (({ test }: {
        test: string;
    }) => ReactNode) | undefined;
}) => JSX.Element;
export { RepeatableList };
