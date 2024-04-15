<template>
  <div>
    <div
      class="coreshop-padding-10 coreshop-margin-10 coreshop-bg-white coreshop-border-radius-tr-24 coreshop-border-radius-bl-24"
      v-if="props.coreshopData?.parameters?.list?.length > 0"
    >
      <div
        class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between coreshop-min-height-30"
      >
        <div class="coreshop-font-16 coreshop-span-black coreshop-font-weight-bold">
          {{ props.coreshopData?.parameters?.title }}
        </div>

        <div @click="onGoServicesList()" class="coreshop-flex coreshop-align-center">
          <span>查看更多</span>
          <CoreshopIconArrowDoubleRight
            class="arrow-right-double"
          ></CoreshopIconArrowDoubleRight>
        </div>
      </div>
      <div class="coreshop-divider">
        <div class="left"></div>
        <span class="dot">●</span>
        <div class="right"></div>
      </div>

      <div
        class="img-list-item coreshop-flex coreshop-flex-direction-row coreshop-margin-bottom-10 bg-main coreshop-span-black"
        v-for="(item, key) in props.coreshopData.parameters.list"
        :key="key"
        @click="onGoServicesDetail(item.id)"
      >
        <div class="img-list-item-l">
          <NImage
            :src="item.thumbnail"
            object-fit="cover"
            :height="100"
            :width="100"
            class="coverImage"
          ></NImage>
        </div>
        <div class="img-list-item-r">
          <div class="coreshop-font-14 coreshop-span-bold u-line-1 title">
            {{ item.title }}
          </div>
          <div
            class="coreshop-font-12 u-line-2 coreshop-margin-top-10 coreshop-margin-bottom-10"
          >
            {{ item.description }}
          </div>
          <div class="item-c coreshop-flex coreshop-justify-between">
            <div class="red-price coreshop-justify-between">NT${{ item.money }}</div>
            <!-- <div
              class="coreshop-span-right coreshop-time-right"
              v-if="item.openStatus == 1 && item.lastTime > 0"
            >
              <u-count-down
                :time="item.lastTime * 1000"
                :autoStart="true"
                format="DD天HH时mm秒ss"
                @change="onChange($event, key)"
              >
                <div class="time coreshop-font-11">
                  <div class="coreshop-font-12">仅剩：</div>
                  <div class="time__custom">
                    <span class="time__custom__item">{{ item.timeData.days }}</span>
                  </div>
                  <span class="time__doc">天</span>
                  <div class="time__custom">
                    <span class="time__custom__item">{{
                      item.timeData.hours > 10
                        ? item.timeData.hours
                        : "0" + item.timeData.hours
                    }}</span>
                  </div>
                  <span class="time__doc">:</span>
                  <div class="time__custom">
                    <span class="time__custom__item">{{ item.timeData.minutes }}</span>
                  </div>
                  <span class="time__doc">:</span>
                  <div class="time__custom">
                    <span class="time__custom__item">{{ item.timeData.seconds }}</span>
                  </div>
                </div>
              </u-count-down>
            </div> -->
            <!-- <div
              class="coreshop-span-right coreshop-time-right"
              v-if="item.openStatus == 2 && item.lastTime > 0"
            >
              <u-count-down
                :time="item.lastTime * 1000"
                :autoStart="true"
                format="DD天HH时mm秒ss"
                @change="onChange($event, key)"
              >
                <div class="time">
                  <div class="coreshop-font-12">即将开始：</div>
                  <div class="time__custom">
                    <span class="time__custom__item">{{ item.timeData.days }}</span>
                  </div>
                  <span class="time__doc">天</span>
                  <div class="time__custom">
                    <span class="time__custom__item">{{
                      item.timeData.hours > 10
                        ? item.timeData.hours
                        : "0" + item.timeData.hours
                    }}</span>
                  </div>
                  <span class="time__doc">:</span>
                  <div class="time__custom">
                    <span class="time__custom__item">{{ item.timeData.minutes }}</span>
                  </div>
                  <span class="time__doc">:</span>
                  <div class="time__custom">
                    <span class="time__custom__item">{{ item.timeData.seconds }}</span>
                  </div>
                </div>
              </u-count-down>
            </div> -->
            <div class="coreshop-font-12 red-price" v-if="item.openStatus == 3">
              已結束
            </div>

            <!--<div class="coreshop-flex coreshop-flex-direction-row coreshop-justify-between">
                    <div class="coreshop-font-12 red-price" v-if="item.status == 3">已结束</div>
                    <div class="coreshop-font-12 red-price" v-if="item.status == 2">即将开始</div>
                    <u-icon name="shopping-cart" color="#2979ff" size="25" class="btnCart"></u-icon>
                </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NImage,NCountdown } from "naive-ui";

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

const onGoServicesList = () => {};

const onGoServicesDetail = (id: number) => {};
</script>

<style scoped lang="scss">
.arrow-right-double {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}

.img-list-item {
  position: relative;
  overflow: hidden;
  .img-list-item-l {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    .coverImage {
      border-radius: 10px;
    }
  }
  .img-list-item-r {
    width: calc(100% - 120px);
    display: inline-block;
    margin-left: 7.5px;
    position: relative;
    .title {
      line-height: 24px;
    }
    .item-c {
      width: 100%;
      margin-top: 0;
      .red-price {
        color: #ff7159 !important;
      }
      .btnCart {
        float: right;
      }
    }
  }
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
