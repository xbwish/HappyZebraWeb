import { post } from '@/utils/http';
import { ILogin, IWxLoginReq } from '@/model/login';
import { ISMS } from '@/model/sms';

/** 发送短信验证码 */
export const sendSmsCode = (params: ISMS) => post('api/User/SendSms', params);

/** 短信验证码登录 */
export const smsCodeLogin = (params: ILogin) => post('api/User/SmsLogin', params);

/** 授权后，登录 */
export const onWxLogin = (params: IWxLoginReq) => post('api/User/OnLogin', params);

