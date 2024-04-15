import { post } from "@/utils/http";
import { Config } from "@/model/config";

const shopConfigV2: string = 'api/Common/GetConfigV2';

/** 获取商品配置 */
export const queryShopConfig = (params?: any) => post<Config>(shopConfigV2, params);

/** 获取首页配置 */
export const queryPageConfig = (code: string) => post('api/Page/GetPageConfig', { code }, false);
