<template>
  <NuxtLayout name="personal-center">
    <section>
      <CoreshopTitle :title="$t('接龙列表')"></CoreshopTitle>

      <section id="solitaireBox">
        <div class="shop-box cs-display-flex cs-justify-content-space-between">
          <div class="cs-display-flex cs-justify-content-space-between">
            <div class="">
              <img class="cs-w-40 cs-border-radius-5" :src="config.shopLogo" alt="" />
            </div>
            <div class="cs-m-l-10">
              <p class="cs-font-size-14">{{ config.shopName }}</p>
              <p class="cs-font-size-14">{{ config.shareTitle }}</p>
            </div>
          </div>
          <div class="btn-box">
            <a :href="`tel:${config.shopMobile}`">
              <Icon name="phone-o" :size="18" />
              {{$t('联系商家')}}
            </a>
          </div>
        </div>
        <ul class="solitaire-box" v-if="solitaireData.list.length > 0">
          <li v-for="item in solitaireData.list" :key="item.id">
            <div class="cs-p-b-5">
              <p class="cs-font-size-14 cs-font-weight-600 title">{{ item.title }}</p>
            </div>
            <div class="cs-display-flex cs-justify-content-space-between">
              <div class="cs-display-flex cs-percent-w-25">
                <CoreshopImage class="cs-w-80 cs-h-80" :src="item.thumbnail" root="#solitaireBox"> </CoreshopImage>
              </div>
              <div class="cs-percent-w-73 cs-display-flex cs-flex-direction-column">
                <p class="cs-font-size-14 desc">{{ item.description }}</p>
                <p class="cs-font-size-12 time">
                  <CoreshopLanguage :text="$t('购买截止')" />：{{ timeFormat(item.endTime, "yyyy-mm-dd hh:MM:ss") }}
                </p>
                <p>
                  <Tag class="delivery-price" type="success" v-if="item.minDeliveryPrice > 0">{{ item.minDeliveryPrice }}{{$t('元起送')}}</Tag>
                  <Tag type="primary"  v-if="item.startBuyPrice > 0">{{ item.startBuyPrice }}{{$t('元起购')}}</Tag>
                </p>
              </div>
            </div>
            <div class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-m-t-10">
              <p class="cs-font-size-14">
                <CoreshopLanguage :text="$t('正在接龙中')" />
              </p>
              <CoreshopButton @click="goSolitaireDetail(item.id)" class="cs-w-100 cs-align-self-flex-end" size="tiny">
                <CoreshopLanguage :text="$t('查看详情')" />
              </CoreshopButton>
            </div>
          </li>
        </ul>
        <CoreshopNoData v-else></CoreshopNoData>
        <p class="no-more" v-if="solitaireData.list.length > 0 && !solitaireData.haveData">{{$t('没有更多了')}}</p>
      </section>
      <CoreshopLoading v-if="solitaireData.isLoading" />
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { querySolitairePageList } from "@/composables/activity";
import { Result } from "@/model/result";
import { SolitaireList } from "@/model/activity";
import { useConfigStore } from "@/store";
import { Icon,Tag } from "vant";

definePageMeta({
  layout: false,
});

const config = useConfigStore().getConfig;

const solitaireData: UnwrapRef<{
  list: Array<any>;
  page: number;
  limit: number;
  haveData: boolean;
  isLoading: boolean;
}> = reactive({
  list: [],
  page: 1,
  limit: 3,
  haveData: true,
  isLoading: false,
});

const querySolitaire = async () => {
  solitaireData.isLoading = true;

  let data = {
    page: solitaireData.page,
    limit: solitaireData.limit,
  };
  const solitaireList: Result<Array<SolitaireList>> = await querySolitairePageList(data);

  if (solitaireList.data.length > 0) {
    solitaireData.list = solitaireData.list.concat(solitaireList.data || []);
  } else {
    solitaireData.haveData = false;
  }
  solitaireData.isLoading = false;
};
querySolitaire();

onMounted(() => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
      const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
      const screenH = window.screen.height; // 屏幕可视高度
      if (scrollH - scrollT - screenH < 60 && solitaireData.haveData) {
        solitaireData.page++;
        querySolitaire();
      }
    }, 500)
  );
});

const goSolitaireDetail = (id: number) => {
  return navigateTo(`/activity/solitaire/detail?id=${id}`);
};
</script>

<style lang="scss" scoped>
.shop-box {
  padding: 0.5rem 0.3rem;
  border-radius: 0 0 40px 40px;
  background: #f56c6c;
  color: #fff;
  height: 3rem;

  .btn-box {
    a {
      padding: 0.1rem 0.2rem;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      color: #000;
      line-height: 1;
      align-items: center;
    }
  }
}

.solitaire-box {
  background-color: #fff;
  width: 9.5rem;
  margin: -2rem auto 0;
  border-radius: 5px;
  overflow: hidden;

  li {
    padding: 0.3rem;
    background: #ffffff;
    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;
    margin-bottom: 10px;

    .title,
    .desc {
        overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    }

    .time {
        color: #999999;
    }

    .PinTuanCount {
      background-color: #fde3e3;
      padding: 5px 10px;
      border-radius: 20px;
      color: #fb8a8f;

      span {
        color: #000;
        margin-left: 10px;
        font-size: 16px;
      }
    }
    .delivery-price{
        margin-right: 0.2rem;
    }
  }

  li:last-child {
    border: 0;
  }
}
</style>
