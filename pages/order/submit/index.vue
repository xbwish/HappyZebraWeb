<template>
    <NuxtLayout name="personal-center">
        <coreshop-title :title="$t('订单提交页面')"></coreshop-title>
        <div class="cs-p-10 cs-border-radius-10" style="padding-bottom:1.6rem !important;">

            <div class="tag">
                <p class="cs-display-flex">
                    {{ $t('下单提醒') }}
                </p>
                {{ $t('请前往门店提供订单手机号码或者核销码进行核销取货') }}
            </div>
            <div class="type-list-box">
                <section>
                    <div v-for="item in createOrderState.orderDistributionModelOption" :key="item.value"
                        :class="{ 'active': item.value == createOrderState.orderDistributionModel }"
                        @click="handlerChangeDistributionMode(item.value)">
                        {{ item.label }}
                    </div>
                </section>
            </div>

            <!-- 地址 -->
            <template v-if="needShipAddressCmp">
                <div class="address-box cs-background-color-white cs-m-t-15 cs-m-b-15 cs-border-solid cs-p-10
            cs-border-radius-10 cs-display-flex cs-align-items-center ">
                    <div class="cs-m-r-10">
                        <NIcon size="25" color="#e84f5d" :depth="1">
                            <CoreshopIconLocation28Filled />
                        </NIcon>
                    </div>
                    <div v-if="createOrderState.defaultShip?.id"
                        class="cs-display-flex cs-align-items-center cs-flex-1 cs-justify-content-space-between">
                        <div>
                            <div class="cs-font-size-14">
                                <!-- {{$t('收货人')}}： -->
                                <span class="cs-m-r-10">{{ createOrderState.defaultShip.name }}</span>
                                <span>{{ createOrderState.defaultShip.mobile }}</span>
                            </div>
                            <div class="cs-font-size-12 cs-color-gray">
                                {{ createOrderState.defaultShip.areaName || '' }} {{
            createOrderState.defaultShip.street ||
            ''
        }}
                                {{ createOrderState.defaultShip.address || '' }}
                            </div>
                        </div>
                        <CoreshopButton round :bordered="true" :text="$t('修改地址')" @onClick="handleChangeAddress" />
                    </div>

                    <div v-else>
                        <CoreshopButton round :bordered="true" @onClick="handleAddressAddModalCancel"
                            :text="$t('添加收货地址')" />
                    </div>
                </div>
            </template>

            <!--门店-->
            <template v-else-if="!needShipAddressCmp">
                <div
                    class="address-box cs-background-color-white cs-m-t-15 cs-m-b-15 cs-p-10 cs-border-radius-10 cs-display-flex cs-align-items-center ">
                    <div class="cs-m-r-10">
                        <NIcon size="25" color="#e84f5d" :depth="1">
                            <CoreshopIconLocation28Filled />
                        </NIcon>
                    </div>
                    <div class="cs-display-flex cs-align-items-center cs-flex-1 cs-justify-content-space-between">
                        <div>
                            <div class="cs-font-size-14">
                                <span class="cs-m-r-10">{{ createOrderState.defaultStore?.storeName }}</span>
                                <span>{{ createOrderState.defaultStore?.mobile }}</span>
                            </div>
                            <div class="cs-font-size-12 cs-color-gray">
                                {{ createOrderState.defaultStore?.address || '' }}
                            </div>
                        </div>
                        <CoreshopButton :bordered="true" text-color="#fff" :text="$t('切换门店')"
                            @onClick="handleChangeStore" />
                    </div>
                </div>
            </template>

            <!--门店自提显示用户姓名电话-->
            <div class="layout"
                v-if="createOrderState.orderDistributionModel === OrderDistributionModelEnum.selfDelivery">
                <CellGroup>
                    <Field v-model="createOrderState.defaultShip.name" :label="$t('姓名')"
                        :placeholder="$t('请输入提货人姓名')" />
                    <Field v-model="createOrderState.defaultShip.mobile" :label="$t('电话')"
                        :placeholder="$t('请输入提货人电话')" />
                </CellGroup>
            </div>

            <!-- 商品详情列表 -->
            <div class="layout goods-box">
                <div v-for="item in createOrderState.cart?.list || []" :key="item.id"
                    class=" cs-border-solid-bottom cs-p-t-10 cs-p-b-10">
                    <div class="cs-display-flex cs-justify-content-space-between">
                        <div class="cs-percent-w-25 product-image">
                            <Image :src="item.products.images" :width="80" :height="80" fit="fill" />
                        </div>
                        <div
                            class="cs-percent-w-73 cs-display-flex cs-flex-direction-column cs-justify-content-space-between">
                            <div>
                                <p class="cs-font-size-14 name">{{ item.products.name }}</p>
                                <p class="cs-font-size-12 cs-color-gray" v-if="item.products.spesDesc !== null">{{
            item.products.spesDesc || ''
        }}</p>
                                <p class="cs-display-flex" v-if="item.products.promotionList">
                                    <Tag type="success" round class="cs-m-r-5 cs-p-r-5 "
                                        v-for="(v, k) in item.products.promotionList" :key="k">{{ v.name }}</Tag>
                                </p>
                            </div>
                            <div class="cs-color-red cs-font-size-16">
                                <p class="cs-display-flex cs-align-items-center cs-justify-content-space-between">
                                    <span class="cs-text-price">{{ item.products.price || '' }}</span>
                                    <span class="cs-font-size-16 cs-color-gray">x{{ item.nums || '' }}</span>
                                </p>
                                <p>
                                    <span class="cs-font-size-14" v-if="systemConfig.pointSwitch == 1 &&
            systemConfig.pointExchangeModel == 2 &&
            systemConfig.pointShowExchangePrice == 1 &&
            item.products.pointsDeduction > 0 &&
            queryParams.orderType == OrderTypeEnum.common">
                                        <em class="cs-color-gray">{{ systemConfig.pointShowName }}{{ $t('兑换价') }}：</em>
                                        <em>
                                            {{ systemConfig.pointDiscountedProportion! * item.products.pointsDeduction
                                            }}
                                            {{ systemConfig.pointShowName }}+{{ (item.products.price!
            - item.products.pointsDeduction).toFixed(2)
                                            }} 元
                                        </em>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-m-t-10">
                        <div v-if="systemConfig.pointSwitch == 1 &&
            systemConfig.pointExchangeModel == 2 &&
            systemConfig.pointShowExchangePrice == 1 &&
            item.products.pointsDeduction > 0 &&
            queryParams.orderType == OrderTypeEnum.common">
                            <p class="cs-font-size-14 cs-color-gray">{{
            systemConfig.pointShowName
        }}{{ $t('兑换价合计') }}
                            </p>
                            <p class="cs-font-size-14 cs-color-red">
                                {{
            systemConfig.pointDiscountedProportion! *
            item.products.pointsDeduction! * item.nums!
        }}
                                {{ systemConfig.pointShowName }}+{{ ((item.products.price! -
            item.products.pointsDeduction) * item.nums!).toFixed(2)
                                }} {{ $t('元') }}
                            </p>
                        </div>
                        <div v-if="systemConfig.pointSwitch == 1 &&
            systemConfig.pointExchangeModel == 2 &&
            systemConfig.pointShowExchangePrice == 1 && (item.products?.points || 0) > 0">
                            <p class="cs-text-align-right cs-font-size-14 cs-color-gray">{{ $t('购买将赠送') }}</p>
                            <p class="cs-text-align-right cs-font-size-14 cs-color-red">
                                {{ (item.products.points || 0) * (item.nums || 0) }}{{ systemConfig.pointShowName }}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <!-- 优惠券列表 -->
            <div class="layout box-shadow"
                v-if="createOrderState.useCoupons.length > 0 && queryParams.orderType == OrderTypeEnum.common && systemConfig.showCoupon == 1">
                <div class="cs-display-flex cs-justify-content-space-between cs-align-items-center">
                    <p class="cs-font-size-14">{{ $t('优惠券') }}</p>
                    <div>
                        <p class="cs-display-flex cs-justify-content-space-between cs-align-items-center"
                            v-if="createOrderState.useCoupons.length > 0" @click="handleSwitchCoupon">
                            <span
                                v-if="createOrderState.cart.couponPromotionMoney && createOrderState.cart.couponPromotionMoney > 0"
                                class="cs-color-red">
                                - NT${{ createOrderState.cart.couponPromotionMoney }}
                            </span>
                            <span v-else><em class="cs-color-red">{{ createOrderState.useCoupons.length
                                    }}{{ $t('张') }}</em>
                                {{ $t('可用') }}</span>
                            <NIcon :size="20">
                                <CoreshopIconChevronRight28Regular></CoreshopIconChevronRight28Regular>
                            </NIcon>
                        </p>
                        <p v-else>{{ $t('暂无可用') }}</p>
                    </div>
                    <!-- <CoreshopButton v-if="alreadyUseCouponCmp" text="取消选择" bg-color="#fbbd08"
                    @onClick="handleCancelUseCoupon" /> -->
                </div>
            </div>

            <!-- 抵扣发票 -->
            <div class="layout box-shadow">
                <div v-if="systemConfig.pointSwitch &&
            (createOrderState.point?.point || 0) > 0 && queryParams.orderType == OrderTypeEnum.common"
                    class="cs-display-flex cs-justify-content-space-between cs-align-items-center cs-border-solid-bottom cs-p-b-10 cs-m-b-10">
                    <div>
                        <p class="cs-font-size-14">{{ systemConfig.pointShowName }}{{ $t('抵扣') }}</p>
                        <p class="cs-font-size-12 cs-color-gray">
                            {{ $t('可用') }}{{ createOrderState.point?.availablePoint }}{{ systemConfig.pointShowName }}，
                            {{ $t('可抵扣') }}{{ createOrderState.point?.pointExchangeMoney }}{{ $t('元') }}，
                            {{ $t('共有') }}{{ createOrderState.point?.point }}{{ systemConfig.pointShowName }}</p>
                    </div>
                    <div>
                        <n-switch class="cs-font-size-14" v-model:value="createOrderState.usePoint"
                            @update:value="handleSwitchUsePoint">
                            <template #checked>{{ $t('开') }}</template>
                            <template #unchecked>{{ $t('关') }}</template>
                        </n-switch>
                    </div>
                </div>
                <div v-if="systemConfig.invoiceSwitch"
                    class="cs-font-size-14 cs-display-flex cs-justify-content-space-between cs-align-items-center box-shadow">
                    <p>{{ $t('发票') }}</p>
                    <p class="cs-display-flex cs-align-items-center cs-cursor-pointer "
                        @click="hadnlerOpenInvoiceModal">
                        <span v-if="createOrderState.invoice.type == invoiceType.no">{{ $t('无') }}</span>
                        <span v-else>{{ createOrderState.invoice.name }}</span>
                        <Icon name="arrow" />
                    </p>
                </div>
            </div>

            <!-- 商品价格计算 -->
            <div class="layout box-shadow ">
                <div
                    class=" cs-p-t-10 cs-p-b-10 cs-display-flex cs-justify-content-space-between cs-align-items-center">
                    <div class="label">{{ $t('商品总额') }}</div>
                    <div class="cs-text-price cs-color-red">{{ createOrderState.cart.goodsAmount }}</div>
                </div>
                <div class=" cs-p-b-10 cs-display-flex cs-justify-content-space-between cs-align-items-center">
                    <div class="label">{{ $t('商品优惠') }}</div>
                    <div class="cs-text-price">{{ createOrderState.cart.goodsPromotionMoney || 0 }}</div>
                </div>
                <div class=" cs-p-b-10 cs-display-flex cs-justify-content-space-between cs-align-items-center">
                    <div class="label">{{ $t('订单优惠') }}</div>
                    <div class="cs-text-price">{{ createOrderState.cart.orderPromotionMoney || 0 }}</div>
                </div>
                <div class=" cs-p-b-10 cs-display-flex cs-justify-content-space-between cs-align-items-center">
                    <div class="label">{{ $t('优惠券抵扣') }}</div>
                    <div class="cs-text-price">{{ createOrderState.cart.couponPromotionMoney || 0 }}</div>
                </div>
                <div class=" cs-p-b-10 cs-display-flex cs-justify-content-space-between cs-align-items-center" v-if="systemConfig.pointSwitch === 1 &&
            (createOrderState.point.point || 0) > 0 && queryParams.orderType == OrderTypeEnum.common">
                    <div>{{ systemConfig.pointShowName }}{{ $t('抵扣') }}</div>
                    <div class="cs-text-price">{{ createOrderState.cart.pointExchangeMoney || 0 }}</div>
                </div>
                <div class="cs-p-b-10 cs-display-flex cs-justify-content-space-between cs-align-items-center">
                    <div class="label">{{ $t('运费') }}</div>
                    <div class="cs-text-price">{{ createOrderState.cart.costFreight || 0 }}</div>
                </div>
            </div>

            <!-- 买家留言 -->
            <div class="layout box-shadow ">
                <p class="cs-font-size-14 cs-m-b-5">{{ $t('买家留言') }}</p>

                <Field v-model="createOrderState.memo" rows="3" autosize type="textarea" :placeholder="$t('买家留言')" />
            </div>

            <!-- 底部按钮 -->
            <div
                class="btn-box cs-display-flex cs-flex-direction-row-reverse cs-align-items-center cs-justify-content-space-between">
                <CoreshopButton :size="btnSize.medium" round class="cs-flex-1 order_btn" bg-color="#D33123"
                    @on-click="handlerSubmitOrder" :text="createOrderState.isSubmit ? $t('确认下单') : $t('下单中')" />
                <div class="cs-percent-w-55 cs-display-flex cs-font-size-14 cs-font-size-18 cs-font-weight-bold">
                    <p class="cs-m-r-20 cs-align-self-flex-end">
                        {{ $t('共') }} {{ createOrderState.cart.productNums }} {{ $t('件商品') }}
                    </p>
                    <p>
                        <span class="text">{{ $t('合计') }}</span>
                        <span class="cs-text-price cs-color-red cs-font-size-16 num">{{ createOrderState.cart.amount
                            }}</span>
                    </p>
                </div>
            </div>

            <!-- 门店选择弹框 -->
            <Popup v-model:show="createOrderState.switchStore" :round="true" :safe-area-inset-bottom="true"
                :style="{ height: '80%' }" position="bottom" @click-overlay="handleCancelChooseStore">
                <div class="cs-p-20">
                    <p
                        class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-font-size-16 cs-m-b-5">
                        <span>{{ $t('选择门店') }}</span>
                        <NIcon :size="25" class="close-icon" @click="handleCancelChooseStore">
                            <CoreshopIconClose />
                        </NIcon>
                    </p>
                    <CoreshopStore :storeId="createOrderState.defaultStore?.id"
                        @onChooseStore="handleChooseStore($event)">
                    </CoreshopStore>
                </div>
            </Popup>

            <!-- 地址选择弹框 -->
            <Popup v-model:show="createOrderState.switchAddress" :round="true" :safe-area-inset-bottom="true"
                :style="{ height: '80%' }" position="bottom" @click-overlay="handleCancelChooseAddress">
                <div class="cs-p-20">
                    <p
                        class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-font-size-16 cs-m-b-10">
                        <span>{{ $t('选择收获地址') }}</span>
                        <NIcon :size="25" class="close-icon" @click="handleCancelChooseAddress">
                            <CoreshopIconClose />
                        </NIcon>
                    </p>
                    <CoreshopAddressList :addressId="createOrderState.defaultShip?.id"
                        @onChooseAddress="handleChooseAddress($event)"></CoreshopAddressList>
                </div>
            </Popup>

            <!-- 发票弹框 -->
            <LazyCoreshopInvoice :showModal="createOrderState.invoiceShowModal"
                @handleModalCancel="handleInvoiceModalCancel" @handleModalOk="handleInvoiceModalOk" />

            <!-- 添加地址弹框 -->
            <LazyCoreshopAddressAdd :show="createOrderState.addAddress" @handleModalCancel="handleAddressAddModalCancel"
                @handleModalOk="handleAddressAddModalOk" />

            <!-- 优惠券弹框 -->
            <Popup v-model:show="createOrderState.switchCoupon" :round="true" :safe-area-inset-bottom="true"
                :style="{ height: '80%' }" position="bottom" @click-overlay="handleCloseCoupon">
                <div class="cs-p-20  popup-box">
                    <p
                        class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-font-size-16 cs-m-b-10">
                        <span>{{ $t('选择优惠券') }}</span>
                        <NIcon :size="25" class="close-icon" @click="handleCloseCoupon">
                            <CoreshopIconClose />
                        </NIcon>
                    </p>
                    <div class="pop-up-coupon">
                        <div v-for="(item, index) in createOrderState.useCoupons" :key="index" class="cs-font-size-12 cs-display-flex
                        cs-justify-content-space-between cs-align-items-center
                        cs-border-solid cs-p-10 cs-m-b-10 cs-border-radius-10 cs-cursor-pointer"
                            @click="handleSelectCoupon(index)">
                            <div class="cs-percent-w-35">
                                <p>{{ item.couponName || '' }}</p>
                                <p>{{ item.expression2 || '' }}</p>
                            </div>
                            <div class="cs-percent-w-45 cs-color-red">{{ $t('有效期') }}： <br /> {{ item.stime + $t('至') +
                                item.etime }}
                            </div>
                            <div class="cs-percent-w-10 cs-display-flex cs-flex-direction-row-reverse">
                                <NIcon size="25" :color="item.checked ? '#fbbd08' : '#dcdcdc'" :depth="1">
                                    <CoreshopIconCheckmarkCircle24Filled />
                                </NIcon>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cs-display-flex cs-m-t-10 pop-up-btn-box">
                    <CoreshopButton class="cs-flex-1" :round="true" :size="btnSize.medium" :bordered="true"
                        text-color="#fff" :text="$t('不使用优惠券')" @onClick="handleCancelUseCoupon" />
                </div>
            </Popup>
        </div>
        <CoreshopLoading v-if="createOrderState.loading" />
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { ComputedRef, UnwrapRef } from 'vue';
import { NIcon, NSwitch } from "naive-ui";
import { Popup } from "vant";
import { createOrder, useSubmitOrer } from '@/composables/submitOrder';
import { Result } from "@/model/result";
import { useConfigStore } from '@/store';
import { CouponDisplayEnum, OrderDistributionModelEnum, orderPayStatus, OrderSourceEnum, OrderTypeEnum } from "@/enum";
import { Option } from '@/model/option';
import { Address } from '@/model/address'
import { Cart } from '@/model/cart';
import { Point } from '@/model/point';
import { Coupon } from '@/model/coupon';
import { CartQuery } from '@/model/cart';
import { CreateOrder } from '@/model/order';
import { Store } from '@/model/store';
import { Config } from '@/model/config';
import { InvoiceDetail } from '@/model/member';
import { invoiceType, btnSize } from '@/enum';
import { showToast, CellGroup, Field, Image, Tag, Icon } from 'vant';
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
    layout: false,
})

