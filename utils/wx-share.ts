import { IWxShare, WxJsApi } from "@/model/wechat"
import { post } from "@/utils/http"
import type { Result } from "@/model/result"
import { useAccountStore } from "@/store"
import { isOpenH5PatternInWeChat } from "@/consts"

const GetWeChatConfig: string = "api/WeChatOffiaccount/GetWeChatConfig"
const queryJsapi = (params?: any) => post<any>(GetWeChatConfig, params, false)

export const wxShare = async ({
  title,
  desc,
  link,
  imgUrl,
  callback = () => {},
}: IWxShare) => {
  if (!isWechat() || !isOpenH5PatternInWeChat) {
    return
  }
  // 插入script脚本
  let scriptNode = document.createElement("script")
  scriptNode.setAttribute("type", "text/javascript")
  scriptNode.setAttribute(
    "src",
    "https://res2.wx.qq.com/open/js/jweixin-1.6.0.js"
  )
  document.body.appendChild(scriptNode)

  const { appId, nonceStr, signature, timestamp }: Result<WxJsApi> =
    await queryJsapi({
      token: useAccountStore().getToken || "",
      url: window.location.href,
    })

  window.wx?.config({
    debug: false,
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature, // 必填，签名
    jsApiList: [
      // 必填，需要使用的 JS 接口列表
      "updateAppMessageShareData",
      "updateTimelineShareData",
      "onMenuShareWeibo",
    ],
  })
  window.wx.ready(function () {
    //需在用户可能点击分享按钮前就先调用
    window.wx.updateAppMessageShareData({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 设置成功
        callback()
      },
      cacnel: function () {},
    })

    window.wx.updateTimelineShareData({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 设置成功
      },
      cacnel: function () {},
    })
    window.wx.onMenuShareWeibo({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      },
    })
  })
}
