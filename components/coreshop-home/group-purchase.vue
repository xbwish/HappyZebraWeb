<template>
    <div class="coreshop-padding-10 coreshop-margin-10 coreshop-border-radius-trbl-18" v-if="props.coreshopData?.parameters?.list?.length" style="background: url(http://admin.happyzebra.com.tw/upload/20240302/c1a8ac43fd22abb1573dbaa616b44e5.png) top left / 100%;">
        <div class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between coreshop-min-height-25">
            <div class="coreshop-font-16 coreshop-text-black coreshop-text-white coreshop-font-weight-bold" style="display: flex;align-items: center;"> {{props.coreshopData.parameters.title}}</div>
            <div class="coreshop-flex coreshop-align-center" @click="onGoGroupPurchase()"> 
                <span class='coreshop-font-10 coreshop-text-white'>查看更多</span>
                <CoreshopIconArrowDoubleRight class="arrow-right-double coreshop-text-white"></CoreshopIconArrowDoubleRight>
           </div>
        </div>
        <!-- <div class="coreshop-divider">
            <div class="complete"></div>
        </div> -->
        <div class="coreshop-text-black coreshop-margin-top-12 coreshop-flex" style='display: grid;column-gap: 10px;grid-template-columns: repeat(3, minmax(0, 1fr));'>
            <div class="coreshop-padding-left-6 coreshop-padding-right-6 coreshop-flex coreshop-flex-direction-column coreshop-bg-white coreshop-border-radius-6 coreshop-padding-bottom-10" style="grid-column: span 1 / span 1;box-sizing: border-box;" v-for="(item, key) in props.coreshopData?.parameters?.list ||[]" :key="item.id">
                <div>
                    <NImage class="good-thumbnail" width="100%" :src="item.goodThumbnail"  object-fit="cover" :preview-disabled="true"></NImage>
                </div>
                <div class="coreshop-padding-left-5 coreshop-padding-right-5 coreshop-percent-100" style='box-sizing: border-box;'>
                    <div class="coreshop-font-13 coreshop-text-bold u-line-2 coreshop-text-black">{{ item.name }}</div>
                    <div class="coreshop-display-inline-block coreshop-padding-top-2 coreshop-padding-bottom-2 coreshop-padding-left-4 coreshop-padding-right-4 coreshop-font-8 tag coreshop-bg-black coreshop-border-radius-4">{{$t("限购")}}{{ item.maxNums }}{{$t("份")}}</div>
                    <!-- <div class="coreshop-font-11 coreshop-padding-top-5 coreshop-padding-bottom-3 u-line-2 coreshop-text-brown">{{ item.goodName }}</div> -->
                    <!-- <div style="color: #D33123;" class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-start coreshop-min-height-30" v-if="(item.startStatus == 1) && item.timestamp">
                        <div class="coreshop-font-12">{{$t("仅剩")}}：</div>
                        <NCountdown :duration="item.timestamp * 1000" :active="true" :render="renderCountdown"></NCountdown>
                    </div>
                    <div class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-start coreshop-min-height-30" v-if="(item.startStatus == 0) && item.timestamp">
                        <div class="coreshop-font-12">{{$t("即将开始")}}：</div>
                        <NCountdown :duration="item.timestamp * 1000" :active="true" :render="renderCountdown"></NCountdown>
                    </div>
                    <div class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-start coreshop-min-height-30" v-if="(item.startStatus == 2) && item.timestamp">
                        <div class="coreshop-font-12">{{$t("已结束")}}：</div>
                        <NCountdown :duration="item.timestamp * 1000" :active="true" :render="renderCountdown"></NCountdown>
                    </div> -->
                    <div class="coreshop-flex coreshop-justify-between coreshop-flex-direction-column">
                        <div class="coreshop-flex coreshop-align-center coreshop-margin-top-3 coreshop-margin-bottom-4">
                            <div class="coreshop-font-12 coreshop-text-red">NT$<span class="coreshop-font-17 coreshop-text-bold">{{item.price}}</span></div>
                            <div class="coreshop-font-10 coreshop-text-through coreshop-margin-left-5" style="color:#989FA9;">¥{{item.mktPrice}}</div>
                        </div>
                        <div class="coreshop-groupPurchase-btn" style="width: 100%;" v-if="item.startStatus == 1" @click="onGoGroupBuyingDetail(item.id)">{{$t("立即下单")}}</div>
                        <div class="coreshop-groupPurchase-btn" style="width: 100%;" v-if="item.startStatus == 0">{{$t("即将开始")}}</div>
                        <div class="coreshop-buy-btn-disabled" style="width: 100%;" v-if="item.startStatus == 2">{{$t("已结束")}}</div>
                    </div>
                </div>
            </div>
            <div v-if="key+1 < props.coreshopData?.parameters?.list?.length">
                <div class="coreshop-divider">
                    <div class="groupPurchase"></div>
                    <div class="dot">●</div>
                    <div class="groupPurchase"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CountdownProps, NImage,NCountdown } from 'naive-ui';
import { NavLinkTypeEnum } from '@/enum';

interface GroupPurchase{
    coreshopData:{
        parameters:{
            title:string;
            list:Array<{
                goodThumbnail:string;
                name:string;
                goodName:string;
                timestamp:number;
                price:number;
                mktPrice:number;
                id:number;
                startStatus:number;
                maxNums: number;
            }>
        }
    }
}
const props= withDefaults(defineProps<GroupPurchase>(),{})

const onGoGroupPurchase=()=>{
    linkTypeNavigate(NavLinkTypeEnum.urlLink, '/pages/activity/groupBuying/list/list');
}

const renderCountdown: CountdownProps['render'] = ({ hours,minutes,seconds}) => {
    const padStart = (value:number)=>`${String(value).padStart(2, '0')}`; 
    const days:number = hours/24;
    const intDays : number = parseInt(`${days}`);
    const intHours:number = (days-intDays) *24;
    return  `${intDays}天${Math.ceil(parseFloat(padStart(intHours)))}時${padStart(minutes)}分${padStart(seconds)}秒`
    }

    const onGoGroupBuyingDetail=(id:number)=>{
        linkTypeNavigate(NavLinkTypeEnum.urlLink, `/pages/activity/groupBuying/groupBuyingDetails/groupBuyingDetails?id=${id}`);
    }

</script>

<style scoped lang="scss">
.good-thumbnail{
    border-radius: 8px;
}

.arrow-right-double {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}

 .img-list-item { border-radius: 8px; margin: 2.5px 2.5px 10px 2.5px; background-color: #ffffff; padding: 5px; position: relative; overflow: hidden; flex-direction: row;
        .img-list-item-l { width: 100px; height: 100px; display: inline-block;  }
        .img-list-item-r { width: calc(100% - 120px); display: inline-block; margin-left: 7.5px; position: relative;
            .description { font-size: 12px; color: #929292; }
            .item-c { width: 100%; margin-top: 0;
                .btnCart { float: right; }
            }
        }
    }

    .u-count-down__text { font-size: 12px; }
</style>
