<template>
  <NuxtLayout name="personal-center">
    <div>
      <CoreshopTitle :title="$t('店铺设置')"></CoreshopTitle>
      <div class="store-set">
        <CellGroup :border="false">
          <Field
            v-model="storeState.storeName"
            :label="$t('店铺名称')"
            :placeholder="$t('请输入店铺名称')"
            :border="false"
          ></Field>
          <Field
            v-model="storeState.storeName"
            :label="$t('店铺Logo')"
            :border="false"
          >
            <template #input>
              <Uploader
                v-model="storeState.tempUploadStoreLogo"
                :after-read="(files) => handleUploadlogo(files)"
                :before-delete="handleRemovelogo"
                :max-count="1"
              ></Uploader>
            </template>
          </Field>
          <Field
            v-model="storeState.storeDesc"
            rows="2"
            autosize
            type="textarea"
            :label="$t('店铺简介')"
            :maxlength="200"
            :placeholder="$t('请输入店铺简介')"
            :border="false"
          ></Field>

          <Field :label="$t('店铺招牌')" :border="false">
            <template #input>
              <Uploader
                v-model="storeState.tempUploadStoreBanner"
                :after-read="(files) => handlerUploadBanner(files)"
                :before-delete="
                  (file, detail) => handleRemoveBanner(file, detail)
                "
                :max-count="10"
                :border="false"
              ></Uploader>
            </template>
          </Field>
        </CellGroup>
      </div>
      <div class="btn-box">
        <CoreshopButton
          color="#D33123"
          size="medium"
          class="cs-percent-w-100 cs-p-t-15 cs-p-b-15"
          @on-click="hanldeSubmit"
        >
          <CoreshopLanguage :text="$t('保存')" />
        </CoreshopButton>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import type { Result } from "@/model/result"
import { UploadFileResult } from "@/model/file"
import {
  queryDistributionStore,
  queryDistributionInfo,
} from "@/composables/distribution"
import * as fileService from "@/composables/file"
import type { AgentInfo } from "@/model/member"
import {
  showToast,
  showSuccessToast,
  Field,
  Uploader,
  CellGroup,
  UploaderFileListItem,
} from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({
  layout: false,
})
const storeState: UnwrapRef<{
  storeLogo?: Array<UploaderFileListItem>
  tempUploadStoreLogo?: Array<UploaderFileListItem>
  storeBanner: Array<UploaderFileListItem>
  tempUploadStoreBanner: Array<UploaderFileListItem>
  storeName: string
  storeDesc: string
}> = reactive({
  logoUploadFileInfo: [],
  storeBanner: [],
  storeLogo: [],
  storeName: "",
  storeDesc: "",
  tempUploadStoreLogo: [],
  tempUploadStoreBanner: [],
})

const getDistribution = async () => {
  const getDistributionInfo: Result<AgentInfo> = await queryDistributionInfo()
  storeState.storeName = getDistributionInfo.data?.storeName || ""
  storeState.storeDesc = getDistributionInfo.data?.storeDesc || ""

  if (getDistributionInfo.data.storeLogo) {
    storeState.storeLogo = [{ url: getDistributionInfo.data.storeLogo }]
    storeState.tempUploadStoreLogo = [
      {
        url: getDistributionInfo.data.storeLogo,
      },
    ]
  }

  if (getDistributionInfo.data?.storeBanner) {
    const storeBannerArr: Array<string> =
      getDistributionInfo.data.storeBanner?.split(",")
    storeState.storeBanner =
      storeBannerArr.map((item: string) => ({
        url: item,
      })) || []

    storeState.tempUploadStoreBanner =
      storeBannerArr.map((item: string) => ({
        url: item,
      })) || []
  }
}

getDistribution()

/** 上传logo */
const handleUploadlogo = async (uploadFileInfo: UploaderFileListItem) => {
  if (!uploadFileInfo?.file) {
    return
  }

  const uploadResult: Result<UploadFileResult> = await fileService.uploadImage(
    uploadFileInfo.file
  )
  if (!uploadResult.status) {
    showToast(coreShopLang("网络异常，请重试"))
    return
  }
  const url: string = uploadResult.data.fileUrl
  storeState.storeLogo = [{ url }]
}

/** 移除店铺logo */
const handleRemovelogo = () => {
  storeState.tempUploadStoreLogo = []
  storeState.storeLogo = []
}

/** 上传店铺招牌 */
const handlerUploadBanner = async (uploadFileInfo: UploaderFileListItem) => {
  if (!uploadFileInfo?.file) {
    return
  }

  let uploadResult: Result<UploadFileResult> = await fileService.uploadImage(
    uploadFileInfo.file!
  )

  if (!uploadResult.status) {
    showToast(coreShopLang("网络异常，请重试"))
    return
  }
  const fileUrl: string = uploadResult.data.fileUrl

  storeState.storeBanner.push({
    url: fileUrl,
  })
}

const handleRemoveBanner = (
  event: { file: File },
  detail: { index: number }
) => {
  storeState.tempUploadStoreBanner = storeState.tempUploadStoreBanner?.filter(
    (item, index) => index !== detail.index
  )
  storeState.storeBanner = storeState.storeBanner.filter(
    (_: any, index: number) => index !== detail.index
  )
}

const hanldeSubmit = async () => {
  if (!storeState.storeName) {
    showToast(coreShopLang("请输入店铺名称"))
    return
  }
  if (
    !Array.isArray(storeState.storeLogo) ||
    storeState.storeLogo?.length == 0
  ) {
    showToast(coreShopLang("请上传店铺Logo"))
    return
  }
  if (!storeState.storeDesc) {
    showToast(coreShopLang("请输入店铺简介"))
    return
  }
  if (
    !Array.isArray(storeState.storeBanner) ||
    storeState.storeBanner.length == 0
  ) {
    showToast(coreShopLang("请上传店铺招牌"))
    return
  }

  let storeBanner = storeState.storeBanner.map((item) => item.url)

  const getDistributionStore: Result<any> = await queryDistributionStore({
    storeName: storeState.storeName,
    storeLogo: storeState.storeLogo?.[0]?.url,
    storeBanner: storeBanner.join(","),
    storeDesc: storeState.storeDesc,
  })
  showSuccessToast(getDistributionStore.msg)
}
</script>

<style lang="scss" scoped>
.store-set {
  // padding-bottom: 1.5rem;
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  margin: 10px;
}
.btn-box {
  position: fixed;
  left: 50%;
  bottom: 1.5rem;
  transform: translate(-50%, 0);
  width: 4.725rem;
  .n-button {
    height: 1.1rem;
  }
}
</style>
