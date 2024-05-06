<template>
    <NuxtLayout name="personal-center">
        <CoreshopTitle :title="$t('佣金明细')"></CoreshopTitle>
        <div class="distribution-box">
            <div class="cs-display-flex cs-justify-content-space-between cs-p-b-15">
                <div class="cs-display-flex">
                    <div>
                        <p class="cs-font-size-16" style="font-weight: 600;">{{
                            showMoney? commissionDetailsData.info.totalSettlementAmount || '0.00' : '***'
                        }}</p>
                        
                        <p class="cs-font-size-12">{{ $t('总收益') }}NT$</p>
                    </div>
                    <div class="cs-m-l-10">
                        <NIcon class="cs-cursor-pointer" color="#fff" @click="handleShowMoney" v-if="showMoney"
                            :size="20">
                            <svg data-v-4c9af453="" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-4c9af453="" d="M7 10C4.5555 10 2.37467 8.45733 0.462334 5.44367C0.378046 5.31104 0.333282 5.15715 0.333282 5C0.333282 4.84285 0.378046 4.68896 0.462334 4.55633C2.37467 1.54267 4.5555 0 7 0C9.4445 0 11.6253 1.54267 13.5377 4.55633C13.622 4.68896 13.6667 4.84285 13.6667 5C13.6667 5.15715 13.622 5.31104 13.5377 5.44367C11.6253 8.45733 9.4445 10 7 10ZM7 1C4.97634 1 3.10217 2.31017 1.37317 5C3.10217 7.68983 4.97634 9 7 9C9.02367 9 10.8978 7.68983 12.6268 5C10.8978 2.31017 9.02367 1 7 1ZM7 7.33333C5.69983 7.33333 4.64583 6.28867 4.64583 5C4.64583 3.71133 5.69983 2.66667 7 2.66667C8.30017 2.66667 9.35417 3.71133 9.35417 5C9.35417 6.28867 8.30017 7.33333 7 7.33333ZM7 6.33333C7.743 6.33333 8.34534 5.73633 8.34534 5C8.34534 4.26367 7.743 3.66667 7 3.66667C6.257 3.66667 5.65467 4.26367 5.65467 5C5.65467 5.73633 6.257 6.33333 7 6.33333Z" fill="white"></path></svg>
                            <!-- <CoreshopIconEye20Filled></CoreshopIconEye20Filled> -->
                        </NIcon>
                        <NIcon class="cs-cursor-pointer" color="#fff" @click="handleShowMoney" v-else :size="20">
                            <CoreshopIconEyeOff20Filled></CoreshopIconEyeOff20Filled>
                        </NIcon>
                    </div>
                </div>
                <div>
                    <nuxt-link to="/member/balance/withdrawCash" class="detail-box">{{$t('提现')}}</nuxt-link>
                </div>
            </div>
            <div class="cs-display-flex cs-align-items-center">
                <div style="margin-right: 2rem;">
                    <p class="cs-font-size-16">{{
                        showMoney? commissionDetailsData.info.freezeAmount || '0.00': '***'
                    }}</p>
                     <p>{{ $t('待入账佣金') }}</p>
                </div>
                <div>
                 
                    <p class="cs-font-size-16">{{ showMoney? commissionDetailsData.userData.balance || '0.00': '***' }}
                    </p>
                    <p>{{ $t('可提领佣金余额') }}</p>
                </div>
            </div>
        </div>

        <div class="time-box">
                <div class="cs-display-flex cs-align-items-center  date-filter"> 
                    <Field 
                        v-model="commissionDetailsData.starTime" 
                        readonly 
                        label=""  
                        input-align="center"
                        :placeholder="$t('请选择开始日期')" 
                        @click="handleStartimeShowDatePicker('start')"
                    />
                    <span class="cs-m-5">—</span>
                    <Field 
                            v-model="commissionDetailsData.endTime" 
                            readonly 
                            label=""  
                            input-align="center"
                            :placeholder="$t('请选择结束日期')" 
                            @click="handleStartimeShowDatePicker('end')"
                        /> 
                </div>
                <div class="cs-font-size-14">
                    <span class="cs-color-red">{{ $t('收入') }}NT${{
                        commissionDetailsData.totalMoney || '0.00'
                    }}</span>
                </div>
        </div>
        <div>
            <ul v-if="commissionDetailsData.list.length > 0">
                <li v-for="item in commissionDetailsData.list" :key="item.typeName" class="cs-display-flex cs-align-items-center cs-justify-content-space-between
                        cs-border-solid-bottom cs-p-t-10 cs-p-b-10">
                    <div>
                        <p class="cs-font-size-14">{{ item.typeName }}</p>
                        <p class="cs-font-size-12">{{ $t('订单号') }}：{{ item.sourceId }}</p>
                    </div>
                    <div>
                        <p class="cs-color-red cs-font-size-14">+{{ item.money }}</p>
                        <p class="cs-color-gray cs-font-size-12">{{ timeFormat(item.createTime, 'yyyy.mm.dd') }}</p>
                    </div>
                </li>
            </ul>
            <CoreshopNoData v-else />
            <p class="no-more" v-if="commissionDetailsData.list.length > 0 && !commissionDetailsData.haveData">{{$t('没有更多了')}}</p>

        </div>
        <CoreshopLoading v-if="commissionDetailsData.isLoading" />
        <DatePicker v-if="commissionDetailsData.showDatePicker" class="datePicker"  
            :max-date="commissionDetailsData.maxDate"
            v-model="commissionDetailsData.date"   color="#f56c6c" 
            @cancel="onCancelDatePicker"
            @confirm="onConfirmChooseDatePicker($event)" />
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { UnwrapRef } from 'vue';
import { NIcon } from "naive-ui";
import { queryDistributionInfo, queryBalanceList } from '@/composables/distribution';
import { Result } from "~~/model/result";
import { useMemberStore } from '@/store';
import { AgentInfo } from '@/model/member';
import { IAccountInfo } from '@/model/account';
import { showToast ,Field,DatePicker  } from 'vant'
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
    layout: false,
})

