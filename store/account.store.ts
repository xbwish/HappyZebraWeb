import { defineStore } from "pinia"
import type { IAuth } from "@/model/login"
import { coreShopAuthCookie } from "@/consts"

export const useAccountStore = defineStore("accountInfoStore", {
  state: () => ({
    auth: {} as IAuth,
  }),
  getters: {
    getToken: (state) => {
      const authToken = useCookie(coreShopAuthCookie).value
      return authToken || state.auth.token
    },
    expires_in: (state) => state.auth.expires_in,
    getIsExpires: (state) => false,
  },
  actions: {
    setAccountInfo(auth: IAuth = {}) {
      this.auth = auth || {}
      const expires_in: number = auth.expires_in! - 3600
      const authCookie = useCookie(coreShopAuthCookie, { maxAge: expires_in })
      authCookie.value = auth.token!
    },
    setToken(token: string) {
      this.auth.token = token
    },
    setClearAccountInfo() {
      this.auth = {}
      useCookie(coreShopAuthCookie).value = null
    },
  },
})
