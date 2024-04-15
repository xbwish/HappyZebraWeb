export interface InvoiceList {
    amount: number;
    category: number;
    categoryName: string;
    createTime: string;
    fileUrl: string;
    id: number;
    remarks: string;
    sourceId: string;
    status: number;
    statusName: string;
    taxNumber: string;
    title: string;
    type: number;
    typeName: string;
    updateTime: string;
    userId: number;
    userNickName: string;
}

export interface InvoiceDetail {
    code: string | null;
    frequency?: number;
    id?: number;
    type?:number | null;
    name: string | null;
    [key:string]:any;
}