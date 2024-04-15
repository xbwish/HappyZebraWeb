
/** 小程序提交数据标准接收实体 */
interface fMWxPost {
    /** 用户前端编码 */
    code: string;
}
/** 微信小程序登录解码数据 */
interface fMWxLoginDecodeEncryptedData {
    encryptedData: string;
    iv: string;
    signature: string;
    sessionAuthId: string;
}
/** 微信小程序登录解码手机号码 */
interface fMWxLoginDecryptPhoneNumber {
    encryptedData: string;
    iv: string;
    sessionAuthId: string;
    invitecode: number;
}
/** 微信账户创建 */
interface fMWxAccountCreate {
    /** 密码 */
    password: string;
    /** 昵称 */
    nickname: string;
    /** 头像 */
    avatar: string;
    /** 短信验证码 */
    code: string;
    /** 手机号码 */
    mobile: string;
    /** 微信小程序授权sessionAuthId */
    sessionAuthId: string;
    /** 来源 */
    platform: number;
    /** 推荐码 */
    invitecode: number;
}
/** 微信账户创建 */
interface fMWxSync {
    avatarUrl: string;
    city: string;
    country: string;
    gender: number;
    language: string;
    nickName: string;
    province: string;
}
interface fMWxSendSMS {
    /** 操作类型 */
    code: string;
    /** 手机号码 */
    mobile: string;
    /** 方法 */
    method: string;
}
interface fMWeChatMsgTemplateEdit {
    title: string;
    list: any[];
}
/** 用户发起订阅提交 */
interface setWeChatAppletsMessageTip {
    templateId: string;
    status: string;
}

interface IWxShare {
    title?:string,
    desc?:string, 
    link?:string,
    imgUrl?: string,
    callback?: Function;
}

interface WxJsApi {
    appId: string,
    nonceStr: string,
    signature: string,
    ticket: string,
    timestamp: number,
    jsApiTicket:string,
    url:string,
    [key: string]: any;
}
export {
    fMWxPost,
    fMWxLoginDecodeEncryptedData,
    fMWxLoginDecryptPhoneNumber,
    fMWxAccountCreate,
    fMWxSync,
    fMWxSendSMS,
    fMWeChatMsgTemplateEdit,
    setWeChatAppletsMessageTip,
    IWxShare,
    WxJsApi,
}
