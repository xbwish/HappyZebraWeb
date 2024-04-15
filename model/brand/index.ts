import { Base } from "../base";

export interface Brand extends Base {
    isShow: boolean;
    logoImageUrl: string;
    name: string;
    sort: number;
}
