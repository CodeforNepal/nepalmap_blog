export type AnyType<T> = {
    [P in keyof T]: any;
}