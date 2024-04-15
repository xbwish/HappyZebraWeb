<template>
    <Popup :show="props.showPopup" closeable @close="handleClosePopup">
        <div class="poster-box" ref="poster">
            <div class="data-box">
                <!-- <img class="goodsImg"  :src="shareState.shareData.image || shareState.config.shopLogo" alt="" srcset="">    -->
                <!-- <p class="name">{{ shareState.shareData.name }}</p> -->
                <div class="header-box">
                    <div></div>
                    <div>{{ shareState.shareData.name }}</div>
                    <div></div>
                </div>
                <p class="userName">{{ shareState.userName || shareState.config.shopName }}</p>

                <!-- <p class="storeDesc" v-if="shareState.shareData.storeDesc">{{ shareState.shareData.storeDesc }}</p> -->
                <p class="price-box" v-if="false">
                    <span class="price" v-if="shareState.shareData.price">NT${{ shareState.shareData.price }} </span>
                    <span class="mktprice" v-if="shareState.shareData.mktprice">NT${{ shareState.shareData.mktprice }}</span>
                    <span class="peopleNumber" v-if="shareState.shareData?.peopleNumber">{{ shareState.shareData.peopleNumber }}{{$t('人团')}}</span>
                </p>
                <div class="userInfo-box">
                    <!-- <div class="nickName-message-box">
                        <div class="avatarImage-avatarName-box">
                            <div class="avatarImage-box" v-if="shareState.avatarImage">
                                <img :src="shareState.avatarImage" alt="" />
                            </div> 
                            <div class="avatarName-box">
                                <p class="nickName">{{ shareState.userName || shareState.config.shopName }}</p>
                                <p class="desc"> {{shareState.desc}} </p>
                            </div> 
                        </div>
                        
                        <p class="brief">{{ shareState.shareData.brief }}</p>
                        <p class="cs-font-size-12 cs-text-align-left" v-if="shareState.shareData?.endTime">{{$t('截至')}}:{{  shareState.shareData.endTime }}</p>
                    </div> -->
                    <div class="qrcode-box">
                        <qrcode-vue :value="props.link" :size="80" level="H" />
                        <img class="img"  :src="shareState.shareData.image || shareState.config.shopLogo" alt="" srcset="">
                    </div>
                </div>
                <div class="shop-message">
                    <p class="desc"> {{shareState.desc}} </p>
                    <p class="brief">{{ shareState.shareData.brief }}</p>
                </div>  
            </div>
            <img class="canvasImg" v-if="shareState.canvasImg" :src="shareState.canvasImg" alt="" srcset="">
            <p class="poster-hint" v-if="shareState.canvasImg" style="color: #292B2E;">{{$t('长按保存海报图片')}}</p> 
        </div>

    </Popup>
</template>

<script setup lang='ts'>
import { Popup } from "vant";
import { ref, watchEffect, UnwrapRef } from "vue";
import QrcodeVue from "qrcode.vue";
import html2canvas from "html2canvas"
import { UrlSharePageType } from "@/enum";
import { queryProductDetial } from "@/composables/productService";
import {
    queryPinTuanGoodsInfo, queryServiceDetail, querySeckillInfo,
    queryGroupInfo} from '@/composables/activity';
import { useMemberStore, useConfigStore } from '@/store';
import { queryDistributionStoreInfo } from '@/composables/distribution';
import { queryAgentStoreInfo } from '@/composables/agent'; 
import { Config } from '@/model/config';
import { coreShopAuthCookie } from '@/consts'
import { IAccountInfo } from '@/model/account'
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
interface IShareData {
    image?: string;
    brief?: string;
    name?: string;
    price?: number;
    mktprice?: number;
    endTime?: string;
    peopleNumber?: number;
    groupEndTime?: string; 
    storeDesc?: string;
}

const poster = ref<null | HTMLElement>(null);
const memberStore = useMemberStore();
const configStore = useConfigStore();

const shareState: UnwrapRef<{
    shareData: IShareData;
    userName: string;
    avatarImage:string;
    canvasImg: string;
    desc: string;
    config:Config
}> = reactive({
    shareData: {},
    userName: '',
    avatarImage:'',
    canvasImg: "",
    desc: "",
    config:configStore.getConfig || {},
}); 

const emits = defineEmits(['handleClosePopup']);

const props = withDefaults(defineProps<{
    showPopup: boolean;
    shareType: number;
    shareOptions?: any;
    link?: string;
}>(), {
    showPopup: false,
    shareType: 0,
    link: '',
    shareOptions: () => ({}),
});

