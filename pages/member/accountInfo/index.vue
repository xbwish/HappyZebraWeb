<template>
    <section>
        <CoreshopTitle :title="$t('账号信息')"></CoreshopTitle>
        <div>
            <ul class="account-info">
                <li>
                    <div>
                        <CoreshopLanguage :text="$t('用户头像')" />
                    </div>
                    <n-upload list-type="image-card" :file-list="accountState.avatarUploadFileInfo"
                        :on-change="customAvatarUpload" :max="1" :on-remove="handleRemoveAvatar" />
                </li>
                <li>
                    <div>
                        <CoreshopLanguage :text="$t('账号')" />
                    </div>
                    <div>{{ accountState.userInfo.userName }}</div>
                </li>
                <li>
                    <div>
                        <CoreshopLanguage :text="$t('昵称')" />
                    </div>
                    <div>
                        <NInput v-model:value="accountState.userInfo.nickName"></NInput>
                    </div>
                </li>
                <li>
                    <div>
                        <CoreshopLanguage :text="$t('性别')" />
                    </div>
                    <div>
                        <NRadioGroup v-model:value="accountState.sex" name="radiogroup">
                            <NSpace>
                                <NRadio :value="SexEnum.man" name="sex"><CoreshopLanguage text="男" /></NRadio>
                                <NRadio :value="SexEnum.woman" name="sex"><CoreshopLanguage text="女" /></NRadio>
                                <NRadio :value="SexEnum.unknow" name="sex"><CoreshopLanguage text="保密" /></NRadio>
                            </NSpace>
                        </NRadioGroup>
                    </div>
                </li>
                <li>
                    <div>
                        <CoreshopLanguage :text="$t('手机号码')" />
                    </div>
                    <div>
                        <span>{{ accountState.userInfo.mobile }}</span>
                    </div>
                </li>
                <li>
                    <div>
                        <CoreshopLanguage :text="$t('出生日期')" />
                    </div>
                    <div>
                        <NDatePicker v-model:value="accountState.birthdayTimestamp" @update:value="handeSetBirthdayDate"
                            type="date" />
                    </div>
                </li>
                <li>
                    <CoreshopButton class="btn cs-w-200 cs-m-l-100" @onClick="handleEditAccountInfo">
                        <CoreshopLanguage :text="$t('保存')" />
                    </CoreshopButton>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import {
    NSpace,
    NRadio,
    NDatePicker,
    NUpload,
    NInput,
    NRadioGroup,
    UploadFileInfo,
} from "naive-ui";
import * as memberService from "@/composables/member";
import * as fileService from "@/composables/file";
import { Result } from "@/model/result";
import { useMemberStore } from "@/store";
import { IAccountInfo } from "@/model/account";
import { SexEnum } from "@/enum";
import { UploadFileResult } from "@/model/file";
import { showToast ,showSuccessToast} from 'vant'
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
const defaultAvatar: string = "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg";

const accountState: UnwrapRef<{
    userInfo: IAccountInfo;
    sex: SexEnum;
    birthdayTimestamp?: number;
    editNickName: Boolean;
    avatar?: string;
    avatarUploadFileInfo?: Array<UploadFileInfo>;
}> = reactive({
    userInfo: {},
    sex: SexEnum.unknow,
    birthdayTimestamp: undefined,
    editNickName: true,
    avatar: undefined,
    avatarUploadFileInfo: [],
});

/** 查询用户信息 */
const queryUserInfo = async () => {
    const userInfoResult: Result<IAccountInfo> = await memberService.queryUserInfo();
    if (!userInfoResult || !userInfoResult.data) {
        return;
    }

    accountState.userInfo = userInfoResult.data;

    if (userInfoResult.data.birthday) {
        accountState.birthdayTimestamp = new Date(userInfoResult.data.birthday).getTime();
    }

    accountState.avatar = userInfoResult.data.avatarImage ? userInfoResult.data.avatarImage : defaultAvatar;
    accountState.avatarUploadFileInfo = [{ id: `${userInfoResult.data.id}`, name: 'avatar', status: 'finished', url: accountState.avatar }];

    accountState.sex = userInfoResult.data.sex || SexEnum.unknow;
    useMemberStore().setAccountInfo(userInfoResult.data);
};

queryUserInfo();

// 生日修改
const handeSetBirthdayDate = (val: number) => {
    accountState.birthdayTimestamp = val;
};


/** 自定义头像上传 */
const customAvatarUpload = async (event: any) => {
    if (!event?.file.batchId) {
        return;
    }
    const uploadResult: Result<UploadFileResult> = await fileService.uploadImage(event.file.file);
    if (!uploadResult.status) {
        showToast(coreShopLang('网络异常，请重试'));
        return;
    }
    accountState.avatar = uploadResult.data.fileUrl;

    accountState.avatarUploadFileInfo = [{ id: `${uploadResult.data.fileUrl}`, name: 'avatar', status: 'finished', url: uploadResult.data.fileUrl }];
    await memberService.editAccountAvatar({ id: uploadResult.data.imageId });
};

/** 移除头像 */
const handleRemoveAvatar = () => {
    accountState.avatarUploadFileInfo = [];
    return true;
}

/** 编辑用户信息 */
const handleEditAccountInfo = async () => {
    const editResult: Result = await memberService.editAccountInfo({ nickName: accountState.userInfo.nickName, sex: accountState.sex, birthday: timeFormat(accountState.birthdayTimestamp||0) });
    if (editResult.status) {
        showSuccessToast(editResult.msg);
        return;
    }
    showToast(coreShopLang('网络异常，请重试'));
}

</script>

<style scoped lang="scss">
.account-info {
    li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        min-height: 50px;

        >div:nth-of-type(1) {
            font-size: 14px;
            min-width: 80px;
            line-height: 1;
            margin-right: 22px;

            span {
                display: inline-block;
            }
        }

        >div:nth-of-type(2) {
            font-size: 14px;
            line-height: 1;

            span {
                margin-right: 20px;
            }
        }
    }
}
</style>
