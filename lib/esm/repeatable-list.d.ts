/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { RepeatableListProps } from "./types";
declare const RepeatableList: <T extends object>(props: RepeatableListProps<T> & {
    children?: (({ test }: {
        test: string;
    }) => ReactNode) | undefined;
}) => import("@emotion/react/jsx-runtime").JSX.Element;
export { RepeatableList };
