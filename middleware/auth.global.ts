import { RouteLocationNormalized } from 'vue-router';

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {

    if (process.client) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTo(0, 0);
    }
});