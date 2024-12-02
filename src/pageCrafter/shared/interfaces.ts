export interface ISchema {
    id?: string;
    type: string;
    props?: Record<string, any>;
    events?: Record<string, string>;
    children?: PageCrafterChildren;
}
export type PageCrafterChildren = (ISchema | string)[];
export type UseStateObj<T> = [T, React.Dispatch<React.SetStateAction<T>>];
export interface IPage {
    id: string;
    data?: Record<string, any>;
    schema: PageCrafterChildren;
}
