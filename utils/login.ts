
import { openId } from '@/consts';

export const redirectLogin = async () => {
    const openIdCookie = useCookie(openId);
    console.log('openIdCookie,', openIdCookie.value);
    const route = useRoute();
    let query: { sessionAuthId?: string, backUrl?: string } = {};

    if (openIdCookie.value) {
        query.sessionAuthId = openIdCookie.value;
    }

    if (route.fullPath) { 
        query.backUrl = route.fullPath 
    }
    return navigateTo({ path: '/login', query });
}