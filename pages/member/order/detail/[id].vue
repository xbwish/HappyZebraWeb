<template>
	<NuxtLayout name="personal-center">
		<CoreshopTitle :title="$t('订单详情')"></CoreshopTitle>
		<div style="padding-bottom: 1.5rem">
			<section>
				<!--步骤条区域-->
				<div v-if="orderDetailData.basics < 9" class="cs-p-10 cs-p-t-20 cs-m-b-10 cs-background-color-white block">
					<!-- 步骤条 -->
					<div v-if="orderDetailData.basics < 5">
						<Steps :active="orderDetailData.basics" active-color="#f56c6c">
							<Step>{{ $t("下单") }}</Step>
							<Step>{{ $t("付款") }}</Step>
							<Step>{{ $t("发货") }}</Step>
							<Step>{{ $t("收货") }}</Step>
							<Step>{{ $t("评价") }}</Step>
						</Steps>
					</div>

					<div class="cs-m-t-10 cs-m-b-10">
						<!--提示-->
						<div v-if="orderDetailData.basics === 0" class="cs-font-size-14 cs-font-weight-500">
							<p class="cs-text-align-center">{{ $t("拍下成功，待买家支付") }}。</p>
							<p class="cs-text-align-center">
								<span class="cs-color-orange">{{$t('拍下')}}{{ orderDetailData.config.orderCancelTime || 60 }}{{$t('分后')}}</span>
								{{$t('未支付自动取消订单')}}
							</p>
						</div>
						<div v-if="orderDetailData.basics === 1" class="cs-font-size-14">
							<p class="cs-text-align-center cs-font-weight-500">
								{{ $t("支付成功，待卖家发货") }}
							</p>
						</div>
						<div v-if="orderDetailData.basics === 2" class="cs-font-size-14">
							<p class="cs-text-align-center cs-font-weight-500">
								{{ $t("已发货，快递正在路上，务必在收到商品后再确认收货") }}。
							</p>
							<p class="cs-text-align-center cs-font-weight-500">
								<span class="cs-color-orange">{{$t('发货20天')}}</span>
								{{$t('后将自动确认收货')}}
							</p>
						</div>
						<div v-if="orderDetailData.basics === 3" class="cs-font-size-14 cs-font-weight-500">
							<p class="cs-text-align-center">{{ $t("已收货，请您对此次购物体检进行评价") }}。</p>
							<p class="cs-text-align-center">
								<span class="cs-color-orange">{{$t('收货30天')}}</span>
								{{$t('后将自动评价')}}
							</p>
						</div>
						<!-- 状态图标 -->
						<div v-if="orderDetailData.basics === 4" class="cs-font-size-14 cs-display-flex">
							<div class="cs-justify-content-center cs-display-flex cs-align-items-center">
								<img class="cs-percent-w-30" src="/images/arg.png" alt="" srcset="" />
								<p class="cs-text-align-center">
									{{ $t("交易成功，感谢您的评价") }}
								</p>
							</div>
						</div>
						<div v-if="orderDetailData.basics === 6" class="cs-font-size-14 cs-display-flex">
							<div class="cs-justify-content-center cs-display-flex cs-align-items-center">
								<img class="cs-percent-w-30" src="/images/arg.png" alt="" srcset="" />
								<p class="cs-text-align-center">
									{{ $t("交易成功，期待下次服务") }}
								</p>
							</div>
						</div>
						<div v-if="orderDetailData.basics === 7"
							class="cs-font-size-14 cs-display-flex cs-align-items-center cs-justify-content-center">
							<img class="cs-percent-w-30" src="/images/arg.png" alt="" srcset="" />
							<p class="cs-text-align-center">
								{{ $t("订单已取消") }}
							</p>
						</div>
					</div>
				</div>

				<!-- 团购分享拼单 -->
				<div class="cs-p-10 cs-background-color-white cs-m-b-10 block" v-if="orderDetailData.orderInfo.orderType == 2 &&
					orderDetailData.orderInfo.status != 3 &&
					orderDetailData.orderInfo.payStatus != 1
					">
					<p class="cs-font-size-14 cs-font-weight-bolder cs-p-b-10 cs-border-solid-bottom"
						v-if="orderDetailData.teamInfo.status == 1">
						{{ $t("待拼团，还差") }}
						{{ orderDetailData.teamInfo.teamNums || "" }}
						{{ v("人") }}
					</p>
					<p class="cs-font-size-14 cs-font-weight-bolder cs-p-b-10 cs-border-solid-bottom"
						v-if="orderDetailData.teamInfo.status == 2">
						{{ $t("拼团成功，待发货") }}
					</p>
					<p class="cs-font-size-14 cs-font-weight-bolder cs-p-b-10 cs-border-solid-bottom"
						v-if="orderDetailData.teamInfo.status == 3">
						{{ $t("拼团失败") }}
					</p>
					<div class="cs-m-t-20" v-if="orderDetailData.teamInfo.currentCount">
						<div class="cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<div class="cs-percent-w-85">
								<div class="cs-m-l-10 cs-w-30 cs-h-30 cs-position-relative cs-display-inline-block"
									v-for="(item, index) in orderDetailData.teamInfo.list" :key="index">
									<p class="user-head-img-tip" v-if="item.recordId == orderDetailData.teamInfo.teamId">
										{{ $t("拼主") }}
									</p>
									<img class="cs-percent-w-100 cs-percent-h-100 cs-background-color-gray cs-percent-border-radius-50"
										:src="item.userAvatar" alt="" />
								</div>
								<div class="uhihn" v-for="n in orderDetailData.teamInfo.teamNums" :key="n">
									<span>?</span>
								</div>
							</div>
							<div class="cs-percent-w-7"> 
									<CoreshopShare :size="20" iconBgColor="#39b54a"
										:sharePageType="UrlSharePageType.addPinTuan"
										:shareOptions="orderDetailData.shareOptions" 
										:wxShare="orderDetailData.wxShare" 
										:shareParams="orderDetailData.shareParams">
                                </CoreshopShare>
							</div>
						</div>
					</div>
				</div>

				<!--物流信息-->
				<div class="cs-p-10 cs-background-color-white cs-m-b-10 block"
					v-if="orderDetailData.basics != 0 && !orderDetailData.orderInfo.store">
					<p class="cs-font-size-14 cs-font-weight-bolder">
						{{ $t("物流信息") }}
						<span class="cs-m-l-50" v-if="orderDetailData.basics === 2">{{ $t("已发货，请注意查收") }}</span>
					</p>
					<div class="cs-m-t-10 cs-font-size-14">
						<div>
							<span class="cs-color-gray"> {{ $t("收货人") }}： </span>
							<span>
								{{ orderDetailData.orderInfo.shipName || "" }}
								{{ orderDetailData.orderInfo.shipMobile || "" }}
							</span>
						</div>

						<div>
							<span class="cs-color-gray"> {{ $t("收货人") }}：</span>
							<span>
								{{ orderDetailData.orderInfo.shipAreaName || "" }}
								{{ orderDetailData.orderInfo.shipAddress || "" }}
							</span>
						</div>
					</div>
				</div>

				<!--提货信息-->
				<div class="cs-p-10 cs-background-color-white cs-m-b-10 block pick-up"
					v-if="orderDetailData.orderInfo.store">
					<p class="cs-font-size-14 cs-font-weight-bolder cs-p-b-10 cs-border-solid-bottom">
						<CoreshopLanguage :text="$t('提货信息')" />
					</p>
					<div class="cs-m-t-10">
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-100 label">
								<CoreshopLanguage :text="$t('门店名称')" />
							</span>
							<span>{{ orderDetailData.orderInfo.store.storeName || "" }}</span>
						</p>
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-100 label">
								<CoreshopLanguage :text="$t('门店电话')" />
							</span>
							<span>{{ orderDetailData.orderInfo.store.mobile || "无" }}</span>
						</p>
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-100 label">
								<CoreshopLanguage :text="$t('门店地址')" />
							</span>
							<span>{{ orderDetailData.orderInfo.store.address || "无" }}</span>
						</p>
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-100 label">
								<CoreshopLanguage :text="$t('提货人信息')" />
							</span>
							<span>{{ orderDetailData.orderInfo.shipName || "" }} - {{ orderDetailData.orderInfo.shipMobile
								|| "" }}</span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.ladingItem.status">
							<span class="cs-display-inline-block cs-w-100 label">
								<CoreshopLanguage :text="$t('提货码')" />
							</span>
							<span class="cs-color-red" @click="showQrcodeBox(orderDetailData.ladingItem.code)">
								{{ orderDetailData.ladingItem.code || "" }}
							</span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.lading.statusName">
							<span class="cs-display-inline-block cs-w-100 label">
								<CoreshopLanguage :text="$t('提货说明')" />
							</span>
							<span class="cs-display-flex cs-align-items-center">
								{{ $t(orderDetailData.lading.statusName) || "" }}
								<CoreshopButton v-if="!orderDetailData.lading.status && orderDetailData.isClerk && useRoute().query?.data == 'merchant'
									" class="cs-m-l-10" @click="handleGoTakeDelivery(orderDetailData.ladingItem.code)">
									<CoreshopLanguage :text="$t('立即核销')" />
								</CoreshopButton>
							</span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.lading.pickUpTime">
							<span class="cs-display-inline-block cs-w-100">
								<CoreshopLanguage :text="$t('提货时间')" />
							</span>
							<span>
								{{ orderDetailData.lading.pickUpTime || "" }}
							</span>
						</p>
					</div>
				</div>

				<!--商品信息-->
				<div class="cs-p-10 cs-background-color-white cs-m-b-10 block" id="good-detail">
					<p class="cs-font-size-14 cs-font-weight-bolder">
						{{ $t("商品信息") }}
					</p>
					<div class="cs-m-t-10">
						<ul class="product-box">
							<li v-for="item in orderDetailData.orderInfo.items" :key="item.id"
								class="cs-display-flex cs-align-content-center">
								<div calss="cs-display-flex">
									<CoreshopImage class="cs-w-80 cs-h-80" :src="item.imageUrl" root="#good-detail">
									</CoreshopImage>
								</div>
								<div
									class="cs-m-l-10 cs-display-flex cs-flex-direction-column cs-justify-content-space-between">
									<p class="cs-font-size-14 cs-line-height-20"
										v-if="orderDetailData.orderInfo.orderType == 1">
										{{ item.name }}
									</p>
									<p class="cs-font-size-14 cs-line-height-20"
										v-if="orderDetailData.orderInfo.orderType == 2">
										{{ item.name }}
									</p>
									<p class="cs-color-gray">{{ item.addon }}</p>
									<p class="cs-line-height-20">
										<span class="cs-font-size-16 cs-color-red">NT${{ item.price }}</span>
										<span class="cs-font-size-14 cs-m-l-20">{{ $t("数量") }}：x{{ item.nums
										}}</span>
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<!-- 发票信息 -->
				<div class="cs-p-10 cs-background-color-white cs-m-b-10 block"
					v-if="orderDetailData.orderInfo.invoice && orderDetailData.orderInfo.invoice.type != 1">
					<p class="cs-font-size-14 cs-font-weight-bolder cs-p-b-10 cs-border-solid-bottom">
						<CoreshopLanguage :text="$t('发票信息')" />
					</p>
					<div class="cs-m-t-10 invoice">
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-150 label">
								<CoreshopLanguage :text="$t('发票类型')" />
							</span>
							<span v-if="orderDetailData.orderInfo.taxType == invoiceType.no">{{ $t("无") }}</span>
							<span v-else>{{
								orderDetailData.orderInfo.taxType == invoiceType.company ? $t("公司") :
								$t("个人")
							}}</span>
						</p>
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-150 label">
								<CoreshopLanguage :text="$t('发票抬头')" />
							</span>
							<span>{{ orderDetailData.orderInfo.taxTitle || $t("无") }}</span>
						</p>
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-150 label">
								<CoreshopLanguage :text="$t('发票税号')" />
							</span>
							<span>{{ orderDetailData.orderInfo.taxCode || $t("无") }}</span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.orderInfo.invoice.fileUrl">
							<span class="cs-display-inline-block cs-w-150">
								<CoreshopLanguage :text="$t('下载发票')" />
							</span>
							<CoreshopButton @click="handleSaveInvoice()">
								<CoreshopLanguage :text="$t('保存到本地')" />
							</CoreshopButton>
						</p>
					</div>
				</div>

				<!--费用信息-->
				<div class="cs-p-10 cs-background-color-white cs-m-b-10 block">
					<p class="cs-font-size-14 cs-font-weight-bolder cs-border-solid-bottom cs-p-b-10">
						{{ $t("费用信息") }}
					</p>
					<div class="cs-m-t-10 pay-money-info">
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.orderInfo.promotionObj && orderDetailData.orderInfo.promotionObj.length > 0">
							<span class="cs-display-inline-block cs-w-150 label"> {{ $t("订单优惠") }}</span>
							<span>
								<em class="cs-text-price" v-for="(item, key) in orderDetailData.orderInfo.promotionObj"
									:key="key" v-show="item.type == 2">{{ item.name }}</em>
							</span>
						</p>
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-150 label">{{ $t("商品总额") }}</span>
							<span class="cs-text-price">{{ orderDetailData.orderInfo.goodsAmount }} </span>
						</p>
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-150 label">{{ $t("运费") }}</span>
							<span>+<em class="cs-text-price cs-m-l-5">{{ orderDetailData.orderInfo.costFreight }}</em>
							</span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.orderInfo.goodsDiscountAmount > 0">
							<span class="cs-display-inline-block cs-w-150 label">{{ $t("商品优惠") }}</span>
							<span class="cs-text-price">{{ orderDetailData.orderInfo.goodsDiscountAmount }} </span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.orderInfo.pointMoney > 0">
							<span class="cs-display-inline-block cs-w-150 label">{{ orderDetailData.config.pointShowName
							}}{{ $t("优惠") }}</span>
							<span class="cs-text-price">{{ orderDetailData.orderInfo.pointMoney }} </span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.orderInfo.orderDiscountAmount > 0">
							<span class="cs-display-inline-block cs-w-150 label">{{ $t("订单优惠") }}</span>
							<span class="cs-text-price">{{ orderDetailData.orderInfo.orderDiscountAmount }} </span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.orderInfo.couponDiscountAmount > 0">
							<span class="cs-display-inline-block cs-w-150 label">{{ $t("优惠券优惠") }}</span>
							<span class="cs-text-price">{{ orderDetailData.orderInfo.couponDiscountAmount }} </span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.orderInfo.payStatus > 1">
							<span class="cs-display-inline-block cs-w-150 label">{{ $t("支付方式") }}</span>
							<span>{{$t(orderDetailData.orderInfo.paymentName) }} </span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.orderInfo.payStatus > 1">
							<span class="cs-display-inline-block cs-w-150 label">{{ $t("支付时间") }}</span>
							<span>{{ orderDetailData.orderInfo.paymentTime }} </span>
						</p>
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-150 cs-font-weight-bolder label">{{
								$t("应付款")
							}}</span>
							<span class="cs-text-price cs-font-weight-bolder">{{ orderDetailData.orderInfo.orderAmount }}
							</span>
						</p>
					</div>
				</div>

				<!--订单信息-->
				<div class="cs-p-10 cs-background-color-white cs-m-b-10 block">
					<p class="cs-font-size-14 cs-font-weight-bolder cs-border-solid-bottom cs-p-b-10">
						<CoreshopLanguage :text="$t('订单信息')" />
						<!-- <span class="cs-font-size-14 cs-color-red">（{{ $t(orderDetailData.orderInfo.globalStatusText) }}）</span> -->
					</p>
					<div class="cs-m-t-10 order-info">
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-150 label">
								<CoreshopLanguage :text="$t('订单编号')" />
							</span>
							<span>{{ orderDetailData.orderInfo.orderId || "" }}</span>
						</p>
						<p
							class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
							<span class="cs-display-inline-block cs-w-150 label">
								<CoreshopLanguage :text="$t('订单类型')" />
							</span>
							<!-- <span>{{ $t(orderDetailData.orderInfo.typeText) || "" }}</span> -->
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.orderInfo.paymentName && orderDetailData.orderInfo.payStatus > 1">
							<span class="cs-display-inline-block cs-w-150 label">
								<CoreshopLanguage :text="$t('支付方式')" />
							</span>
							<span>{{ $t(orderDetailData.orderInfo.paymentName) || "" }}</span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.orderInfo.createTime">
							<span class="cs-display-inline-block cs-w-150 label">
								<CoreshopLanguage :text="$t('下单时间')" />
							</span>
							<span>{{ orderDetailData.orderInfo.createTime || "" }}</span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.basics > 0 && orderDetailData.orderInfo.paymentTime">
							<span class="cs-display-inline-block cs-w-150 label">
								<CoreshopLanguage :text="$t('支付时间')" />
							</span>
							<span>{{ orderDetailData.orderInfo.paymentTime || "" }}</span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.basics > 1 && orderDetailData.delivery && orderDetailData.delivery.createTime">
							<span class="cs-display-inline-block cs-w-150 label">
								<CoreshopLanguage :text="$t('发货时间')" />
							</span>
							<span>{{ orderDetailData.delivery.createTime || "" }}</span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.basics > 2 && orderDetailData.delivery && orderDetailData.orderInfo.confirmTime">
							<span class="cs-display-inline-block cs-w-150 label">
								<CoreshopLanguage :text="$t('确认时间')" />
							</span>
							<span>{{ orderDetailData.orderInfo.confirmTime || "" }}</span>
						</p>
						<p class="cs-font-size-14 cs-m-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
							v-if="orderDetailData.basics > 3 && orderDetailData.orderInfo.updateTime">
							<span class="cs-display-inline-block cs-w-150 label" v-if="orderDetailData.basics >= 7">
								<CoreshopLanguage :text="$t('取消时间')" />
							</span>
							<span class="cs-display-inline-block cs-w-150 label" v-else>
								<CoreshopLanguage :text="$t('完成时间')" />
							</span>
							<span>{{ orderDetailData.orderInfo.updateTime || "" }}</span>
						</p>
					</div>
				</div>
			</section>
			<coreshop-product-recommend />
			<div class="btn-box">
            	<div class="cs-p-10" v-if="orderDetailData.orderInfo.addAftersalesStatus">
					<CoreshopButton btnSize.small bg-color="#f0a020" ghost :bordered="true"
						@on-click="handleApplyAfterSales(orderDetailData.orderInfo.orderId)">
						<CoreshopLanguage :text="$t('申请售后')" />
					</CoreshopButton>
				</div>
				<div class="cs-p-10"
					v-if="orderDetailData.orderInfo.billAftersalesId && orderDetailData.orderInfo.billAftersalesId != false">
					<CoreshopButton btnSize.small round ghost
                        bg-color="#565b6f"
						@on-click="handleViewAfterSales(orderDetailData.orderInfo.aftersalesItem[0].aftersalesId)"
						:bordered="true">
						<CoreshopLanguage :text="$t('查看售后')" />
					</CoreshopButton>
				</div>
				<div class="cs-p-10"
					v-if="orderDetailData.orderInfo.status == 1 && orderDetailData.orderInfo.payStatus == 1">
					<CoreshopButton :size="btnSize.small" bg-color="red"
						@on-click="handlegoToPay(orderDetailData.orderInfo.orderId)">
						<CoreshopLanguage :text="$t('立即支付')" />
					</CoreshopButton>
				</div>
				<div class="cs-p-10" v-if="orderDetailData.orderInfo.status == 1 &&
					orderDetailData.orderInfo.payStatus >= 2 &&
					orderDetailData.orderInfo.shipStatus >= 3 &&
					orderDetailData.orderInfo.confirmStatus == 1
					">
					<CoreshopButton btnSize.small bg-color="#8dc63f" round ghost :bordered="true"
						@on-click="handletackDelivery(orderDetailData.orderInfo.orderId)">
						<CoreshopLanguage :text="$t('确认收货')" />
					</CoreshopButton>
				</div>
				<div class="cs-p-10" v-if="orderDetailData.orderInfo.status == 1 &&
					orderDetailData.orderInfo.payStatus >= 2 &&
					orderDetailData.orderInfo.shipStatus >= 3 &&
					orderDetailData.orderInfo.confirmStatus >= 2 &&
					!orderDetailData.orderInfo.isComment
					">
					<CoreshopButton btnSize.small @on-click="handletoEvaluate(orderDetailData.orderInfo.orderId)"
						:bordered="true" round ghost>
						<CoreshopLanguage :text="$t('立即评价')" />
					</CoreshopButton>
				</div>
			</div>
            <Popup v-model:show="orderDetailData.showCodeModal">
            	<qrcode-vue :value="orderDetailData.ladingItem.code" :size="150" level="H" />
            </Popup>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { OrderDetail } from "@/model/order";
