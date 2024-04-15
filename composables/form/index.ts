import { post } from "@/utils/http";

const getFormList: string = 'api/Form/GetList';
const GetFormDetial: string = 'api/Form/GetFormDetial';
const AddSubmit: string = 'api/Form/AddSubmit';

//获取表单列表
export const queryFormList = (params?: any) => post<any>(getFormList, params, true);


//获取表单详情
export const queryFormDetial = (params?: any) => post<any>(GetFormDetial, params, false);

// 提交表单
export const queryFormSubmit = (params?: any) => post<any>(AddSubmit, params, true);