const createOrderState: UnwrapRef<{
    defaultShip: Address;  // 默认收货地址
    areaId: number;
    orderDistributionModelOption: Array<Option> // 订单支持的配送方式
    orderDistributionModel: OrderDistributionModelEnum | null;  // 订单选中发方式
    useCoupons: Array<Coupon>; // 用户的可用优惠券列表
    usePoint: boolean; // 是否勾选使用积分
    cart: Cart; // 购物车商品
    memo?: string; // 买家留言
    point: Point // 积分,
    defaultStore: Store | null;
    switchStore?: boolean;  // 切换门店
    switchAddress?: boolean; // 切换地址
    switchCoupon?: boolean; // 选择优惠券
    invoiceShowModal?: boolean; // 发票弹框
    invoice: InvoiceDetail; // 发票信息
    addAddress?: boolean; //添加地址
    isSubmit: boolean;
    loading: boolean;
}> = reactive({
    defaultShip: {},
    areaId: 0,
    orderDistributionModelOption: [],
    orderDistributionModel: null,
    useCoupons: [],
    usePoint: false,
    cart: {},
    point: {},
    memo: undefined,
    defaultStore: null,
    switchStore: false,
    switchAddress: false,
    switchCoupon: false,
    invoiceShowModal: false,
    invoice: {
        type: invoiceType.no,
        name: null,
        code: null,
    },
    addAddress: false,
    isSubmit: true,
    loading: false
});

