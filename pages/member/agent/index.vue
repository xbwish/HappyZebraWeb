<template>
        <div style="padding-bottom:1.5rem;">
            <CoreshopTitle :title="$t('代理商申请')"></CoreshopTitle>
            <div v-if="agentInfoData.info.verifyStatus > 1" class="result-box">
                <!-- 申请状态图标 -->
                <div>
                    <img class="cs-percent-w-80 cs-display-flex cs-margin-auto" v-if="agentInfoData.info.verifyStatus == 3"
                        src="/images/non_real_name.png" alt="">
                    <img class="cs-percent-w-80 cs-display-flex cs-margin-auto"
                        v-if="agentInfoData.info.verifyStatus == 2 || agentInfoData.info.verifyStatus == 1"
                        src="/images/real_name.png" alt="">
                </div>
                <div class="cs-p-20">
                    <p class="cs-text-align-center cs-font-size-16" v-if="agentInfoData.info.verifyStatus == 2">{{
                            $t('恭喜，您的申请已提交')
                    }}！</p>
                    <p class="cs-text-align-center cs-font-size-16" v-if="agentInfoData.info.verifyStatus == 3">{{
                            $t('抱歉，您的申请被驳回')
                    }}！</p>
                    <p class="cs-text-align-center cs-font-size-16" v-if="agentInfoData.info.verifyStatus == 1">{{
                            $t('恭喜，您的申请已通过')
                    }}！</p>
                </div>
                <div v-if="agentInfoData.info.verifyStatus == 2"
                    class="cs-m-t-10 cs-color-gray cs-text-align-center cs-font-size-16">
                    您于{{ agentInfoData.info.createTime }}{{ $t('申请已经提交成功，当前状态') }}：
                    <span v-if="agentInfoData.info.verifyStatus == 2">{{ $t('待审核') }}</span>
                    <span v-if="agentInfoData.info.verifyStatus == 3">{{ $t('审核拒绝') }}</span>
                    <span v-if="agentInfoData.info.verifyStatus == 1">{{ $t('审核通过') }}</span>
                </div>
            </div>
            <div v-else>
                <p class="agent-box" v-html="agentInfoData.config.agentNotes"></p>

                <div class="btn-box">
                    <CoreshopButton class=" cs-percent-w-100"  size="small" v-if="agentInfoData.info.conditionStatus" @on-click="handleApply">
                        <CoreshopLanguage :text="$t('申请')" />
                    </CoreshopButton>
                    <CoreshopButton class=" cs-percent-w-100" size="small" v-else :text="$t('您的条件暂不满足')">
                        <CoreshopLanguage :text="$t('您的条件暂不满足')" />
                    </CoreshopButton>
                </div>
            </div>

            <CoreshopModal :showModal="agentInfoData.showModal" @handleModalCancel="handleModalCancel" :title="$t('提交申请')"
                :positiveText="$t('申请成为代理商')" @handleModalOk="handleModalOk" class="cs-percent-w-95 cs-p-10" style="--n-close-margin:10px">
                <div class="modal-centent-box">
                    <ul>
                        <li class="cs-m-b-20">
                            <div class="cs-font-size-14">{{ $t('姓名')}}</div>
                            <div>
                                <NInput size="small" v-model:value="agentInfoData.name" :placeholder="$t('请输入姓名')"
                                    class="cs-percent-w-100"></NInput>
                            </div>
                        </li>
                        <li class="cs-m-b-20">
                            <div class="cs-font-size-14">{{ $t('Line')}}</div>
                            <div>
                                <NInput size="small" v-model:value="agentInfoData.weixin" :placeholder="$t('请输入Line')"
                                    class="cs-percent-w-100"></NInput>
                            </div>
                        </li>
                        <!-- <li class="cs-m-b-20">
                            <div class="cs-font-size-14">QQ</div>
                            <div>
                                <NInput size="small" v-model:value="agentInfoData.qq" :placeholder="$t('请输入QQ')"
                                    class="cs-percent-w-100"></NInput>
                            </div>
                        </li> -->
                        <li class="cs-m-b-20">
                            <div class="cs-font-size-14">{{ $t('手机')}}</div>
                            <div>
                                <NInput size="small" v-model:value="agentInfoData.mobile" :placeholder="$t('请输入手机号')"
                                    class="cs-percent-w-100"></NInput>
                            </div>
                        </li>
                        <li>
                            <p class="cs-display-flex cs-align-items-center cs-cursor-pointer">
                                <NIcon @click="handleModalSetDefault" v-if="agentInfoData.isDefault" :size="20">
                                    <CoreshopIconCheckboxChecked24Regular></CoreshopIconCheckboxChecked24Regular>
                                </NIcon>
                                <NIcon @click="handleModalSetDefault" v-else :size="20">
                                    <CoreshopIconCheckboxUnchecked24Regular></CoreshopIconCheckboxUnchecked24Regular>
                                </NIcon>
                                <span class="cs-m-l-5 cs-font-size-18" @click="handleAgreementShowModal">{{ $t('代理协议') }}</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </CoreshopModal>

            <CoreshopModal :showModal="agentInfoData.agreementShowModal" :title="$t('分销协议')"
                @handleModalCancel="handleAgreementModalCancel" @handleModalOk="handleAgreementModalOk"
                class="cs-percent-w-95">
                <div class="cs-font-size-14 cs-line-height-30 cs-m-t-20 " v-html="agentInfoData.config.agentAgreement">
                </div>
            </CoreshopModal>
        </div>
