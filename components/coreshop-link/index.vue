<template>
    <a :href="props.link" v-if="props.mode === ModeType.a">
        <slot></slot>
    </a>
    <nuxt-link :to="props.link" v-else>
        <slot></slot>
    </nuxt-link>
</template>

<script setup lang="ts">
import { ModeType } from '@/enum';

const props = withDefaults(defineProps<{
    mode?: string;
    link: string;
}>(), {
    mode: ModeType.a,
    link: '',
});

</script>
