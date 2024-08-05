export interface ILogin {
  mobile?: number
  code?: number
  loginType: number
  platform: number
  sessionAuthId?: string
}

export interface TkUserInfo {
  id: string
  name: string
  avatar: string
}
