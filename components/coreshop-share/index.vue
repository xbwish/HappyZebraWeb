<template>
    <div>
        <div class="cs-display-flex  cs-align-items-center"  @click="handleShowShareSheet">
            <NIcon :size="props.size" :color="props.iconBgColor" :depth="1"
                class="share-icon cs-cursor-pointer cs-display-flex">
                <CoreshopIconShareAndroid20Regular />
            </NIcon> 
            <slot name="default"></slot>
        </div>
        

        <div class="share-box" v-show="shareState.isShow">
            <img src="/images/share-tip.png" alt="">
            <div @click="handleCloseShare">關閉</div>
        </div>

        <ShareSheet v-model:show="shareState.showShare" title="立即分享給好友" @select="handleSelectShare"
            :options="shareList" />

        <!-- 二维码 -->
        <coreshop-canvas-qrcode :showPopup="shareState.showPopupQrcode" 
            :link="shareState.wxShare.link"
            :img="shareState.wxShare.imgUrl" 
            @handleClosePopup="handleClosePopupQrcode" />

        <!-- 海报 -->
        <coreshop-canvas-poster :showPopup="shareState.showPopupPoster"
            :link="shareState.wxShare.link"
            :shareType="props.sharePageType" :shareOptions="props.shareOptions"
            @handleClosePopup="handleClosePopupPoster"  />
    </div>
</template>

<script setup lang='ts'>
import { NIcon } from "naive-ui";
import { ShareSheet, showSuccessToast } from "vant";
import { UnwrapRef, reactive } from "vue";
import { UrlSharePageType, VantShareType} from "@/enum";
import { isWechat } from '@/composables/global';
import { wxShare } from '@/utils/wx-share';
import { IWxShare } from '@/model/wechat';
import { queryShare } from '@/composables/shareService';
import { Result, IShareParams } from "@/model";
import { coreShopAuthCookie ,isOpenH5PatternInWeChat} from "@/consts";

const props = withDefaults(defineProps<{
    sharePageType?: number; 
    iconBgColor?: string;
    size?: number; 
    wxShare?: IWxShare;
    shareParams?: IShareParams;
    shareOptions?:any
}>(), {
    sharePageType: UrlSharePageType.goods, 
    iconBgColor: "#000",
    size: 20, 
    wxShare: () => ({}),
    shareParams: () => ({}),
    shareOptions:()=>({}),
});

const shareList = [
    [
        { name: '複製連結', icon: 'link', type: VantShareType.link },
        { name: '分享海報', icon: 'poster', type: VantShareType.poster },
        { name: '二維碼', icon: 'qrcode', type: VantShareType.qrcode },
        // { name: '小程序码', icon: 'weapp-qrcode', type: VantShareType.weappQrcode },
    ]
];

const shareState: UnwrapRef<{
    isShow: boolean;
    showShare: boolean;
    showPopupQrcode: boolean;
    showPopupPoster: boolean;
    wxShare: IWxShare;
}> = reactive({
    isShow: false,
    showShare: false,
    showPopupQrcode: false,
    showPopupPoster:false,
    wxShare: props.wxShare,
})

onMounted(async () => {
    if (isWechat() && isOpenH5PatternInWeChat) {
        shareList.unshift([
            { name: '微信', icon: 'wechat', type: VantShareType.wechat },
            { name: '朋友圈', icon: 'wechat-moments', type: VantShareType.wechatMoments },
            // { name: '微博', icon: 'weibo', type: VantShareType.weibo },
            { name: 'QQ', icon: 'qq', type: VantShareType.qq },
        ])
    } 
    const cookie = useCookie(coreShopAuthCookie); 
    const data: Result<string> = await queryShare(props.shareParams,cookie.value ? true : false);
    if (data.status) {
        shareState.wxShare.link = data.data;
    }
    wxShare(shareState.wxShare);

})

const handleCloseShare = () => {
    shareState.isShow = !shareState.isShow;
}

const handleShowShareSheet = () => {
    shareState.showShare = !shareState.showShare;
};

const handleClosePopupQrcode = () => {
    shareState.showPopupQrcode = !shareState.showPopupQrcode;
}

const handleClosePopupPoster = () => {
    shareState.showPopupPoster = !shareState.showPopupPoster;
}

const handleShareCopyUrl = (msg: string = '分享連結複製成功') => {
    var input = document.createElement("input"); // 创建input对象
    input.value = shareState.wxShare.link || ''; // 设置复制内容
    document.body.appendChild(input); // 添加临时实例
    input.select(); // 选择实例内容
    document.execCommand("Copy"); // 执行复制
    document.body.removeChild(input); // 删除临时实例
    showSuccessToast(msg);
}

const handleSelectShare = (option: any) => {
    if (option.type === VantShareType.wechat) {
        handleCloseShare();
    }
    if (option.type === VantShareType.wechatMoments) {
        handleCloseShare();
    }
    if (option.type === VantShareType.qq) {
        shareState.showShare = false;
        handleCloseShare();
    }
    if (option.type === VantShareType.link) {
        handleShareCopyUrl();
    }
    if (option.type === VantShareType.poster) {
        shareState.showPopupPoster = true;
    }
    if (option.type === VantShareType.qrcode) {
        shareState.showPopupQrcode = true;
    }
    handleShowShareSheet();
}

</script>

<style lang='scss' scoped> 
:deep(.van-share-sheet__options) {
     justify-content: space-between;
     padding: 15px !important;
 }

 .share-box {
     position: fixed;
     top: 0;
     left: 50%;
     transform: translateX(-50%);
     width: 10rem;
     height: 100%;
     background: rgba(0, 0, 0, .8);
     z-index: 9999;

     img {
         display: block;
         position: absolute;
         width: 55%;
         right: 2%;
         top: 2%;
     }

     div {
         position: absolute;
         z-index: 1002;
         bottom: 20%;
         left: 50%;
         transform: translateX(-50%);
         padding: 10px 20%;
         border: 1px solid #6f6f6f;
         color: #fff;
     }
 }
</style>