import { queryOrderDetail, queryOrderPinTuanTeamInfo, queryConfirmOrder } from "@/composables/order";
import { Result } from "@/model/result";
import { Step, Steps, showToast } from "vant";
import { useConfigStore, usePageConfig } from "@/store";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { Config } from "@/model/config";
import { invoiceType, orderStatus, orderPayStatus, orderConfirmStatus, orderShipStatus } from "@/enum";
import { getIsStoreUser } from "@/composables/member";
import QrcodeVue from "qrcode.vue";
import { IWxShare, IShareParams ,IShareMessageArguments} from '@/model';
import {
    ShareType, UrlSharePageType,
    UrlShareClentType, shareUrl,btnSize
} from "@/enum";
import { showConfirmDialog,Popup } from 'vant';
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
	layout: false,
});

const route: RouteLocationNormalizedLoaded = useRoute();
usePageConfig().set_show_back();
const orderDetailData: UnwrapRef<{
	basics: number;
	orderInfo: any;
	config: Config;
	lading: any;
	ladingItem: any;
	delivery: any; // 发货信息
	teamInfo: any; // 拼团信息
	orderId: string | string[];
	isClerk: boolean;
	showCodeModal: boolean;
	wxShare: IWxShare;
	shareParams: IShareParams;
	shareOptions: {groupId:number};
}> = reactive({
	basics: 0,
	orderInfo: {},
	lading: {},
	ladingItem: {
		status: false,
		code: "",
	},
	delivery: {},
	teamInfo: {},
	config: useConfigStore().getConfig,
	orderId: useRoute()?.params?.orderId,
	isClerk: false,
	showCodeModal: false,
	wxShare: {},
	shareParams: { params: {} },
	shareOptions: {groupId:0}
});

