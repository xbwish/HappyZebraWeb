<template>
  <div
    class="coreshop-padding-10 coreshop-margin-10 coreshop-bg-white coreshop-border-radius-trbl-18"
    v-if="props.coreshopData?.parameters?.list?.length > 0"
  >
    <div
      class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between coreshop-min-height-30"
    >
      <div class="coreshop-font-16 coreshop-text-black coreshop-font-weight-bold">
        {{ props.coreshopData?.parameters?.title }}
      </div>
      <div class="coreshop-flex coreshop-align-center" @click="onRedirectServiceGoodList()">
        <span>查看更多</span>
        <CoreshopIconArrowDoubleRight
          class="arrow-right-double"
        ></CoreshopIconArrowDoubleRight>
      </div>
    </div>
    <div class="coreshop-divider">
      <div class="complete"></div>
    </div>
    <div
      class="coreshop-flex-direction-row coreshop-margin-bottom-10 coreshop-text-black"
      v-for="(item, key) in props.coreshopData?.parameters?.list"
      :key="key"
      @click="onGoServicesDetail(item.id)"
    >
      <div class="coreshop-flex">
        <NImage
          :src="item.thumbnail"
          object-fit="cover"
          :height="96"
          :width="96"
           :preview-disabled="true"
          class="coverImage"
        ></NImage>

        <div
          class="coreshop-flex coreshop-flex-direction coreshop-padding-left-10 coreshop-percent-100"
        >
          <div class="coreshop-font-15 u-line-2 coreshop-text-black">
            {{ item.title }}
          </div>
          <div
            class="coreshop-font-11 coreshop-padding-top-5 coreshop-padding-bottom-3 u-line-2 coreshop-text-brown"
          >
            {{ item.description }}
          </div>
          <div
            class="coreshop-flex coreshop-align-center coreshop-padding-top-10 coreshop-padding-bottom-5"
          >
            <div
              class="coreshop-font-11 tag coreshop-bg-orange  coreshop-border-radius-4 coreshop-margin-right-10"
              v-if="item.maxBuyNumber > 0"
            >
            限購{{ item.maxBuyNumber }}
            </div>
            <div
              class="coreshop-font-11 tag coreshop-bg-green  coreshop-border-radius-4 coreshop-margin-right-10"
              v-if="item.maxBuyNumber == 0"
            >
            不限購
            </div>
            <div
              class="coreshop-font-11 tag coreshop-bg-olive  coreshop-border-radius-4"
            >
              {{ item.ticketNumber }}張券
            </div>
          </div>

          <div
            class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-start"
            v-if="item.openStatus == 1 && item.lastTime > 0"
          >
            <div class="coreshop-font-12">僅剩：</div>
            <NCountdown :duration="item.lastTime * 1000" :active="true" :render="renderCountdown"></NCountdown>
          </div>
          <div
            class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-start"
            v-if="item.openStatus == 2 && item.lastTime > 0"
          >
            <div class="coreshop-font-12">即將開始：</div>
            <NCountdown :duration="item.lastTime * 1000" :active="true" :render="renderCountdown"></NCountdown>
          </div>

          <div
            class="coreshop-flex coreshop-justify-between coreshop-flex-direction-row coreshop-align-center"
          >
            <div class="coreshop-flex coreshop-align-center">
              <div class="coreshop-font-14 coreshop-text-red">NT${{ item.money }}</div>
            </div>
            <div class="coreshop-buy-btn" v-if="item.openStatus != 3">馬上搶</div>
            <div class="coreshop-buy-btn-disabled" v-if="item.openStatus == 3">
              已結束
            </div>
          </div>
        </div>
      </div>
      <div v-if="key + 1 < props.coreshopData.parameters.list.length">
        <div class="coreshop-divider">
          <div class="serviceGood"></div>
          <div class="dot">●</div>
          <div class="serviceGood"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NImage, NCountdown ,CountdownProps } from "naive-ui";
import { NavLinkTypeEnum } from '@/enum';
interface ServiceGood {
  coreshopData: {
    parameters: {
      title: string;
      list: Array<{
        openStatus: number;
        id: number;
        title: string;
        description: string;
        money: number;
        thumbnail: string;
        maxBuyNumber: number;
        ticketNumber: number;
        lastTime: number;
        timeData: {
          days: number;
          hours: number;
          minutes: number;
          seconds: number;
        };
      }>;
    };
  };
}
const props = withDefaults(defineProps<ServiceGood>(), {
  coreshopData: () => ({
    parameters: {
      title: "",
      list: [],
    },
  }),
});

const onRedirectServiceGoodList = ()=>{
    linkTypeNavigate(NavLinkTypeEnum.urlLink,'/pages/serviceGoods/index/index');
}
const onGoServicesDetail = (id: number) => {
    linkTypeNavigate(NavLinkTypeEnum.urlLink,`/pages/serviceGoods/details/details?id=${id}`);
};

const renderCountdown: CountdownProps['render'] = ({ hours,minutes,seconds}) => {
    const padStart = (value:number)=>`${String(value).padStart(2, '0')}`; 
    const days:number = hours/24;
    const intDays : number = parseInt(`${days}`);
    const intHours:number = (days-intDays) *24;
    return  `${intDays}天${Math.ceil(parseFloat(padStart(intHours)))}時${padStart(minutes)}分${padStart(seconds)}秒`
    }

</script>

<style scoped lang="scss">
.arrow-right-double {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}
.coverImage{
    border-radius: 8px;
}

.tag{
    line-height: 18px;
    padding: 2px 4px;
}

.time {
  display: flex;
  align-items: center;
  .time__custom {
    min-width: 18px;
    height: 18px;
    background-color: #3c9cff;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    .time__custom__item {
      color: #fff;
      font-size: 10px;
      text-align: center;
    }
  }
}
</style>
