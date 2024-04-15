import { post } from '@/utils/http';
import { ServiceList } from '@/model/activity';
// 获取服务列表
const getServicelist: string = 'api/Service/GetPageList';
export const queryServicelist = (params: any) => post<ServiceList>(getServicelist, params);