onMounted(async () => {
    if (props.shareType === UrlSharePageType.index) { 
        shareState.desc = coreShopLang('为您推荐');
        shareState.shareData.brief = shareState.config?.shareTitle;
        shareState.shareData.image = shareState.config?.shopLogo;
        shareState.shareData.storeDesc = shareState.config?.shopDesc;
        shareState.shareData.name = shareState.config?.shopName;
    }

    if (props.shareType === UrlSharePageType.goods) {
        const res = await queryProductDetial({
            id: props.shareOptions.goodsId,
        });
        shareState.desc = coreShopLang('为您挑选了一个好物');
        shareState.shareData.image = res.data?.image;
        shareState.shareData.brief = res.data?.brief;
        shareState.shareData.name = res.data?.name;
        shareState.shareData.price = res.data?.product?.price;
        shareState.shareData.mktprice = res.data?.product?.mktprice; 
    }

    if (props.shareType === UrlSharePageType.pinTuan || props.shareType === UrlSharePageType.addPinTuan) {
        const res = await queryPinTuanGoodsInfo({
            id: props.shareOptions.groupId, 
            data: false,
        });
        shareState.desc = coreShopLang('为您推荐了一个拼团活动');
        shareState.shareData.image = res.data?.image;
        shareState.shareData.brief = res.data?.pinTuanRule?.name;
        shareState.shareData.name = res.data?.name;
        shareState.shareData.price = res.data?.product?.price;
        shareState.shareData.mktprice = res.data?.product?.mktprice;
        shareState.shareData.endTime = res.data?.pinTuanRule?.endTime;
        shareState.shareData.peopleNumber = res.data?.pinTuanRule?.peopleNumber; 
    }

    if (props.shareType === UrlSharePageType.serviceGoods) {
        const res = await queryServiceDetail({
            id: props.shareOptions.serviceGoodsId, 
            data: false,
        });
        shareState.desc = coreShopLang('为您推荐了一个服务商品');
        shareState.shareData.image = res.data?.thumbnail;
        shareState.shareData.brief = res.data?.description;
        shareState.shareData.name = res.data?.title;
        shareState.shareData.price = res.data?.money;   
    }

    if (props.shareType === UrlSharePageType.seckill) {
        const res = await querySeckillInfo({ 
            id: props.shareOptions.groupId,
            type: UrlSharePageType.seckill,
            needSku: true,
        });
        shareState.desc = coreShopLang('为您推荐了一个秒杀');
        shareState.shareData.image = res.data?.image;
        shareState.shareData.brief = res.data?.brief;
        shareState.shareData.name = res.data?.name;
        shareState.shareData.price = res.data?.price;
        shareState.shareData.mktprice = res.data?.mktprice;   
        shareState.shareData.endTime = res.data?.groupEndTime;
    }

    if (props.shareType === UrlSharePageType.group) {
        const res = await queryGroupInfo({ 
            id: props.shareOptions.groupId,
            type: UrlSharePageType.group,
            needSku: true,
        });
        shareState.desc = coreShopLang('为您推荐了一个团购');
        shareState.shareData.image = res.data?.image;
        shareState.shareData.brief = res.data?.brief;
        shareState.shareData.name = res.data?.name;
        shareState.shareData.price = res.data?.price;
        shareState.shareData.mktprice = res.data?.mktprice;  
        shareState.shareData.endTime = res.data?.groupEndTime;  
    }

    if (props.shareType === UrlSharePageType.inv) { 
        
        const res = await queryDistributionStoreInfo({ 
            id: props.shareOptions.store, 
        }); 
        shareState.desc = coreShopLang('扫描进入我的店铺吧');
        shareState.shareData.name = `${res.data.storeName || ''} ${coreShopLang('我的店铺')}`;
        shareState.shareData.storeDesc = res.data?.storeDesc || '';
        shareState.shareData.brief = `${coreShopLang('共有')}${res.data?.totalGoods || 0}${coreShopLang('件商品供您选择')}`;
        shareState.shareData.image =   res.data?.storeLogo || '/images/good.jpg' ;  
    }

    if (props.shareType === UrlSharePageType.agent) { 
        
        const res = await queryAgentStoreInfo({ 
            id: props.shareOptions.store, 
        }); 
        shareState.desc = coreShopLang('扫描进入我的店铺吧');
        shareState.shareData.name = `${res.data.storeName || ''} ${coreShopLang('我的店铺')}`;
        shareState.shareData.storeDesc = res.data?.storeDesc || ''; 
        shareState.shareData.brief = `${coreShopLang('共有')}${res.data?.totalGoods || 0}${coreShopLang('件商品供您选择')}`;
        shareState.shareData.image =  res.data?.storeLogo || '/images/good.jpg';  
    }   

    if (useCookie(coreShopAuthCookie).value) {
        const data:IAccountInfo = await memberStore.getUserData;
        shareState.userName = data.nickName || '';
        shareState.avatarImage = data.avatarImage || ''; 
    }
    
})

