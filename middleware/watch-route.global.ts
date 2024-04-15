import { RouteLocationNormalized } from 'vue-router';
import { useCommonStore, usePageConfig } from '@/store';

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const pageConfigStore = usePageConfig();
    pageConfigStore.set_show_back(true);
    pageConfigStore.set_back_style({});
    useCommonStore().set_from_route_path(from.fullPath);
});