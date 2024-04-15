<template>
  <div>
    <Divider>{{ $t(props.title) }}</Divider>
    <div class="recommend-box">
      <ul>
        <li v-for="item in recommendLeftProducts" :key="item.id">
          <nuxt-link :to="`/goods/detail/${item.id}?goodsId=${item.id}`">
            <div>
              <img :src="item.image" alt="" />
            </div>
            <div>
              <p class="title">{{ item.name }}</p>
              <p class="price cs-color-red">
                NT${{ item.price }}
                <span v-if="item.mktprice && item.mktprice > 0" class="cs-color-gray">NT${{ item.mktprice }}</span>
              </p>
            </div>
            <section class="point-box">
              <div
                v-if="
                  config.pointSwitch == 1 &&
                  config.pointExchangeModel == 2 &&
                  config.pointShowExchangePrice == 1 &&
                  item.pointsDeduction > 0
                "
              >
                <p>{{ config.pointShowName }}{{$t('兑换价')}}:</p>
                <p class="cs-color-red">
                  {{(config.pointDiscountedProportion||0) * item.pointsDeduction }}{{ config.pointShowName }}+{{
                    parseFloat(`${(item.price||0) - (item.pointsDeduction||0)}`).toFixed(2)
                  }}
                  {{$t('元')}}
                </p>
              </div>
              <div
                v-if="
                  config.pointSwitch == 1 && config.pointGetModel == 2 && config.pointShowPoint == 1 && item.points > 0
                "
              >
                <view> {{$t('购买赠送')}}: </view>
                <view class="cs-color-red"> {{ item.points }}{{ config.pointShowName }} </view>
              </div>
            </section>
          </nuxt-link>
        </li>
      </ul>
      <ul>
        <li v-for="item in recommendRightProducts" :key="item.id">
          <nuxt-link :to="`/goods/detail/${item.id}?goodsId=${item.id}`">
            <div>
              <img :src="item.image" alt="" />
            </div>
            <div>
              <p class="title">{{ item.name }}</p>
              <p class="price cs-color-red">
                NT${{ item.price }}
                <span v-if="item.mktprice && item.mktprice > 0" class="cs-color-gray">NT${{ item.mktprice }}</span>
              </p>
            </div>
            <section class="point-box">
              <div
                v-if="
                  config.pointSwitch == 1 &&
                  config.pointExchangeModel == 2 &&
                  config.pointShowExchangePrice == 1 &&
                  item.pointsDeduction > 0
                "
              >
                <p>{{ config.pointShowName }}{{$t('兑换价')}}:</p>
                <p class="cs-color-red">
                  {{ (config.pointDiscountedProportion||0) * item.pointsDeduction }}{{ config.pointShowName }}+{{
                    parseFloat(`${item.price||0 - item.pointsDeduction||0}`).toFixed(2)
                  }}
                  {{$t('元')}}
                </p>
              </div>
              <div
                v-if="
                  config.pointSwitch == 1 && config.pointGetModel == 2 && config.pointShowPoint == 1 && item.points > 0
                "
              >
                <p>{{$t('购买赠送')}}:</p>
                <p class="cs-color-red">{{ item.points }}{{ config.pointShowName }}</p>
              </div>
            </section>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { queryGoodsRecommendList } from "@/composables/productService";
import { Result } from "@/model/result";
import { Product } from "@/model/product";
import { useConfigStore } from "@/store";
import { Divider } from "vant";

interface IList {
  id: number;
  src: string;
  price: number;
  title: string;
  [key: string]: any;
}

const config = useConfigStore().getConfig;

const props = withDefaults(
  defineProps<{
    products?: Array<IList>;
    title?: string;
  }>(),
  {
    title: "甄选推荐",
    products: () => [],
  }
);

/** 商品推荐商品 */
const result: Result<Array<Product>> = await queryGoodsRecommendList({
  id: 10,
  data: true,
});
const products: Array<Product> = result.data?.slice(0, 12) || [];
const recommendLeftProducts = products.filter((item: any, index: number) => index % 2 == 0);
const recommendRightProducts = products.filter((item: any, index: number) => index % 2 != 0);

let emits = defineEmits<{ (e: "handleClick", id: number): void }>();

const handleClick = (id: number) => {
  emits("handleClick", id);
};
</script>

<style lang="scss" scoped>
.recommend-title {
  position: relative;
  padding: 0.25rem 2rem;
  font-size: 0.35rem;
  text-align: center;

  &:after {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    content: "";
    width: 2rem;
    height: 1px;
    background-color: #dcdcdc;
  }

  &::before {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    content: "";
    width: 2rem;
    height: 1px;
    background-color: #dcdcdc;
  }
}

.recommend-box {
  display: flex;
  justify-content: space-between;
  width: 9.5rem;
  margin: 0 auto;

  ul {
    width: 4.65rem;

    li {
        box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
        border-radius: 8px;
      a {
        display: block;
        padding: 0.25rem;
        background-color: #fff;
        margin-bottom: 0.2rem;
        border-radius: 5px;

        > div:nth-of-type(1) {
          img {
            width: 100%;
            display: block;
            border-radius: 5px;
          }
        }

        > div:nth-of-type(2) {
          .title {
            margin-top: 0.2rem;
            font-size: 0.35rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #000;
          }

          .price {
            font-size: 0.4rem;

            span {
              font-size: 0.3rem;
              text-decoration: line-through;
            }
          }
        }

        .point-box {
          div {
            display: flex;
            align-items: center;
            font-size: 0.27rem;
          }
          div:nth-of-type(1) {
            padding-top: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