const getToDayDete = (time:Date) => {
    let date = time; 
    let Y = date.getFullYear() + '/'; 
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'; 
    let D = date.getDate(); 
    return Y + M + D ;
}

const showMoney = ref(false);

const commissionDetailsData: UnwrapRef<{
    info: any;
    userData: IAccountInfo;
    page: number;
    limit: number;
    starTime: string;
    endTime: any;
    totalMoney: number;
    list: Array<any>;
    haveData: boolean;
    isLoading: boolean;
    showDatePicker: boolean;
    maxDate: Date;
    date: Array<string>;
    type: string;
}> = reactive({
    info: {},
    userData: await useMemberStore().getUserData,
    page: 1,
    limit: 20,
    starTime: timeFormat(Date.now()),
    endTime: timeFormat(Date.now()),
    totalMoney: 0,
    list: [],
    haveData: true,
    isLoading: false,
    showDatePicker: false,
    maxDate: new Date(),
    date: [],
    type:'start'
})

const getDistributionInfo: Result<AgentInfo> = await queryDistributionInfo();
commissionDetailsData.info = getDistributionInfo.data;

const getCommissionLog = async (time: string = '') => {
    if (new Date(commissionDetailsData.starTime).getTime() > new Date(commissionDetailsData.endTime).getTime()) {
        showToast(coreShopLang('开始时间不能大于结束时间'));
        return false;
    }

    commissionDetailsData.isLoading = true;

    const getDistributionInfo: Result<any> = await queryBalanceList({
        id: 5,
        page: commissionDetailsData.page,
        limit: commissionDetailsData.limit,
        propsDate: time == '' ? `${getToDayDete(new Date())}-${getToDayDete(new Date()) }` : time,
    });
    if (getDistributionInfo.data.length > 0) {
        commissionDetailsData.list = commissionDetailsData.list.concat(getDistributionInfo.data || []);
    } else {
        commissionDetailsData.haveData = false;
    }
    commissionDetailsData.isLoading = false;

}
getCommissionLog();

const handleShowMoney = () => {
    showMoney.value = !showMoney.value
}

const handleStartimeShowDatePicker = (obj:string) => {
    if (obj === 'start') {
        commissionDetailsData.date = commissionDetailsData.starTime.split('-');
    } else {
        commissionDetailsData.date = commissionDetailsData.endTime.split('-');
        
    }
    commissionDetailsData.type = obj;
    commissionDetailsData.showDatePicker = true;
}

const onCancelDatePicker = () => {
    commissionDetailsData.showDatePicker = false;
}

const onConfirmChooseDatePicker = (date: any) => { 
    commissionDetailsData.date = date.selectedValues;

    if (commissionDetailsData.type === 'start') {
        commissionDetailsData.starTime = `${date.selectedValues[0]}-${date.selectedValues[1]}-${date.selectedValues[2]}`
    } else{
        commissionDetailsData.endTime = `${date.selectedValues[0]}-${date.selectedValues[1]}-${date.selectedValues[2]}`
    }
    commissionDetailsData.page = 1;
    commissionDetailsData.list = [];
    commissionDetailsData.showDatePicker = false;
    getCommissionLog(`${getToDayDete(new Date(commissionDetailsData.starTime))}-${getToDayDete(new Date(commissionDetailsData.endTime))}`);
};
</script>

<style lang='scss' scoped>
:deep(.van-cell) {
    --van-cell-vertical-padding:5px !important;
    --van-cell-horizontal-padding: 5px !important;
    &::after{
        content: none;
    }
}
.distribution-box {
    position: relative;
    padding: 0.7rem 0.5rem;
    padding-top: 1rem;
    background-color: #e54d42;
    color: #fff;

    .detail-box {
        font-size: 0.3rem;
        border-radius: 20px;
        padding: 0.1rem 0.3rem;
        color: #e54d42;
        box-sizing: border-box;
        width: 1.2rem;
        font-size: 0.25rem;
        color: #fff;
        border: 1px solid #dcdcdc;
        border-radius: 16px;
        padding: 0.02rem 0.3rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.time-box {
    padding: 0.2rem;
    background: #FFFFFF;
    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    display: flex;
    align-items: center;
  .date-filter{
    flex: 1;
  }
}

.datePicker{
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 100%;
  transform: translateX(-50%);
  z-index: 999;
}
</style>