/** 选择门店 */
let chooseStore: Store = {};
let chooseAddress: Address = {};

const alreadyUseCouponCmp: ComputedRef<boolean> = computed(() => createOrderState?.useCoupons?.some(x => x.checked));
const needShipAddressCmp: ComputedRef<boolean> = computed(() => [OrderDistributionModelEnum.homeDelivery, OrderDistributionModelEnum.mailing].includes(createOrderState.orderDistributionModel!));

const queryParams: { [key: string]: any } = useRoute().query;
let cartQuery: CartQuery = {
    ids: queryParams.cartIds,
    type: queryParams.orderType,
    objectId: queryParams.objectId || 0
};


/** 系统配置 */
const systemConfig: Config = useConfigStore().getConfig;
const { queryOrderDistributionModel, getUserDefaultShip, queryCartList, queryUsablePoint, queryCartCoupon, queryDefaultStore } = useSubmitOrer();


/** 获取不同类型营销下单支持的配送方式 */
const handleQueryOrderDistributionModel = async () => {
    const orderDistributionModelOption: Array<Option> = await queryOrderDistributionModel(queryParams.orderType);
    if (!Array.isArray(orderDistributionModelOption) || orderDistributionModelOption.length === 0) {
        return;
    }

    // 设置默认收货方式
    createOrderState.orderDistributionModel = orderDistributionModelOption[0].value;
    createOrderState.orderDistributionModelOption = orderDistributionModelOption;
}


