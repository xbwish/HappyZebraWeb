import { get, post } from "@/utils/http"
import type { IAccountInfo } from "@/model/account"
import { Category } from "@/model/category"
import { UploadFileResult } from "@/model/file"
import { GroupList, IpinTuan } from "@/model/activity"
import { GoodsBrowsing, InvoiceList, Areas, PointLog } from "@/model/member"

const getUserInfo: string = "api/User/GetUserInfo"
const goodsBrowsing: string = "api/User/Goodsbrowsing"
const userInvoiceList: string = "api/User/UserInvoiceList"
const getAreas: string = "api/Common/GetAreas"
const changeAvatar: string = "api/User/ChangeAvatar"
const shopConfigV2: string = "api/Common/GetConfigV2"
const pointLog: string = "api/User/UserPointLog"
const getGroup: string = "api/Group/GetList"
const pinTuanList: string = "api/PinTuan/GetList"
const uploadAvatarUrl: string = "api/Common/UploadImages"
const editAccountInfoUrl: string = "api/User/EditInfo"
const myInvite: string = "api/User/MyInvite"
const setInvite: string = "api/User/SetMyInvite"
const isStoreUser: string = "api/Store/IsClerk"
const storeByUserId: string = "api/Store/GetStoreByUserId"
const storeListForUser: string = "api/Store/GetStoreListForUser"

/** 用户信息 */
export const queryUserInfo = (params?: any) =>
  post<IAccountInfo>(getUserInfo, params, true)

/** 获取商品浏览足迹 */
export const queryGoodsBrowsing = (params: any) =>
  post<GoodsBrowsing>(goodsBrowsing, params, true)

/** 获取我的发票列表 */
export const queryUserInvoiceList = (params: any) =>
  post<Array<InvoiceList>>(userInvoiceList, params, true)

/** 取下级地址列表 */
export const queryAreas = (params?: any) => post<Array<Areas>>(getAreas, params)

/** 积分记录 */
export const queryPointLog = (params?: any) =>
  post<Array<PointLog>>(pointLog, params, true)

/** 获取秒杀团购 */
export const querySeckillGroup = (params: any) =>
  post<GroupList>(getGroup, params, false, null, `${getGroup}/${params.type}`)

/** 拼团列表 */
export const queryPinTuanList = (params: any) =>
  post<Array<IpinTuan>>(pinTuanList, params)

/** 上传账号头像 */
export const uploadAccountAvatar = (file: File) => {
  let formData = new FormData()
  formData.append("file", file)
  return post<UploadFileResult>(uploadAvatarUrl, formData, true, null)
}

/** 编辑头像 */
export const editAccountAvatar = (body: { id: string }) =>
  post<string>(changeAvatar, body, true)

/** 编辑用户信息 */
export const editAccountInfo = (body: IAccountInfo) =>
  post(editAccountInfoUrl, body, true)

/** 获取我的邀请信息 */
export const queryMyInvite = (params?: any) => post(myInvite, params, true)

/** 设置我的上级邀请人 */
export const setMyInvite = (params?: any) => post(setInvite, params, true)

/** 判断是否是店员 */
export const getIsStoreUser = (params?: any) => post(isStoreUser, params, true)

/** 根据用户序列获取门店数据 */
export const queryStoreByUserId = (params?: any) =>
  post(storeByUserId, params, true)

/** 获取单个用户能管理的门店列表 */
export const queryStoreListForUser = (params?: any) =>
  post(storeListForUser, params, true)
