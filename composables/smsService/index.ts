import { post } from "@/utils/http"
import type {
  ILogin,
  IWxLoginReq,
  ILineLoginReq,
  IGetLineTokenReq,
} from "@/model/login"
import type { ISMS } from "@/model/sms"

/** 发送短信验证码 */
export const sendSmsCode = (params: ISMS) => post("api/User/SendSms", params)

/** 短信验证码登录 */
export const smsCodeLogin = (params: ILogin) =>
  post("api/User/SmsLogin", params)

/** 授权后，登录 */
export const onWxLogin = (params: IWxLoginReq) =>
  post("api/User/OnLogin", params)

/** LINE 获取TOKEN */
export const queryGetLineToken = (params: IGetLineTokenReq) =>
  useFetch("https://api.line.me/oauth2/v2.1/token", {
    method: "post",
    body: new URLSearchParams(params),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })

export const fetchLineToken = async (
  params: IGetLineTokenReq
): Promise<any> => {
  // 将参数转换为URLSearchParams
  const body = new URLSearchParams(params)

  try {
    // 发起POST请求
    const response = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    })

    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }

    // 将响应解析为JSON
    const data = await response.json()
    return data
  } catch (error) {
    // 捕获并处理错误
    console.error("There has been a problem with your fetch operation:", error)
    throw error
  }
}

/** LINE 获取用户信息 */
export const queryGetLineUserInfo = (headers: { [key: string]: string }) =>
  useFetch("https://api.line.me/oauth2/v2.1/userinfo", {
    method: "post",
    headers,
  })

/** LINE 获取头像信息 */
export const queryGetLineProfile = (headers: { [key: string]: string }) =>
  useFetch("https://api.line.me/v2/profile", {
    method: "get",
    headers,
  })

/** 授权后，Line登录 */
export const goLogin = (params: ILineLoginReq) =>
  post("api/User/LineLogin", params)

export const myPost = async (
  url: string,
  params: ILineLoginReq
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }

    // 将响应解析为 JSON
    const data = await response.json()
    return data
  } catch (error) {
    // 捕获并处理错误
    console.error("There has been a problem with your fetch operation:", error)
    throw error
  }
}

// 使用封装的 POST 方法进行登录请求
export const queryFacebookLogin = (params: ILineLoginReq) =>
  myPost("https://api.happyzebra.com.tw/api/User/LineLogin", params)

type TkLoginReq = {
  [key: string]: any
}

export const tkLogin = (params: TkLoginReq) =>
  myPost("https://api.happyzebra.com.tw/api/User/TikeTokLogin", params)
