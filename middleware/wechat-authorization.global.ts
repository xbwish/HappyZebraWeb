import { RouteLocationNormalized } from 'vue-router';
import { onWxLogin } from '@/composables/smsService';
import { useAccountStore } from '@/store';
import { appId, openId ,isOpenH5PatternInWeChat} from '@/consts';

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => { 
    
    if (!process.client) {
        return;
    }

    const openIdCookie = useCookie(openId);
    if (to.path.includes('login')) {
        return;
    }

    if (useAccountStore().getToken) {
        return;
    }

    if (openIdCookie.value) {
        return;
    }

    // 没有登录   
    if (from.query?.code) {
        const loginResult = await onWxLogin({ type: 1, code: from.query.code as string })
        if (typeof loginResult.data == 'string') {
            openIdCookie.value = loginResult.data;
        } else {
            useAccountStore().setAccountInfo(loginResult.data.auth);
            window.location.href = '/';
        }
        return;
    }

    const ua: string = navigator.userAgent.toLowerCase();
    let redirect_url = encodeURIComponent(window.location.href);
    if (ua.indexOf('micromessenger') != -1 && !openIdCookie.value && isOpenH5PatternInWeChat) {
        let authorized_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_url}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
        window.location.href = authorized_url;
    }

});