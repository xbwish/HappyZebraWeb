import { defineStore } from 'pinia';
import { ProductItem } from '@/model/cart';
import * as cartService from '@/composables/cartService'
import { coreShopAuthCookie } from '@/consts';
import { Result } from '@/model';

export const useCartStore = defineStore('productCart', {
    state: () => ({
        cartList: [] as Array<ProductItem>,
        cartProductNumber: 0 as number
    }),
    getters: {
        getCartList: state => state.cartList,
        getTotalPrice: state => parseFloat(state.cartList.filter(x => x.check).reduce((pre, cur) => {
            pre += cur.subtotal!;
            return pre;
        }, 0).toFixed(2)),
        getCheckedCount: state => state.cartList.filter(x => x.check).length,
        getProductAllChecked: state => state.cartList.length === 0 ? false : state.cartList.filter(x => x.check).length === state.cartList.length,

        /** 获取购物车商品数量 */
        getCartProductNumber: state => state.cartProductNumber
    },
    actions: {
        setCartList(carts: Array<ProductItem>) {
            this.cartList = carts.map(item => ({ ...item, subtotal: parseFloat((item.nums! * item.products.price!).toFixed(2)) }));
        },

        setAllProductChecked(check: boolean) {
            this.cartList = this.cartList.map(x => ({ ...x, check: check }));
        },

        async setDeleteCartItem(id: number) {
            await cartService.cartDeleteProduct({ id });
            this.cartList = this.cartList.filter(x => x.id !== id);
            this.setCartProductTotalByNumber(this.cartProductNumber-1);
        },

        setDeleteCheckedProduct() {
            this.cartList = this.cartList.filter(x => !x.check);
        },

        async setAddProductNumber(id: number, quantity: number) {
            const cartItem: ProductItem = this.cartList.find(x => x.productId === id)!;
            const nums: number = cartItem.nums! + Math.max(0, quantity);
            await cartService.cartSetCartProductNum({ id, nums });
            this.cartList = this.cartList.map(item => {
                if (item.productId === id) {
                    item.nums = item.nums! + Math.max(0, quantity);
                    item.subtotal = parseFloat((item.nums * item.products.price!).toFixed(2));
                }
                return item;
            });

        },

        async setProductNumber(id: number, quantity: number) {
            await cartService.cartSetCartProductNum({ id, nums: quantity });
            this.cartList = this.cartList.map(item => {
                if (item.productId === id) {
                    item.nums = Math.max(1, quantity);
                    item.subtotal = parseFloat((item.nums * item.products.price!).toFixed(2));
                }
                return item;
            });

        },

        async setReduceProductNumber(id: number, quantity: number) {
            const cartItem: ProductItem = this.cartList.find(x => x.productId === id)!;
            const nums: number = Math.max(1, cartItem.nums! - Math.max(0, quantity));
            await cartService.cartSetCartProductNum({ id, nums });

            this.cartList = this.cartList.map(item => {
                if (item.productId === id) {
                    item.nums = nums;
                    item.subtotal = parseFloat((item.nums * item.products.price!).toFixed(2));
                }
                return item;
            })
        },

        setProductChecked(id: number) {
            this.cartList = this.cartList.map(x => ({ ...x, check: x.productId === id ? !x.check : x.check }));
        },

       /** 设置购物车商品数量通过数量 */
       setCartProductTotalByNumber(quantity: number) {
        this.cartProductNumber = Math.max(0, quantity);
        },

    /** 设置购物车商品数量通过请求接口 */
    async setCartProductTotal() {
        const cookie = useCookie(coreShopAuthCookie);

        if (cookie.value && Object.keys(cookie.value).length) {
            const result: Result<any> = await cartService.queryCartNumAndMoney();
            this.cartProductNumber = Math.max(0, result?.data?.count);
        } else {
            this.cartProductNumber = 0;
        }
    }
    }
})