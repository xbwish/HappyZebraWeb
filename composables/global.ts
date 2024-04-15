import { useI18n } from "vue-i18n";
import { ConfigProviderProps, createDiscreteApi, darkTheme, lightTheme } from "naive-ui";
import { NavLinkTypeEnum } from "@/enum";
/**  路由跳转 */
export const routerLink = (url: string) => useRouter().push(url);

/** il8n翻译 */
export const coreShopLang = (text: string, params?: any) => {
    // console.log('text',text,'params',params)
    // return t(text, params) 
    return '测试'
};

export const useCoreShopMessage = () => {
    const themeRef = ref<'light' | 'dark'>('light')
    const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
        theme: themeRef.value === 'light' ? lightTheme : darkTheme
    }))

    const { message, dialog } = createDiscreteApi(
        ['message', 'dialog'],
        {
            configProviderProps: configProviderPropsRef
        }
    );
    return { message, dialog };
}

// 节流
export const throttle = (func: { (): void; apply?: any; }, delay: number | undefined) => {
    // 缓存一个定时器
    let timer: NodeJS.Timeout | null = null
    // 这里返回的函数是每次用户实际调用的节流函数
    return function (...args: any) {
        if (!timer) { //判断timer是否有值,如果没有则说明定时器不存在即可继续执行
            timer = setTimeout(() => { //关
                func.apply(this, arguments)
                timer = null; //开
            }, delay)
        }
    }
}

/** 货币格式化 */
export const formatMoney = (number?: any, places?: any, symbol?: any, thousand?: any, decimal?: any) => {
    number = number || 0
    places = !isNaN((places = Math.abs(places))) ? places : 2
    symbol = symbol !== undefined ? symbol : 'NT$'
    thousand = thousand || ','
    decimal = decimal || '.'
    var negative = number < 0 ? '-' : '',
        i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '',
        j = (j = i.length) > 3 ? j % 3 : 0
    return (
        symbol +
        negative +
        (j ? i.substr(0, j) + thousand : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
        (places ?
            decimal +
            Math.abs(number - i)
                .toFixed(places)
                .slice(2) :
            '')
    )
}

/** 格式化时间 */
export const timeFormat = (dateTime: string | number, formatStr = 'yyyy-mm-dd') => {
    let date: Date
    // 若传入时间为假值，则取当前时间
    if (!dateTime) {
        date = new Date()
    }
    // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
    else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
        date = new Date((dateTime as number) * 1000)
    }
    // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
    else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
        date = new Date(Number(dateTime))
    }
    // 其他都认为符合 RFC 2822 规范
    else {
        // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
        date = new Date(
            typeof dateTime === 'string'
                ? dateTime.replace(/-/g, '/')
                : dateTime
        )
    }

    const timeSource = {
        'y': date.getFullYear().toString(), // 年
        'm': (date.getMonth() + 1).toString().padStart(2, '0'), // 月
        'd': date.getDate().toString().padStart(2, '0'), // 日
        'h': date.getHours().toString().padStart(2, '0'), // 时
        'M': date.getMinutes().toString().padStart(2, '0'), // 分
        's': date.getSeconds().toString().padStart(2, '0') // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }

    for (const key in timeSource) {
        const [ret] = new RegExp(`${key}+`).exec(formatStr) || []
        if (ret) {
            // 年可能只需展示两位
            const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0
            formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex))
        }
    }

    return formatStr
}

/** 金额相减 */
export const moneySub = (value1: string, value2: string) => {
    let res = Number((parseFloat(value1) - parseFloat(value2)).toFixed(2));
    return res > 0 ? res : 0;
}

/** 判断是否在微信浏览器中 */
export const isWechat = () => {
    if(process.client){
        const ua: string = navigator.userAgent.toLowerCase();
        return ua.indexOf('micromessenger') != -1
    }
}

const wechatPageLinkMapToH5 = (value: string) => {
    const mapLink: { [key: string]: any } = {
        '/pages/index/default/default': '/',
        '/pages/index/cart/cart': '/cart',
        '/pages/index/member/member': '/member/center',
        '/pages/search/search': '', // todo
        '/pages/category/index/index': '/goods/classify',
        // /pages/category/list/list?id=分类序列
        '/pages/category/list/list': '/goods/classify', // todo
        '/pages/storeMap/storeMap': '', //todo
        '/pages/article/list/list': 'article',
        '/pages/serviceGoods/index/index': "/serviceGood",
        '/pages/coupon/coupon': '/coupon',
        '/pages/reward/reward': '',
        '/pages/activity/pinTuan/list/list': '/activity/pinTuan',
        '/pages/activity/seckill/list/list': '/activity/seckill',
        '/pages/activity/groupBuying/list/list': '/activity/groupBuying',
        '/pages/activity/solitaire/list/list': '/activity/solitaire',
        '/pages/activity/checkIn/checkIn/checkIn': '/activity/checkin'
    }
    return mapLink[value];
}