/** 获取默认地址 */
createOrderState.defaultShip = await getUserDefaultShip();

/** 购物车列表  */
const handleQueryCartList = async () => {
    if (needShipAddressCmp && createOrderState.defaultShip) {
        cartQuery.areaId = createOrderState.defaultShip.areaId;
    }

    if (createOrderState.orderDistributionModel) {
        cartQuery.receiptType = createOrderState.orderDistributionModel;
    }

    cartQuery.userShipId = createOrderState.defaultShip?.id;
    createOrderState.cart = await queryCartList(cartQuery);
}

/** 获取能够使用的优惠券 */
const handleQueryCartCoupon = async () => {
    const coupons: Array<Coupon> = await queryCartCoupon({ display: CouponDisplayEnum.no_used, ids: queryParams.cartIds, limit: 99999 });
    if (Array.isArray(coupons) && coupons.length) {
        createOrderState.useCoupons = coupons;
    }
}

createOrderState.loading = true;
/** 获取不同类型营销下单支持的配送方式  */
await handleQueryOrderDistributionModel();

/** 获取能够使用的优惠券 */
handleQueryCartCoupon();

/** 购物车列表  */
await handleQueryCartList();

// 判单是否开启积分抵扣
if (systemConfig.pointSwitch == 1) {
    try {
        createOrderState.point = await queryUsablePoint({
            cartType: createOrderState.cart?.type,
            ids: queryParams.cartIds,
            orderMoney: createOrderState.cart.amount
        })
    }
    catch (ex) {
        // console.log('ex', ex);
    }
}