// 判断是否是店员
const getIsClerk: Result<any> = await getIsStoreUser();
orderDetailData.isClerk = getIsClerk.data.isClerk;

// 去提货单核销页
const handleGoTakeDelivery = (orderId: string) => {
	return navigateTo(`/member/merchant/takeDelivery/detail?id=${orderId}`);
};

// 分享接口参数
const getShareUrl = (data:IShareMessageArguments) => {
    orderDetailData.shareParams.client = UrlShareClentType.wxofficial;
    orderDetailData.shareParams.page = UrlSharePageType.pinTuan;
    if (process.client) {
        orderDetailData.shareParams.url = `${window.location.origin}${shareUrl}`;
    }
    orderDetailData.shareParams.type = ShareType.url;
    orderDetailData.shareParams.params.groupId = orderDetailData.teamInfo.ruleId;
    orderDetailData.shareParams.params.goodsId = data.goodsId;
    orderDetailData.shareParams.params.teamId = orderDetailData.teamInfo.teamId || 0;

    // 分享信息
    orderDetailData.wxShare.title = data.title;
    orderDetailData.wxShare.desc = data.desc;
    orderDetailData.wxShare.imgUrl = data.imgUrl;
}

// 获取订单详情
const getOrderDetail = async () => {
	console.log('进入测试');

	let _params: any = { id: route.params.id };
	if (route.query?.data) {
		_params["data"] = route.query?.data;
	}
	const orderDetail: Result<OrderDetail> = await queryOrderDetail(_params);
	const data = orderDetail.data!;
	
	orderDetailData.basics = data.status;
	try
	{
	switch (data.status) {
		case orderStatus.normal:
			if (data.payStatus === orderPayStatus.no) {
				orderDetailData.basics = 0;
			} else if (data.payStatus >= orderPayStatus.yes && data.shipStatus === orderShipStatus.no) {
				orderDetailData.basics = 1;
			} else if (data.payStatus >= orderPayStatus.yes && data.shipStatus === orderShipStatus.partialYes) {
				orderDetailData.basics = 2;
			} else if (
				data.payStatus >= orderPayStatus.yes &&
				data.shipStatus >= orderShipStatus.yes &&
				data.confirmStatus === orderConfirmStatus.receiptNotConfirmed
			) {
				orderDetailData.basics = 2;
			} else if (
				data.payStatus >= orderPayStatus.yes &&
				data.shipStatus >= orderShipStatus.yes &&
				data.confirmStatus >= orderConfirmStatus.confirmReceipt &&
				data.isComment === false
			) {
				orderDetailData.basics = 3;
			} else if (
				data.payStatus >= orderPayStatus.yes &&
				data.shipStatus >= orderShipStatus.yes &&
				data.confirmStatus >= orderConfirmStatus.confirmReceipt &&
				data.isComment === true
			) {
				orderDetailData.basics = 4;
			}
			break;
		case orderStatus.complete:
			orderDetailData.basics = data.globalStatus;
			break;
		case orderStatus.cancel:
			orderDetailData.basics = data.globalStatus;
			break;
	}
}
catch(error)
{
	console.log(error);

}

	// 转换优惠信息
	for (let i in data.items) {
		data.items[i].promotionList = JSON.parse(data.items[i].promotionList);
	}
	orderDetailData.orderInfo = data;
	
	if (data.delivery.length > 0) {
		orderDetailData.delivery = data.delivery[0];
	}

	if (data.ladingItem[0]) {
		orderDetailData.ladingItem = {
			status: true,
			code: data.ladingItem[0].id,
		};
		orderDetailData.lading = data.ladingItem[0];
	}

	//判断是否拼团
	if (data.orderType == 2) {
		getOrderPinTuanTeamInfo(data.orderId);
	}
};
getOrderDetail();

