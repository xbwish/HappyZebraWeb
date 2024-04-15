/** 分享类型 */
export enum ShareType {
    /** url地址类型 */
    url = 1,
    /** 二维码 */
    qrCode = 2,
    /** 海报 */
    poster = 3,
}

/** Url分享场景值 */
export enum UrlSharePageType {
    /** 首页 */
    index = 1,
    /** 2商品详情页 */
    goods = 2,
    /** 3拼团详情页 */
    pinTuan = 3,
    /** 4邀请页面 */
    inv = 4,
    /** 5文章页面 */
    article = 5,
    /** 6参团页面 */
    addPinTuan = 6,
    /** 7自定义页面 */
    page = 7,
    /** 8智能表单 */
    form = 8,
    /** 9团购 */
    group = 9,
    /** 10秒杀 */
    seckill = 10,
    /** 11代理 */
    agent = 11,
    /** 12接龙 */
    solitaire = 12,
    /** 13 服务商品 */
    serviceGoods = 13,
}
/** 分享来源 */
export enum UrlShareClentType {
    /** 1普通h5 */
    h5 = 1,
    /** 2微信小程序 */
    wxmnapp = 2,
    /** 3微信公众号（h5） */
    wxofficial = 3,
    /** 4头条系小程序 */
    ttmnapp = 4,
    /** 5pc */
    pc = 5,
    /** 6阿里小程序 */
    alimnapp = 6,
} 

//分享初始化地址
export const shareUrl = '/share';  

export enum VantShareType {
    /** 微信 */
    wechat = 1,
    /** 朋友圈 */
    wechatMoments = 2,
    /** 微博 */
    weibo = 3,
    /** QQ */
    qq = 4,
    /** 复制链接 */
    link = 5,
    /** 分享海报 */
    poster = 6,
    /** 二维码 */
    qrcode = 7,
    /** 小程序码 */
    weappQrcode = 8,
}