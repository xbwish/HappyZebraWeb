<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle title="邀請好友"></CoreshopTitle>
    <div class="invite-box">
      <div class="header-title">
        <div>
          <img src="@/public/images/share/share-text1.png" alt="" />
          <img src="@/public/images/share/share-text2.png" alt="" />
        </div>
        <div><img src="@/public/images/share/share-text3.png" alt="" /></div>
      </div>
      <!-- <img class="bg" src="https://files.cdn.coreshop.cn/static/images/my/invite-bg.png" alt=""> -->
      <div class="invite-code">
        <div class="invite-desc">
          <img
            src="@/public/images/share/share-logo.png"
            alt=""
            width="114"
            height="78"
            style="display: block; margin: 0 auto 10px auto"
          />
          <div class="title">{{ $t("我的專屬邀請碼") }}</div>
          <div class="code">{{ inviteState.code }}</div>
          <!-- <div class="desc">{{$t('快去分享您的邀请码吧')}}</div> -->
          <div class="desc">
            {{
              $t(
                "快去分享您的邀請碼吧，讓更多的好友加入到【快樂搬馬】您也可以獲得豐厚的獎勵"
              )
            }}
          </div>

          <div
            class="cs-display-flex cs-justify-content-space-around cs-m-t-20"
          >
            <div class="cs-percent-w-50" @click="handleGoBalance">
              <p class="cs-color-red cs-text-align-center cs-font-size-16">
                NT$ {{ inviteState.money }}{{ $t("元") }}
              </p>
              <p class="cs-font-size-14 cs-text-align-center cs-color-gray">
                {{ $t("邀請收益") }}
              </p>
            </div>
            <div class="cs-percent-w-50" @click="handleGoInviteList">
              <p class="cs-color-red cs-text-align-center cs-font-size-16">
                {{ inviteState.number }}{{ $t("人") }}
              </p>
              <p class="cs-font-size-14 cs-text-align-center cs-color-gray">
                {{ $t("邀請人數") }}
              </p>
            </div>
          </div>
        </div>

        <div class="layout-share-box">
          <CoreshopShare
            class="items"
            iconBgColor="#fff"
            :wxShare="inviteState.wxShare"
            :shareParams="inviteState.shareParams"
            :sharePageType="UrlSharePageType.index"
          >
            <template #default>
              <p>{{ $t("分享朋友圈") }}</p>
            </template>
          </CoreshopShare>
          <div class="items" @click="handleTogglePopupQrcode">
            <NIcon :size="20">
              <CoreshopIconShare />
            </NIcon>
            <p>{{ $t("二維碼分享") }}</p>
          </div>
        </div>
      </div>

      <div class="invite-peo" v-if="!inviteState.isSuperior">
        <div class="title">{{ $t("誰推薦你的") }}</div>
        <div class="code">
          <n-input
            v-model:value="inviteValue"
            class="cs-text-align-center code-input"
            type="text"
            :placeholder="$t('請輸入推薦人邀請碼')"
          />
        </div>
        <div class="submit" @click="handleInviteSubmit">{{ $t("提交") }}</div>
      </div>

      <!-- 二维码 -->
      <coreshop-canvas-qrcode
        :showPopup="inviteState.showPopupQrcode"
        :link="inviteState.link"
        :img="inviteState.imgUrl"
        @handleClosePopup="handleTogglePopupQrcode"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Ref, UnwrapRef } from "vue"
import { NInput, NIcon } from "naive-ui"
import type { Result } from "@/model/result"
import { queryMyInvite, setMyInvite } from "@/composables/member"
import { showToast, showSuccessToast } from "vant"
import {
  ShareType,
  UrlSharePageType,
  UrlShareClentType,
  shareUrl,
} from "@/enum"
import { IShareParams, IWxShare, IAccountInfo } from "@/model"
import { useAccountStore, useConfigStore, useMemberStore } from "@/store"
import { coreShopAuthCookie } from "@/consts"
import { queryShare } from "@/composables/shareService"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({
  layout: false,
})

interface Invite {
  code: number
  isSuperior: boolean
  money: number
  number: number
  showPopupQrcode: boolean
  link: string
  imgUrl: string
  wxShare: IWxShare
  shareParams: IShareParams
}

const configStore = useConfigStore().getConfig

const cookie = useCookie(coreShopAuthCookie)

const inviteValue: Ref<string | null> = ref(null)

const myInvite: Result<Invite> = await queryMyInvite()

const inviteState: UnwrapRef<Invite> = reactive({
  ...myInvite.data,
  showPopupQrcode: false,
  link: "",
  imgUrl: configStore.shopLogo,
  wxShare: {},
  shareParams: { params: {} },
})

// 分享接口参数
const getShareUrl = () => {
  inviteState.shareParams.client = UrlShareClentType.wxofficial
  inviteState.shareParams.page = UrlSharePageType.index
  if (process.client) {
    inviteState.shareParams.url = `${window.location.origin}${shareUrl}`
  }
  inviteState.shareParams.type = ShareType.url

  // 分享信息
  inviteState.wxShare.title = configStore.shopName
  inviteState.wxShare.desc = configStore.shopDesc
  inviteState.wxShare.imgUrl = configStore.shopLogo
}

