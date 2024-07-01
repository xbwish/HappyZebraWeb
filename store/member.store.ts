import { defineStore } from "pinia"
import type { IAccountInfo } from "@/model/account"
import { coreshopAccountInfo } from "@/consts"
import { queryUserInfo } from "@/composables/member"
import type { Result } from "@/model/result"

export const useMemberStore = defineStore("memberInfo", {
  state: () => ({
    name: "",
    mobile: "",
    userData: {},
    config: {},
    balance: 0, // 余额
    point: 0 as number,
  }),
  getters: {
    getName: (state) => state.name,
    getMobile: (state) => state.mobile,
    getUserData: async (state) => {
      // if (!state.userData || Object.keys(state.userData).length === 0) {
      const getUserInfo: Result<IAccountInfo> = await queryUserInfo()
      state.balance = getUserInfo.data.balance || 0
      state.userData = getUserInfo.data || {}
      state.point = getUserInfo.data.point || 0
      // }
      return state.userData
    },
    getBalance: (state) => state.balance,
    getPoint: (state) => state.point,
  },
  actions: {
    editName(payload: string) {
      this.name = payload
    },
    setAccountInfo(payload: IAccountInfo) {
      this.balance = payload.balance || 0
      this.userData = payload || {}
    },
    async setBalance() {
      // 付款后更新余额
      const getUserInfo: Result<IAccountInfo> = await queryUserInfo()
      this.setAccountInfo(getUserInfo.data)
    },
  },
})
