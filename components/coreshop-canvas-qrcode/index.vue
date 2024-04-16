<template>
    <Popup :show="props.showPopup" closeable 
    :style="{ padding: '30px 60px 30px' }" @close="handleClosePopup">
        <div class="header-box">
            <div></div>
            <div>為您推薦</div>
            <div></div>
        </div>
        <div class="cs-m-t-20 cs-text-align-center title"><span>優質好店邀您共享</span></div>
        <div class="qrcode-box" ref="qrcode">
            <qrcode-vue :value="props.link" :size="200" level="H" style="width:100%;height: 100%;"/>
            <img class="img" src="@/public/images/share/20240416220039_1126.jpeg" alt="" srcset="">
            <img class="canvasImg" v-if="canvasImg" :src="canvasImg" alt="" srcset="">
        </div>
        <p class="cs-m-t-10 cs-text-align-center" style="color:#000">快樂搬馬歡迎有志之士加入團隊，共同推廣健康生活理念，實現資源共享、互利共贏的目標。</p>
        <p class="cs-m-t-10 cs-text-align-center" style="color: #6E737D;">{{$t('长按保存二维码图片')}}</p>
    </Popup>
</template>

<script setup lang='ts'>
import { Popup } from "vant";
import { ref ,watchEffect} from "vue";
import QrcodeVue from "qrcode.vue";
import html2canvas from "html2canvas";
import { useConfigStore } from '@/store';

const configStore = useConfigStore().getConfig;
const qrcode = ref<null | HTMLElement>(null)
let canvasImg = ref('');

const emits = defineEmits(['handleClosePopup']);

const props = withDefaults(defineProps<{
    showPopup?: boolean;
    link?: string;
    img?: string
}>(), {
    showPopup: false,
    link: '',
    img: '',
});

watchEffect(() => {
    if (props.link && qrcode.value) {
        html2canvas((qrcode.value as HTMLElement), {
            useCORS: true,
            allowTaint: false,
            logging: false,
        }).then(canvas => {
            canvasImg.value = canvas.toDataURL('image/png'); 
        })
    }
}) 

const handleClosePopup = () => {
    emits('handleClosePopup');
}
</script>

<style lang='scss' scoped>
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
.title{
    text-align: center;
    font-size: 12px;
    margin-bottom: 8px;
    span{
        background: #FFC65E30;
        color: #B47614;
        padding: 6px 6px;
        border-radius: 2px;
    }
}
.qrcode-box {
    position: relative;
    background: linear-gradient(#ff971b 0%, #ff5000 100%);
    padding: 5px;
    border-radius: 5px;
    display: flex;
    box-sizing: border-box;
    .img {
        display: flex;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border: 2px solid #e84f5d;
        border-radius: 5px;
    }

    .canvasImg {
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
} 
</style>