// 获取拼团详情
const getOrderPinTuanTeamInfo = async (orderId: string) => {
	const pinTuanInfo: Result<any> = await queryOrderPinTuanTeamInfo({
		orderId: orderId,
	}); 
	
	orderDetailData.shareOptions.groupId = pinTuanInfo.data.ruleId || 0;

	orderDetailData.teamInfo = {
		list: pinTuanInfo.data.teams,
		userAvatar: pinTuanInfo.data.userAvatar,
		currentCount: pinTuanInfo.data.teams.length,
		peopleNumber: pinTuanInfo.data.peopleNumber,
		teamNums: pinTuanInfo.data.teamNums, //剩余
		closeTime: pinTuanInfo.data.closeTime, //关闭时间
		id: pinTuanInfo.data.id, //拼团id
		teamId: pinTuanInfo.data.teamId, //拼团团队id
		goodsId: pinTuanInfo.data.goodsId, //拼团商品id
		ruleId: pinTuanInfo.data.ruleId,
		status: pinTuanInfo.data.status,
	};
	
	// 分享信息 
	getShareUrl({
		'title': orderDetailData.orderInfo.items[0].name || '',
		'desc': orderDetailData.orderInfo.items[0].addon || '',
		'imgUrl': orderDetailData.orderInfo.items[0].imageUrl || '',
		'goodsId': orderDetailData.orderInfo.items[0].goodsId || '',
	});
};