</template>

<script setup lang='ts'>
import { UnwrapRef } from 'vue';
import { useConfigStore } from '@/store';
import { queryAgentInfo, queryApplyAgent } from '@/composables/agent';
import { Result } from "~~/model/result";
import { NInput, NIcon } from "naive-ui";
import { AgentInfo } from '@/model/member';
import { Config } from '@/model/config';
import { showToast  ,showSuccessToast} from 'vant'
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
const agentInfoData: UnwrapRef<{
    info: any;
    config: Config;
    showModal: boolean;
    agreementShowModal: boolean;
    isDefault: boolean;
    name: string | null;
    weixin: string | null;
    qq: string | null;
    mobile: string | null;
}> = reactive({
    info: {},
    config: useConfigStore().getConfig,
    agreementShowModal: false,
    showModal: false,
    isDefault: false,
    name: null,
    weixin: null,
    qq: null,
    mobile: null,
});

const queryAgent = async () => {
    const getAgentInfo: Result<AgentInfo> = await queryAgentInfo();
    agentInfoData.info = getAgentInfo.data;
    if (getAgentInfo.data.verifyStatus == 1 && getAgentInfo.data.needApply && getAgentInfo.data.conditionStatus) {
        routerLink("/member/agent/panel");  // 去分销面板
    }
}
queryAgent();

const handleModalSetDefault = () => {
    agentInfoData.isDefault = !agentInfoData.isDefault
}

const handleApply = () => {
    agentInfoData.showModal = !agentInfoData.showModal;
}
const handleModalCancel = () => {
    agentInfoData.showModal = !agentInfoData.showModal;
}

const handleModalOk = async () => {
    if (agentInfoData.name === null || agentInfoData.name === '') {
        showToast(coreShopLang('请输入姓名'));
        return ;
    } else if (agentInfoData.weixin === null || agentInfoData.weixin === '') {
        showToast(coreShopLang('请输入微信'));
        return ;
    // } else if (agentInfoData.qq === null || agentInfoData.qq === '') {
    //     showToast(coreShopLang('请输入qq'));
    //     return ;
    // 
    } else if (agentInfoData.mobile === null || agentInfoData.mobile === '') {
        showToast(coreShopLang('请输入手机号'));
        return ;
    } 
    /*else if (agentInfoData.mobile.length != 11) {
        showToast(coreShopLang('手机号输入错误'));
        return;
    } */
    else if (!agentInfoData.isDefault) {
        showToast(coreShopLang('请勾选代理协议'));
        return;
    }

    try {
        const getApplyDistribution: Result<any> = await queryApplyAgent({
            name: agentInfoData.name,
            weixin: agentInfoData.weixin,
            qq: agentInfoData.qq,
            mobile: agentInfoData.mobile,
            agreement: 'on',
        });
        showSuccessToast(getApplyDistribution.msg)
        agentInfoData.showModal = !agentInfoData.showModal;

        // 再次调用，判断是否通过审核
        queryAgent();

    } catch (error:any) {
        showToast(error.msg)
    }
}

const handleAgreementShowModal = () => {
    agentInfoData.agreementShowModal = !agentInfoData.agreementShowModal;
}
const handleAgreementModalCancel = () => {
    agentInfoData.agreementShowModal = !agentInfoData.agreementShowModal;
}
const handleAgreementModalOk = () => {
    agentInfoData.isDefault = true;
    handleAgreementModalCancel();
}

</script>

<style lang='scss' scoped>
body {
    background-color: #fff;
}

.agent-box {
    position: relative;
    width: 9.4rem;
    padding: 0.5rem 0.3rem;
    background-color: #fff;
}

.modal-centent-box {
    margin: 10px auto;

    li {
        >div:nth-of-type(1) {
            &::before {
                content: "*";
                color: red;
                vertical-align: sub;
                margin-right: 5px;
            }
        }
    }
}

.result-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 8rem;
    padding: 1rem;
}

.btn-box {
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    background-color: #fff;
    width: 9.4rem;
    padding: 0.3rem;
}
</style>