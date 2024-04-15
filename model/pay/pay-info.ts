export interface PayInfo {
    money: number;
    userId: number;
    rel: Array<PayInfoRelItem>

}

export interface PayInfoRelItem {
    money: number;
    sourceId: string;
}