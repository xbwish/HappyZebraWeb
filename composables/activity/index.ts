import { post } from '@/utils/http';
import { GoodParams } from '@/model/goods'; 
import {
    IpinTuan, IGroupDetail, ISeckillDetail,
    ServiceDetail, SolitaireList, SolitaireDetail} from '@/model/activity'; 

// 获取秒杀团购详情
const groupInfo: string = 'api/Group/GetGoodsDetial';
export const queryGroupInfo = (params: any) => post<IGroupDetail>(groupInfo, params);

// 获取秒杀团购详情
const seckillInfo: string = 'api/Group/GetGoodsDetial';
export const querySeckillInfo = (params: any) => post<ISeckillDetail>(seckillInfo, params);


// 获取商品参数信息
const goodsParams: string = 'api/Good/GetGoodsParams';
export const queryGoodsParams = (params: any) => post<Array<GoodParams>>(goodsParams, params);


// 拼团商品详情
const pinTuanGoodsInfo: string = 'api/PinTuan/GetGoodsInfo';
export const queryPinTuanGoodsInfo = (params: any) => post<IpinTuan>(pinTuanGoodsInfo, params);


//获取服务详情
const getServiceDetail: string = 'api/Service/GetDetails';
export const queryServiceDetail = (params: any) => post<ServiceDetail>(getServiceDetail, params);

//生成服务购买订单
const addServiceOrder: string = 'api/Service/AddServiceOrder';
export const queryAddServiceOrder = (params: any) => post<string>(addServiceOrder, params, true);


/** 获取接龙列表 */
const getSolitairePageList: string = 'api/Solitaire/GetList';
export const querySolitairePageList = (params: any) => post<Array<SolitaireList>>(getSolitairePageList, params);

/** 获取接龙详情 */
const getSolitaireDetail: string = 'api/Solitaire/GetDetail';
export const querySolitaireDetail = (params: any) => post<SolitaireDetail>(getSolitaireDetail, params);


