<template>
    <div class="coreshop-padding-10 coreshop-margin-10 coreshop-bg-white coreshop-border-radius-trbl-18" v-if="props.coreshopData?.parameters?.list?.length">
        <div class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between coreshop-min-height-30">
           
            <div class="coreshop-font-16 coreshop-text-black coreshop-font-weight-bold" style="display: flex;align-items: center;"> <img src="@/public/images/hot-tuangou.png" style="margin-right: 4px;" width="18" height="18"/>{{props.coreshopData.parameters.title}}</div>
            <div class="coreshop-flex coreshop-align-center" @click="onGoGroupPurchase()"> 
                <span>查看更多</span>
                <CoreshopIconArrowDoubleRight class="arrow-right-double"></CoreshopIconArrowDoubleRight>
           </div>
        </div>
        <div class="coreshop-divider">
            <div class="complete"></div>
        </div>
        <div class="coreshop-flex-direction coreshop-margin-bottom-10 coreshop-text-black" v-for="(item, key) in props.coreshopData?.parameters?.list ||[]" :key="item.id">
            <div class="coreshop-flex">
                <div>
                    <NImage class="good-thumbnail" :width="96" :height="96" :src="item.goodThumbnail"   object-fit="cover" :preview-disabled="true"></NImage>
                </div>
                <div class="coreshop-flex coreshop-flex-direction coreshop-padding-left-10 coreshop-percent-100">
                    <div class="coreshop-font-15 u-line-2 coreshop-text-black">{{ item.name }}</div>
                    <div class="coreshop-font-11 coreshop-padding-top-5 coreshop-padding-bottom-3 u-line-2 coreshop-text-brown">{{ item.goodName }}</div>
                    <div style="color: #D33123;" class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-start coreshop-min-height-30" v-if="(item.startStatus == 1) && item.timestamp">
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
                    </div>
                    <div class="coreshop-flex coreshop-justify-between coreshop-flex-direction-row coreshop-align-center">
                        <div class="coreshop-flex coreshop-align-center">
                            <div class="coreshop-font-14 coreshop-text-red" style="font-weight: bold;">NT${{item.price}}</div>
                            <div class="coreshop-font-xs coreshop-text-through coreshop-margin-left-5" style="font-size: 10px;color:#989FA9;">{{item.mktPrice}}元</div>
                        </div>
                        <div class="coreshop-groupPurchase-btn" v-if="item.startStatus == 1" @click="onGoGroupBuyingDetail(item.id)">{{$t("立即团")}}</div>
                        <div class="coreshop-groupPurchase-btn" v-if="item.startStatus == 0">{{$t("即将开始")}}</div>
                        <div class="coreshop-buy-btn-disabled" v-if="item.startStatus == 2">{{$t("已结束")}}</div>
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
