export type StComponentValue<T = any, S = undefined> = {
    st_key: string;
    event_id: string;
    value: T;
} & (S extends undefined ? Record<string, never> : S);

export interface StComponentProps {
    st_key: string;
}