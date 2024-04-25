import { post } from '@/utils/http';
import { ILogin, IWxLoginReq, ILineLoginReq, IGetLineTokenReq } from '@/model/login';
import { ISMS } from '@/model/sms';

/** 发送短信验证码 */
export const sendSmsCode = (params: ISMS) => post('api/User/SendSms', params);

/** 短信验证码登录 */
export const smsCodeLogin = (params: ILogin) => post('api/User/SmsLogin', params);

/** 授权后，登录 */
export const onWxLogin = (params: IWxLoginReq) => post('api/User/OnLogin', params);

/** LINE 获取TOKEN */
export const queryGetLineToken = (params: IGetLineTokenReq) => useFetch('https://api.line.me/oauth2/v2.1/token', {
  method: 'post',
  body: new URLSearchParams(params),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

/** LINE 获取用户信息 */
export const queryGetLineUserInfo = (headers: { [key: string]: string }) => useFetch('https://api.line.me/oauth2/v2.1/userinfo', {
  method: 'post',
  headers
});

/** LINE 获取头像信息 */
export const queryGetLineProfile = (headers: { [key: string]: string }) => useFetch('https://api.line.me/v2/profile', {
  method: 'get',
  headers
});

/** 授权后，Line登录 */
export const queryLineLogin = (params: ILineLoginReq) => post('api/User/LineLogin', params);


