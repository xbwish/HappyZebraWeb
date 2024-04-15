<template>
 <!-- 单图 -->
 <div class="coreshop-adpop" v-if="props.coreshopData?.parameters?.list?.length > 0">
        <div class="adpop" v-if="closeAdRef">
            <div class="adpop-center">
                <div class="adpop-img">
                    <div  @click="showSliderInfo(props.coreshopData.parameters.list[0].linkType, props.coreshopData.parameters.list[0].linkValue)">
                        <NImage class="ad-img"  :src="props.coreshopData.parameters.list[0].image" object-fit="cover"></NImage>
                    </div>
                    <NImage class="ad-img"  :src="props.coreshopData.parameters.list[0].image" object-fit="cover" @click="showSliderInfo(props.coreshopData.parameters.list[0].linkType, props.coreshopData.parameters.list[0].linkValue)"></NImage>
                </div>
                <NImage class="close-btn"  src="@/public/images/del.pnge" object-fit="cover"></NImage>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NImage} from 'naive-ui'

interface Adpop {
    coreshopData:{
        parameters:{
            list:Array<{
                linkType:string;
                linkValue:string;
                image:string;
            }>
        }
    }
}

const props = withDefaults(defineProps<Adpop>(), {});
 
const closeAdRef=ref<boolean>(true);
const onClosePop=()=>{
    closeAdRef.value=false;
}
 
const showSliderInfo=(linkType:string,linkValue:string)=>{

}

</script>

<style scoped lang="scss">
  .coreshop-adpop {
        .adpop { position: fixed; background: rgba(0,0,0,.5); width: 100%; height: 100vh; z-index: 999; top: 0; left: 0;
            .adpop-center { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 70%; text-align: center;
                .adpop-img { width: 100%; max-height: 500px; margin-bottom: 25px;
                    .ad-img { width: 100%; max-height: 500px; }
                }
                .close-btn { width: 40px; height: 40px; }
            }
        }
    }
</style>