// 保存发票到本地
const handleSaveInvoice = () => { };

// 查看售后
const handleViewAfterSales = (aftersalesId: string) => {
	return navigateTo(`/member/afterSales/detail/${aftersalesId}`);
};

// 申请售后
const handleApplyAfterSales = (orderId: string) => {
	return navigateTo(`/member/afterSales/submit/${orderId}`);
};

// 跳转去评价
const handletoEvaluate = (orderId: string) => {
	return navigateTo(`/member/order/evaluate/${orderId}`);
};

// 确认收货
let id: string = "";
const handletackDelivery = (orderId: string) => {
	id = orderId;

    showConfirmDialog({
    title: coreShopLang("确认收获"),
    message: coreShopLang("确认执行收货操作"),
    confirmButtonColor:'#f56c6c',
    confirmButtonText: coreShopLang("确认"),
    cancelButtonText: coreShopLang("取消"),
  })
    .then( async () => {
      const confirmOrderRes: Result = await queryConfirmOrder({ id: orderId});
      if(!confirmOrderRes.status){
        showToast(confirmOrderRes.msg);
        return;
      }
      getOrderDetail();
    })
    .catch(() => {
      // on cancel
    });
};

// 跳转去支付
const handlegoToPay = (orderId: string) => {
	return navigateTo(`/order/payment?orderId=${orderId}&type=1`);
};

