import { post } from '@/utils/http';  
import { IShareParams,Share } from "@/model"; 
 

/** 统一分享 */
export const queryShare = (params: IShareParams, auth: boolean = false) => {
    return post('api/User/Share', params , auth)
};

/** 统一分享解码 */
const deshare: string = 'api/User/deshare';
export const queryDeshare = (params: any) => post<Share>(deshare, params);