createOrderState.loading = false;


/** 切换收货地址 */
const handleChangeAddress = () => {
    createOrderState.switchAddress = true;
}

/** 切换门店 */
const handleChangeStore = () => {
    createOrderState.switchStore = true;
}

/** 取消切换门店选择 */
const handleCancelChooseStore = () => {
    createOrderState.switchStore = false;
    chooseStore = {};
}

/** 选择门店 */
const handleChooseStore = (store: Store) => {
    chooseStore = store;
    createOrderState.switchStore = false;
    createOrderState.defaultStore = chooseStore;
}

/** 取消切换地址选择 */
const handleCancelChooseAddress = () => {
    createOrderState.switchAddress = false;
    chooseAddress = {};
}

/** 选择地址 */
const handleChooseAddress = async (address: Address) => {
    chooseAddress = address;
    createOrderState.switchAddress = false;
    createOrderState.defaultShip = chooseAddress;
    await handleQueryCartList();
}

// 打开优惠券弹框
const handleSwitchCoupon = () => {
    createOrderState.switchCoupon = true;
}

const handleCloseCoupon = () => {
    createOrderState.switchCoupon = false;
}

// 选择优惠券点击事件
const handleSelectCoupon = async (index: number) => {
    const coupon: Coupon = createOrderState.useCoupons[index];
    let couponCodes: Array<string | undefined> = createOrderState.useCoupons.filter(x => x.checked)?.map(x => x.couponCode);
    couponCodes = coupon.checked ? couponCodes.filter(x => x !== coupon.couponCode) : couponCodes.concat(coupon.couponCode);

    cartQuery.couponCode = couponCodes.join(',');

    const cart: Cart | null = await queryCartList(cartQuery);
    if (Object.keys(cart).length == 0) {
        return;
    }
    createOrderState.cart = cart;

    createOrderState.useCoupons.forEach((item: Coupon, idx: number) => {
        if (index === idx) {
            createOrderState.useCoupons[idx]['checked'] = true;
        } else {
            createOrderState.useCoupons[idx]['checked'] = false;
        }
    })
    createOrderState.switchCoupon = false;
}

