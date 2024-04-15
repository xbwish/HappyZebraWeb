import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import { Result } from "@/model/result";
import { coreShopAuthCookie } from "@/consts";
import { useConfigStore } from '@/store';
import { redirectLogin } from '@/utils';

/**
 *
 * @param url
 * @param options
 * @param auth  是否需要授权
 * @param contentType
 * @param uniqueKey  key 改成从方法外面传进来
 * @returns
 */
const fetch = async <T = any>(
    url: string,
    options: { [key: string]: any },
    auth?: boolean,
    contentType: string | null = 'application/json; charset=utf-8',
    uniqueKey: string = url
): Promise<Result<T>> => {
    // const { $config, $router } = useNuxtApp();
    const config = useRuntimeConfig();
    let headers: { [key: string]: any } = {};
    if (contentType) {
        headers['content-type'] = contentType;
    }

    if (auth) {
        const cookie = useCookie(coreShopAuthCookie); 
        if (!cookie.value) {
            await redirectLogin()
            // await navigateTo('/login', { redirectCode: 301 });
            return Promise.reject({ status: false, msg: '授权失败 需要登录' });
        }
        headers.Authorization = `Bearer ${cookie.value}`;
    }

    headers['language'] = useConfigStore().getLanguage;

    return new Promise((resolve, reject) => {
        return useFetch(url, {
            ...options,
            // key 改成从方法外面传进来
            //  key: `${url}/${new Date().getTime()}`,
            key: uniqueKey,
            baseURL: config.public.VITE_API_HOST,
            //  headers,
            onRequest({ request, options }) {
                // Set the request headers
                //  options.headers = options.headers || {}
                options.headers = headers
            },
        }).then(({ data, error, pending }: _AsyncData<any, any>) => {
            if (!data || error?.value) {
                return reject(error?.value);

            }
            const dataResult: Result<T> =toRaw( data?.value as Result<T>);
            if (!dataResult) {
                return reject(dataResult)
            }
            return resolve(dataResult)
        }).catch(err => {
            console.log(`[error]:${err}` ,`[url]:${url}`);
        })
    })
}

const get = (url: string, params?: any, auth: boolean = false): Promise<any> => {
    return fetch(url, { method: 'get', params }, auth)
}

/**
 *
 * @param url
 * @param body
 * @param auth
 * @param contentType
 * @param uniqueKey  useFetch 请求key 唯一性问题
 * @returns
 */

const post = <T = any>(url: string, body?: { [key: string]: any }, auth: boolean = false, contentType?: string, uniqueKey: string = url): Promise<Result<T>> => {
    return fetch<T>(url, { method: 'post', body }, auth, contentType, uniqueKey);
}

const put = (url: string, body?: any, auth: boolean = false, uniqueKey: string = url): Promise<any> => {
    return fetch(url, { method: 'put', body }, auth, url, uniqueKey)
}

const del = (url: string, body?: any, auth: boolean = false, uniqueKey: string = url): Promise<any> => {
    return fetch(url, { method: 'delete', body }, auth, uniqueKey)
}

const patch = (url: string, body?: any, auth: boolean = false, uniqueKey: string = url): Promise<any> => {
    return fetch(url, { method: 'patch', body }, auth, uniqueKey)
}

export { get, post, put, del, patch }