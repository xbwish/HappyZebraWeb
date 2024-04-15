import { CouponDisplayEnum } from "@/enum";

export interface CouponQuery {
    page?: number;
    limit?: number;
    display?: CouponDisplayEnum;
    ids?: string;
}