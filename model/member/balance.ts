export interface DefaultBankCard {
    accountBank: string;
    accountName: string;
    bankAreaId: number;
    bankAreaName: string;
    bankCode: string;
    bankLogo: string;
    bankName: string;
    cardNumber: string;
    cardType: number;
    cardTypeName: string;
    createTime: string;
    id: number;
    isdefault: boolean;
    updateTime: string | null;
    userId: number;
}

export interface BankCardOrganization {
    bankCode: string;
    name: string;
    type: number;
    typeName: string;
}

export interface UserCash {
    balance: number;
    createTime: string;
    id: number;
    memo: string;
    money: number;
    sourceId: string;
    type: number;
    typeName: string | null;
    userId: number;
    userNickName: string | null;
}