watchEffect(() => {
    if (props.link && poster.value) {
        html2canvas((poster.value as HTMLElement), {
            useCORS: true,
            allowTaint: false,
            logging: false,
        }).then(canvas => {
            shareState.canvasImg = canvas.toDataURL('image/png'); 
        })
    }
})

const handleClosePopup = () => {
    emits('handleClosePopup');
}
</script>

<style lang='scss' scoped>
.poster-box {
    position: relative;
    padding: 1.5rem 0.5rem;
    // background: linear-gradient(#ff971b 0%, #ff5000 100%);
    .data-box {
        width: 7.5rem;
        margin: 0 auto;
        // padding: 0.5rem 0.3rem;
        background-color: #fff;
        border-radius: 10px;
        .goodsImg{
            width: 100%;
        }

        .name {
            font-size: 0.5rem;
            line-height: 0.7rem;
            margin-top: 0.25rem;
            text-align: left;
        }
        .storeDesc{
            font-size: 0.3rem;
        }
        .price-box {
            display: flex;
            align-items: center;
            margin-top: 0.2rem;

            .price {
                font-weight: bold;
                font-size: 0.6rem;
                color: #fd1d1c;
                line-height: 1;
            }

            .mktprice {
                margin-left: 0.2rem;
                font-size: 0.3rem;
                color: #bdbdbd;
                line-height: 1;
                align-self: flex-end;
                text-decoration: line-through;
            }

            .peopleNumber{
                font-size: 0.35rem;
                padding: 0.05rem 0.2rem;
                border-radius: 5px;
                color: #fff;
                margin-left: 0.2rem;
                background-color: rgb(141, 198, 63);
            }
        }
    }


    .userInfo-box {
        margin-top: 0.2rem;
        display: flex; 
        justify-content: space-between;

        .nickName-message-box {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
            align-self: end;
            .avatarImage-avatarName-box{
                display: flex; 
                align-items: center;
                .avatarImage-box{
                    width: 40px;
                    height: 40px;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                } 
            }
            .avatarName-box{ 
                .nickName {
                    font-size: 0.45rem;
                    text-align: left;
                    line-height: 1;
                } 
                .desc { 
                    margin-top:5px;
                    margin-left: 1px;
                    text-align: left; 
                    line-height: 1;
                }
            }
            

            .brief { 
                margin-top: 5px;
                align-self: baseline;
                border-radius: 5px; 
                font-size: 0.3rem;
                color: #bb985b;
                background-color: #fff4d9;
                padding: 0.05rem 0.1rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 4.5rem;
            }
        }

        .qrcode-box {
            position: relative;
            display: inline-flex;
            display: block;
            background: linear-gradient(#ff971b 0%, #ff5000 100%);
            padding: 3px;
            border-radius: 5px;
            height:80px;
            margin: 0 auto;
            .img {
                display: flex;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 20px; 
                border-radius: 5px;
            }
        }
    }

    .canvasImg {
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .poster-hint{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0.4rem;
        color: #fff;
        font-size: 0.35rem;
    }

}


.header-box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    :nth-of-type(1){
        width: 37px;
        height: 2px;
        background: linear-gradient(90deg, rgba(211, 49, 35, 0) 0%, #D33123 100%);
    }
    :nth-of-type(2){
        margin: 0 10px;
        font-size: 18px;
        color: #D33123;
        font-weight: bold;
    }
    :nth-of-type(3){
        width: 37px;
        height: 2px;
        background: linear-gradient(90deg, rgba(211, 49, 35, 0) 0%, #D33123 100%);
    }
}

.userName{
    display: block;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color:#292B2E;
}

.shop-message{
    font-size: 14px;
    color: #292B2E;
    .desc{
        text-align: center;
        padding: 2px 0;
    }
    
    .brief { 
        margin: 0 auto;
        text-align: center;
        margin-top: 2px;
        align-self: baseline;
        border-radius: 5px; 
        font-size: 0.3rem;
        color: #bb985b;
        background-color: #fff4d9;
        padding: 0.05rem 0.05rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 4.5rem;
        display: block;
    }
}
</style>