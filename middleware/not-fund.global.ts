import { RouteLocationNormalized } from 'vue-router';
export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to.matched.length === 0) {
        abortNavigation();
        return navigateTo('/')
    }
});