//
const showQrcodeBox = (code: string) => {
	// 判断是否是店员
	if (!orderDetailData.lading.status && orderDetailData.isClerk && useRoute().query?.data == "merchant") {
		orderDetailData.showCodeModal = false;
	} else {
		orderDetailData.showCodeModal = true;
	}
};

const handleCancelCode = () => {
	orderDetailData.showCodeModal = !orderDetailData.showCodeModal;
};
</script>

<style lang="scss" scoped>
.block {
	background: #ffffff;
	box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
	border-radius: 8px;
	margin: 10px;
}

.product-box {
	li:not(:last-child) {
		border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
		margin-bottom: 10px;
		padding-bottom: 8px;
	}
}

.uhihn {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-left: 5px;
	display: inline-block;
	border: 1px dashed #e1e1e1;
	color: #d1d1d1;
	box-sizing: border-box;
	position: relative;
	vertical-align: middle;

	span {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 20px;
		line-height: 1;
		margin: auto;
	}
}

.user-head-img-tip {
	position: absolute;
	top: -3px;
	left: -5px;
	display: inline-block;
	background-color: #ff7159;
	color: #fff;
	font-size: 0.2rem;
	z-index: 99;
	padding: 0 2px;
	border-radius: 5px;
	transform: scale(0.8);
}

.btn-box {
	position: fixed;
	left: 50%;
	bottom: 0;
	width: 10rem;
	transform: translateX(-50%);
	background-color: #fff;
	box-shadow: 0 0 15px #dcdcdc;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.pick-up,
.order-info,
.invoice,
.pay-money-info {
	p {
		padding: 3px 0;
	}
}

.label {
	color: #999999;
	font-weight: 400;
	font-size: 14px;
}
</style>