const handleShare = async () => {
  let data: IShareParams = {
    client: UrlShareClentType.wxofficial,
    type: ShareType.url,
    url: "",
    page: UrlSharePageType.index,
    token: useAccountStore().getToken,
  }
  if (process.client) {
    data.url = `${window.location.origin}${shareUrl}`
  }

  const result: Result<string> = await queryShare(
    data,
    cookie.value ? true : false
  )
  if (result.status) {
    inviteState.link = result.data
  } else {
    showToast(result.msg)
  }
}
onMounted(async () => {
  if (cookie.value) {
    const memberStore: IAccountInfo = await useMemberStore().getUserData
    inviteState.imgUrl = memberStore.avatarImage || configStore.shopLogo
  }

  handleShare()
  getShareUrl()
})
// 提交
const handleInviteSubmit = async () => {
  if (inviteValue.value == null || inviteValue.value == "") {
    showToast(coreShopLang("請輸入推薦人邀請碼"))
    return
  }
  if (Number(inviteValue.value) == inviteState.code) {
    showToast(coreShopLang("自己不能邀請自己"))
    return
  }

  const invite: Result<any> = await setMyInvite({
    id: inviteValue.value,
  })
  if (invite.status) {
    showSuccessToast(invite.msg)
    inviteState.isSuperior = true
  } else {
    showToast(invite.msg)
  }
}

// 去佣金明细
const handleGoBalance = () => {
  routerLink("/member/balance/detail?status=5")
}
// 去邀请列表
const handleGoInviteList = () => {
  routerLink("/member/invite/list")
}

const handleTogglePopupQrcode = () => {
  inviteState.showPopupQrcode = !inviteState.showPopupQrcode
}
</script>

<style lang="scss" scoped>
.invite-box {
  // position: relative;
  width: 10rem;
  height: calc(100vh - 3.5rem);
  margin: 0 auto;
  padding-top: 3.5rem;
  padding-bottom: 3rem;
  background: url(@/public/images/share/share-friend.png) no-repeat;
  background-size: 100% 100%;
  .header-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    div:nth-of-type(1) {
      img:nth-of-type(1) {
        width: 3rem;
        height: 1.05rem;
        margin-right: 0.1rem;
      }
      img:nth-of-type(2) {
        width: 3rem;
        height: 1.05rem;
      }
    }
    div:nth-of-type(2) {
      position: absolute;
      bottom: 0.5rem;

      img {
        width: 5rem;
        height: 0.45rem;
        display: block;
      }
    }
  }
  .bg {
    position: absolute;
    top: 0;
    width: 100%;
  }

  .invite-code {
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.7rem 0.65rem;
    margin: 0 0.3rem;
    border-radius: 10px;
    height: 10.2rem;
    .invite-desc {
      padding: 0 0.5rem;
    }
    .title {
      text-align: center;
      display: block;
      color: #292b2e;
      font-family: "PingFang SC";
      font-size: 0.45rem;
      font-weight: 600;
    }

    .code {
      display: block;
      border: 0.5px solid;
      border-image: linear-gradient(to right, #00000000, #d33123, #00000000) 1;
      box-sizing: border-box;
      font-size: 0.45rem;
      width: 7.375rem;
      height: 1rem;
      line-height: 1rem;
      margin-top: 10px;
      color: #d33123;
      font-family: "PingFang SC";
      font-weight: 600;
      text-align: center;
    }

    .desc {
      color: #6e737d;
      font-size: 0.3rem;
      margin-top: 0.25rem;
    }
    .cs-color-red {
      font-weight: 600;
      color: #d33123;
      font-size: 0.4rem;
      margin-bottom: 0.1rem;
    }
  }

  .invite-peo {
    position: relative;
    background-color: #fff;
    height: 4.5rem;
    box-sizing: border-box;
    padding: 0.5rem 0.7rem;
    margin: 0.25rem 0.3rem;
    border-radius: 0.25rem;

    .title {
      margin-bottom: 0.55rem;
      display: block;
      color: #292b2e;
      text-align: center;
      font-family: "PingFang SC";
      font-size: 0.45rem;
      font-weight: 600;
    }
    .code-input {
      height: 1rem;
      line-height: 1rem;
    }

    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      width: 3.75rem;
      height: 1rem;
      margin: 0.35rem auto 0;
      font-size: 0.35rem;
      font-weight: 600;
      border-radius: 0.55rem;
      border: 0.025rem solid #d33123;
      color: #d33123;
    }
  }

  .layout-share-box {
    position: relative;
    // width: 7rem;
    // padding: 0.2rem 1rem;
    margin: 0.5rem auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .items {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      justify-content: center;
      width: 3.7rem;
      // padding: 0.125rem 0.25rem;
      border-radius: 0.125rem;
      font-size: 0.35rem;
      height: 1.1rem;
      // margin: auto;

      p {
        margin-left: 5px;
        margin-top: 2px;
        color: #fff;
        text-align: center;
      }
    }
    .items:nth-child(1) {
      border-radius: 0.55rem;
      background: #292b2e;
    }
    .items:nth-child(2) {
      border-radius: 0.55rem;
      background: #d33123;
    }
  }
}
:deep(.van-share-sheet__cancel) {
  color: #646566 !important;
}
</style>