/** 是否使用积分 */
const handleSwitchUsePoint = async (checked: boolean) => {
    cartQuery.point = checked ? createOrderState.point?.availablePoint : 0;
    createOrderState.cart = await queryCartList(cartQuery);
}

/** 取消使用优惠券 */
const handleCancelUseCoupon = async () => {
    createOrderState.useCoupons = createOrderState.useCoupons.map(x => ({ ...x, checked: false }));
    cartQuery.couponCode = null;
    createOrderState.cart = await queryCartList(cartQuery);
    createOrderState.switchCoupon = false;
}

/** 选择订单发货模式 */
const handlerChangeDistributionMode = async (mode: number) => {
    createOrderState.loading = true;
    createOrderState.orderDistributionModel = mode as OrderDistributionModelEnum;
    // 自提
    if (createOrderState.orderDistributionModel === OrderDistributionModelEnum.selfDelivery && !createOrderState.defaultStore) {
        createOrderState.defaultStore = await queryDefaultStore();
    }

    /** 物流配送/ 同城配送切换查询购物车信息 */
    await handleQueryCartList();
    createOrderState.loading = false;
}

// 确定提交订单
const handlerSubmitOrder = async () => {
    if (!createOrderState.isSubmit) {
        return;
    }
    if (!createOrderState.orderDistributionModel) {
        showToast(coreShopLang('请选择配送方式'));
        return;
    }

    /** 物流 或者同城配送 */
    if (needShipAddressCmp.value) {
        if (!createOrderState.defaultShip) {
            showToast(coreShopLang('请选择收货地址'));
            return;
        }
    }

    if (createOrderState.orderDistributionModel === OrderDistributionModelEnum.selfDelivery && !createOrderState.defaultStore) {
        showToast(coreShopLang('请选择自提门店'));
        return;
    }

    createOrderState.isSubmit = false;

    let order: CreateOrder = {
        cartIds: queryParams.cartIds,
        memo: createOrderState.memo || '',
        couponCode: createOrderState.useCoupons?.filter(x => x.checked)?.map(x => x.couponCode).join(','),
        point: createOrderState.usePoint ? createOrderState.point?.availablePoint : 0,
        receiptType: createOrderState.orderDistributionModel,
        source: OrderSourceEnum.H5,
        costFreight: createOrderState.cart.costFreight,
        orderType: createOrderState.cart?.type,
        objectId: queryParams.objectId,
        teamId: queryParams.teamId ? queryParams.teamId : 0,
    };

    if (needShipAddressCmp.value) {
        order.areaId = createOrderState.defaultShip.areaId;
        order.ushipId = createOrderState.defaultShip.id;
    } else {
        order.storeId = createOrderState.defaultStore?.id;
    }

    if (createOrderState.invoice.type != invoiceType.no) {
        order.taxName = createOrderState.invoice?.name || '';
        order.taxType = createOrderState.invoice?.type || undefined;
        order.taxCode = createOrderState.invoice?.code || '';
    }

    if (createOrderState.orderDistributionModel === OrderDistributionModelEnum.selfDelivery) {
        order.ladingName = createOrderState.defaultShip.name;
        order.ladingMobile = createOrderState.defaultShip.mobile;
    }

    const createOrderResult: Result<any> = await createOrder(order);

    if (!createOrderResult.status) {
        createOrderState.isSubmit = true;
        showToast(createOrderResult.msg);
        return;
    }

    let payMentUrl: string = `/order/payment?orderId=${createOrderResult.data.orderId}`;

    if (createOrderResult.data.payStatus == orderPayStatus.yes) { // 此为已付款例如积分抵扣后金额为0等等
        navigateTo(`/order/payment/result?id=${createOrderResult.data.orderId}&money=0`, { replace: true });
        return;
    } else {
        payMentUrl = `${payMentUrl}&type=${createOrderState.cart?.type}`
    }

    createOrderState.isSubmit = true;

    navigateTo(payMentUrl, { replace: true });
}

// 打开发票弹框
const hadnlerOpenInvoiceModal = () => {
    createOrderState.invoiceShowModal = true;
}
// 关闭发票弹框
const handleInvoiceModalCancel = () => {
    createOrderState.invoiceShowModal = false;
}
const handleInvoiceModalOk = (item: InvoiceDetail) => {
    createOrderState.invoice = {
        type: item.type,
        name: item.name,
        code: item.code,
    };
    handleInvoiceModalCancel();
}

// 添加地址
const handleAddressAddModalCancel = () => {
    createOrderState.addAddress = !createOrderState.addAddress
}
const handleAddressAddModalOk = async () => {
    /** 获取默认地址 */
    createOrderState.defaultShip = await getUserDefaultShip();
    handleAddressAddModalCancel();
}

</script>

<style lang='scss' scoped>
@import '@/assets/css/color.scss';
@import './index.scss'
</style>