import { Base } from "../base";

export interface SignInResult extends Base {
    userId: number,

    /** 继续签到 */
    continuousCheckInCount: number,

    /** 累积签到 */
    cumulativeCheckInCount: number
}