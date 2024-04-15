<template>
  <NuxtLayout name="personal-center">
    <coreshop-title :title="$t('个人资料')"></coreshop-title>
    <div class="progress-box">
      <span class="title">{{$t("完善度")}}</span>
      <Progress
        class="progress"
        :percentage="userInfo.progress"
        track-color="#fff"
        color="#D33123"
        stroke-width="10"
      />
    </div>
    <div class="form-title">{{$t("基本资料")}}</div>
    <div class="userInfo-box cs-box-shadow-gray">
      <CellGroup :border="false">
        <Field v-model="userInfo.name" :label="$t('头像')" :border="false">
          <template #input>
            <Uploader
              v-model="userInfo.headPortrait"
              :max-count="1"
              :after-read="(file) => handleAfterRead(file)"
            />
          </template>
        </Field>

        <Field
          v-model="userInfo.name"
          :label="$t('昵称')"
          :placeholder="$t('请输入昵称')"
          :border="false"
        />
        <Field name="radio" :label="$t('性别')" :border="false">
          <template #input>
            <RadioGroup v-model="userInfo.sex" direction="horizontal">
              <Radio :name="1" checked-color="#D33123">{{ $t("男") }}</Radio>
              <Radio :name="2" checked-color="#D33123">{{ $t("女") }}</Radio>
              <Radio :name="3" checked-color="#D33123">{{ $t("保密") }}</Radio>
            </RadioGroup>
          </template>
        </Field>

        <Field
          v-model="userInfo.date"
          is-link
          readonly
          name="calendar"
          :label="$t('生日')"
          :placeholder="$t('请选择生日')"
          @click="userInfo.showDatePicker = true"
          :border="false"
        />
      </CellGroup>
    </div>
    <div class="btn-box">
      <CoreshopButton
        size="medium"
        color="#D33123"
        round
        class="cs-percent-w-100 cs-p-t-15 cs-p-b-15"
        @on-click="hanldeSubmit"
      >
        <CoreshopLanguage :text="$t('保存')" />
      </CoreshopButton>
    </div>

    <Overlay
      :show="userInfo.showDatePicker"
      @click="userInfo.showDatePicker = false"
    >
      <div class="wrapper" @click.stop>
        <DatePicker
          v-if="userInfo.showDatePicker"
          class="datePicker"
          :min-date="userInfo.minDate"
          :max-date="userInfo.maxDate"
          v-model="userInfo.birthdayDate"
          color="#D33123"
          @cancel="onCancelDatePicker"
          @confirm="onConfirmChooseDatePicker($event)"
          confirm-button-text="確認"
        />
      </div>
    </Overlay>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import * as fileService from "@/composables/file";
import { UploadFileResult } from "@/model/file";
import { Result } from "@/model/result";
import { useMemberStore } from "@/store";
import { IAccountInfo } from "@/model/account";
import {
  editAccountInfo,
  editAccountAvatar,
  queryUserInfo,
} from "@/composables/member";
import { showToast, showSuccessToast, UploaderFileListItem } from "vant";
import {
  Field,
  CellGroup,
  RadioGroup,
  Radio,
  Uploader,
  Progress,
  DatePicker,
  Overlay,
} from "vant";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
  layout: false,
});
const actionSheetList = [
  {
    label: coreShopLang("男"),
    value: 1,
  },
  {
    label: coreShopLang("女"),
    value: 2,
  },
  {
    label: coreShopLang("保密"),
    value: 3,
  },
];

const userInfo: UnwrapRef<{
  progress: number;
  headPortrait: Array<any>;
  sex: number;
  date?: string;
  name: string;
  showDatePicker: boolean;
  minDate: Date;
  maxDate: Date;
  birthdayDate: Array<string>;
}> = reactive({
  progress: 0,
  headPortrait: [],
  sex: 1,
  date: undefined,
  name: "",
  showDatePicker: false,
  minDate: new Date(1980, 0, 1),
  maxDate: new Date(),
  birthdayDate: [],
});

/** 获取用户信息 */
const queryInfo = async () => {
  const data: IAccountInfo = await useMemberStore().getUserData;
  if (data.birthday) {
    userInfo.progress += 25;
    userInfo.date = timeFormat(data.birthday);
    userInfo.birthdayDate = timeFormat(data.birthday).split("-") ?? "";
  }
  if (data.nickName) {
    userInfo.name = data.nickName;
    userInfo.progress += 25;
  }
  if (data.mobile) {
    userInfo.progress += 25;
  }
  if (data.avatarImage) {
    userInfo.progress += 25;
    userInfo.headPortrait = [{ url: data.avatarImage, isImage: true }];
  }
  if (data.sex && data.sex == 0) {
    userInfo.sex = actionSheetList[2].value;
  } else {
    userInfo.sex = actionSheetList[(data.sex as number) - 1].value;
  }
};
queryInfo();

/** 上传头像 */
const handleAfterRead = async (event: UploaderFileListItem) => {
  const uploadResult: Result<UploadFileResult> = await fileService.uploadImage(
    event.file!
  );
  const url: string = uploadResult.data.fileUrl;
  const editAvatar = await editAccountAvatar({ id: url });
  if (editAvatar.status) {
    const data: IAccountInfo = await useMemberStore().getUserData;
    data.avatarImage = editAvatar.data;
    useMemberStore().setAccountInfo(data);
    showSuccessToast(editAvatar.msg);
  } else {
    showToast(editAvatar.msg);
  }
};

/** 保存用户信息 */
const hanldeSubmit = async () => {
  const data = {
    sex: userInfo.sex,
    nickname: userInfo.name,
    birthday: "",
  };

  if (userInfo.date) {
    data.birthday = timeFormat(userInfo.date);
  }

  const result: Result = await editAccountInfo(data);

  if (!result.status) {
    showToast(result.msg || coreShopLang("网络异常请重试"));
    return;
  }
  // 查询个人资料
  const userInfoResult: Result<IAccountInfo> = await queryUserInfo();
  useMemberStore().setAccountInfo(userInfoResult.data);
  showSuccessToast(result.msg);
};

const onCancelDatePicker = () => {
  userInfo.showDatePicker = false;
};
const onConfirmChooseDatePicker = (date: any) => {
  userInfo.birthdayDate = date.selectedValues;
  userInfo.date = `${date.selectedValues[0]}-${date.selectedValues[1]}-${date.selectedValues[2]}`;
  userInfo.showDatePicker = false;
};
</script>

<style scoped lang="scss">
.progress-box {
  padding: 0.7rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    width: 1.3rem;
    color: #6e737d;
    font-family: "PingFang HK";
    font-size: 0.35rem;
    font-weight: 600;
  }
  .progress {
    flex: 1;
  }
}
.form-title {
  color: #292b2e;
  font-family: "PingFang HK";
  font-size: 0.4rem;
  font-weight: 600;
  padding: 0.1rem 0.3rem;
}
.userInfo-box {
  background-color: #fff;
  margin: 10px;
  padding: 20px 0.3rem;
  :deep(.van-image){
    border-radius: 4px !important;
    background: #F0F0F0;
  }
  :deep(.van-uploader__upload){
    border-radius: 4px !important;
    background: #F0F0F0;
  }
  
}
.btn-box {
  // position: fixed;
  // bottom: 0;
  // left: 50%;
  // transform: translateX(-50%);
  width: 9.4rem;
  padding: 0.3rem;
  height: 1.1rem;
  .cs-percent-w-100{
    height: 100%;
  }
}

.datePicker {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 100%;
  transform: translateX(-50%);
  z-index: 999;
}
</style>
