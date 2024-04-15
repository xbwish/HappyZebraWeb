<template>
  <NuxtLayout name="personal-center">
    <div>
      <CoreshopTitle :title="$t('店铺设置')"></CoreshopTitle>
      <div class="store-set">
        <CellGroup>
          <Field
            v-model="storeState.storeName"
            :label="$t('店铺名称')"
            :placeholder="$t('请输入店铺名称')"
          ></Field>

          <Field v-model="storeState.storeName" :label="$t('店铺Logo')">
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
          ></Field>

          <Field :label="$t('店铺招牌')">
            <template #input>
              <Uploader
                v-model="storeState.tempUploadStoreBanner"
                :after-read="(files) => handlerUploadBanner(files)"
                :before-delete="(file, detail) => handleRemoveBanner(file, detail)"
                :max-count="10"
              ></Uploader>
            </template>
          </Field>

        </CellGroup>
        <div class="btn-box">
          <CoreshopButton size="medium" class="cs-percent-w-100 cs-p-t-15 cs-p-b-15" @on-click="hanldeSubmit">
            <CoreshopLanguage :text="$t('保存')" />
          </CoreshopButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { NInput, UploadFileInfo, NUpload } from "naive-ui";
import { Result } from "@/model/result";
import { UploadFileResult } from "@/model/file";
import { queryAgentStore, queryAgentInfo } from "@/composables/agent";
import * as fileService from "@/composables/file";
import { AgentInfo } from "@/model/member";
import { showToast, showSuccessToast, Field, Uploader, CellGroup, UploaderFileListItem } from "vant";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
  layout: false,
});
const storeState: UnwrapRef<{
  storeLogo: Array<UploaderFileListItem>;
  tempUploadStoreLogo?: Array<UploaderFileListItem>;
  storeBanner: Array<UploaderFileListItem>;
  tempUploadStoreBanner: Array<UploaderFileListItem>;
  storeName: string;
  storeDesc: string;
}> = reactive({
  logoUploadFileInfo: [],
  storeBanner: [],
  storeLogo: [],
  storeName: "",
  storeDesc: "",
  tempUploadStoreLogo: [],
  tempUploadStoreBanner: [],
});

const getAgent = async () => {
  const getAgentInfo: Result<AgentInfo> = await queryAgentInfo();

  storeState.storeName = getAgentInfo.data.storeName || "";
  storeState.storeDesc = getAgentInfo.data.storeDesc || "";

  if(getAgentInfo.data?.storeLogo){
    storeState.storeLogo = [{ url: getAgentInfo.data.storeLogo}];
    storeState.tempUploadStoreLogo = [{ url: getAgentInfo.data.storeLogo}];
  }
  
  if(getAgentInfo.data?.storeBanner){
    const storeBannerArr:Array<string> =getAgentInfo.data.storeBanner?.split(",");
    storeState.storeBanner =storeBannerArr.map((item: string) => ({
      url: item,
    })) || [];

    storeState.tempUploadStoreBanner = storeBannerArr.map((item: string) => ({
      url: item,
    })) || [];
  }
};
getAgent();

/** 上传logo */
const handleUploadlogo = async (uploadFileInfo: UploaderFileListItem) => {


    if (!uploadFileInfo?.file) {
    return;
  }

  const uploadResult: Result<UploadFileResult> = await fileService.uploadImage(uploadFileInfo.file!);
  if (!uploadResult.status) {
    showToast(coreShopLang("网络异常请重试"));
    return;
  }
  const url: string = uploadResult.data.fileUrl;
  storeState.storeLogo = [{url}];
};

/** 移除店铺logo */
const handleRemovelogo = () => {
  storeState.tempUploadStoreLogo = [];
  storeState.storeLogo = [];
};

/** 上传店铺招牌 */
const handlerUploadBanner = async (uploadFileInfo: UploaderFileListItem) => {
    if (!uploadFileInfo?.file) {
       return;
     }

  let uploadResult: Result<UploadFileResult> = await fileService.uploadImage(uploadFileInfo.file!);

  if (!uploadResult.status) {
    showToast(coreShopLang("网络异常请重试"));
    return;
  }
  const fileUrl: string = uploadResult.data.fileUrl;

  storeState.storeBanner.push({url: fileUrl});
};

const handleRemoveBanner = (event: { file: File }, detail: { index: number }) => {
    storeState.tempUploadStoreBanner = storeState.tempUploadStoreBanner?.filter((item, index) => index !== detail.index);
  storeState.storeBanner = storeState.storeBanner.filter((_: any, index: number) => index !== detail.index);
};

const hanldeSubmit = async () => {
    if (!storeState.storeName) {
    showToast(coreShopLang("请输入店铺名称"));
    return;
  }
  if (!Array.isArray(storeState.storeLogo) || storeState.storeLogo?.length == 0) {
    showToast(coreShopLang("请上传店铺Logo"));
    return;
  }
  if (!storeState.storeDesc) {
    showToast(coreShopLang("请输入店铺简介"));
    return;
  }

  if (!Array.isArray(storeState.storeBanner) || storeState.storeBanner.length == 0) {
    showToast(coreShopLang("请上传店铺招牌"));
    return;
  }

  let storeBanner = storeState.storeBanner.map((item) => item.url);

  const getDistributionStore: Result<any> = await queryAgentStore({
    storeName: storeState.storeName,
    storeLogo: storeState.storeLogo[0].url,
    storeBanner: storeBanner.join(","),
    storeDesc: storeState.storeDesc,
  });
  showSuccessToast(getDistributionStore.msg);
};
</script>

<style lang="scss" scoped>
.store-set {
  padding-bottom: 1.5rem;
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  margin: 10px;

  ul {
    width: 9.4rem;
    padding: 0.3rem;
    background-color: #fff;
  }

  li {
    > div:nth-of-type(1) {
      width: 2rem;
    }
  }
}

.btn-box {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 9.4rem;
  background-color: #fff;
  padding: 0.3rem;
}
</style>
