export interface IteamSum {
    count:number;
    first: number;
    monthCount: number;
    monthFirst: number;
    monthSecond: number;
    second: number;
    [key:string]:any;
}

export interface IRecommendList {
    avatarImage:string;
    childNum:number
    createTime: string;
    mobile: string;
    nickName: string;
    [key: string]: any;
}