<template>
    <div class="layout-laoding">
        <div class="laoding-box">
            <Loading color="#f56c6c" />
        </div>
    </div>
</template>
<script setup lang='ts'>
import {Loading} from 'vant';

const props = withDefaults(defineProps<{
    text?: string;
}>(), {
    text: '正在加载中...',
});

</script>
<style lang='scss' scoped>
.layout-laoding{
    position: fixed;
    left: 50%;
    top: 0;
    width: 10rem;
    height: 100%;
    transform: translateX(-50%);
    z-index: 999;
    .laoding-box{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 5px;
    }
}
</style>