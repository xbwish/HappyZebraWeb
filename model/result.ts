export interface Result<T = any> {
[x: string]: any;
    methodDescription?: string;
    otherData?: any;
    status: boolean;
    msg: string;
    data: T,
    code?: number
}