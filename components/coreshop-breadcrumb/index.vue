<template>
    <n-breadcrumb>
        <n-breadcrumb-item v-for="item in breadcrumbData" :key="item.path ||'#'">
            <Nuxt-link :to="item.path ||'#'">{{ item.title }}</Nuxt-link>

        </n-breadcrumb-item>
    </n-breadcrumb>
</template>

<script setup lang='ts'>
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";
import { Ref } from "vue";

const route = useRoute();

interface Breadcrumb {
    title: string;
    path: string | null;

    /** 是否可点击 */
    clickable?: boolean;
}


// 生成数组数据
const breadcrumbData: Ref<Array<Breadcrumb>> = ref<Array<Breadcrumb>>([]);

const getBreadcrumbData = () => {
    const matchedRoutes: Array<Breadcrumb> = route.matched?.filter(item => item?.meta && item?.meta?.title)?.map(item => ({
        title: (item.meta?.title || '') as string,
        path: item.path, clickable: true
    })) || [];
    if (Array.isArray(matchedRoutes) && matchedRoutes.length > 0) {
        breadcrumbData.value = matchedRoutes.map((item, index) => {
            if (index === matchedRoutes.length - 1) {
                item.path = null;
                item.clickable = false
            }
            return item
        });
    }
};


watch(route, () => {
    getBreadcrumbData()
}, {
    immediate: true
})

</script>

<style lang='scss' scoped>

</style>