export const linkTypeNavigate = (type: NavLinkTypeEnum, value: string,keyWord?:string) => {
    if (!value || value === '#') {
        return;
    }

    if (type == NavLinkTypeEnum.urlLink) {
        if (value.indexOf('http') != -1) {
            window.open(value, "_blank");
            return
        }

        if (['/pages/index/default/default', '/pages/category/index/index', '/pages/index/cart/cart', '/pages/index/member/member'].includes(value)) {
            return navigateTo(wechatPageLinkMapToH5(value));
        } else if (value.indexOf('/pages/coupon/coupon?id=') > -1) {
            const id: string = value.replace('/pages/coupon/coupon?id=', "");
            //todo
            //  this.receiveCoupon(id)
        } else {
            

            // 商品详情
            if (value.indexOf('/pages/goods/goodDetails/goodDetails') >= 0) {
                return navigateTo(value.replace('/pages/goods/goodDetails/goodDetails?id=', '/goods/detail/'));
            }

            /** 文章详情 */
            if (value.indexOf('/pages/article/details/details') >= 0) {
                return navigateTo(value.replace('/pages/article/details/details?id=', '/article/detail/'));
            }

            /** 团购详情 */
            if (value.indexOf('/pages/activity/groupBuying/groupBuyingDetails/groupBuyingDetails') >= 0) {
                return navigateTo(value.replace('/pages/activity/groupBuying/groupBuyingDetails/groupBuyingDetails', '/activity/groupBuying/detail'));
            }
            /** 拼团详情 */
            if (value.indexOf('/pages/activity/pinTuan/pinTuanDetails/pinTuanDetails') >= 0) {
                return navigateTo(value.replace('/pages/activity/pinTuan/pinTuanDetails/pinTuanDetails', '/activity/pinTuan/detail'));
            }

            /** 接龙详情 */
            if (value.indexOf('/pages/activity/solitaire/solitaireDetails/solitaireDetails') >= 0) {
                return navigateTo(value.replace('/pages/activity/solitaire/solitaireDetails/solitaireDetails', '/activity/solitaire/detail'));
            }

            /** 秒杀详情 */
            if (value.indexOf('/pages/activity/seckill/seckillDetails/seckillDetails') >= 0) {
                return navigateTo(value.replace('/pages/activity/seckill/seckillDetails/seckillDetails', '/activity/seckill/detail'));
            }

            /** 万能表单 */
            if (value.indexOf('/pages/form/details/details') >= 0) {
                return navigateTo(value.replace('/pages/form/details/details?id=', '/form/detail/'));
            }

            /** 服务商品详情 */
            if (value.indexOf('/pages/serviceGoods/details/details') >= 0) {
                return navigateTo(value.replace('/pages/serviceGoods/details/details', '/serviceGood/detail'));
            }

            /** 商品搜索 */
            if(value.indexOf('/pages/category/list/list')>=0){
                let url:string =value.replace('/pages/category/list/list', '/category');
                url= keyWord?`${url}&title=${keyWord}`:url;
                return navigateTo(url);
            }

            return navigateTo(wechatPageLinkMapToH5(value));
        }

    }
    if (type == NavLinkTypeEnum.shopCategory) {
        // 商品分类 
        return navigateTo(`/category?id=${value}&title=${keyWord}`);
    }
    if (type == NavLinkTypeEnum.shop) {
        // 商品详情
        return navigateTo(`/goods/detail/${value}`);
    }
    if (type == NavLinkTypeEnum.article) {
        // 文章详情
        return navigateTo(`/article/detail/${value}`);
    }
    if (type == NavLinkTypeEnum.articleCategory) {
        // 文章列表
        return navigateTo(`/article`);
    }
    if (type == NavLinkTypeEnum.intelligentForms) {
        return navigateTo(`/form/detail/${value}`);
    }
    return navigateTo(wechatPageLinkMapToH5(value));
}