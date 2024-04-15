<template>
     <div class="page-header">
            <div class="page-header__container container">
                <div class="page-header__breadcrumb">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                        <template v-for="item in props.breadcrumb">
                            <li class="breadcrumb-item" v-if="item.link">
                                <NuxtLink :to="item.link">{{item.title}}</NuxtLink>
                                <svg class="breadcrumb-arrow" width="6px" height="9px">
                                       <use xlink:href="/images/sprite.svg#arrow-rounded-right-6x9"></use>
                                </svg>
                            </li>
                            <li v-else class="breadcrumb-item active" aria-current="page">{{item.title}}</li>
                        </template>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
</template>

<script setup lang='ts'>
import {HeaderNavigation} from '@/model/header-navigation';

const props = withDefaults(defineProps<{
    breadcrumb?: Array<HeaderNavigation>;
}>(), {
    breadcrumb: ()=>([])
});

</script>

<style scoped></style>